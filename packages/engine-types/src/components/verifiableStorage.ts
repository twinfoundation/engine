// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IEngineCoreContext, IEngineCore } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import {
	EntityStorageVerifiableStorageConnector,
	initSchema as initSchemaVerifiableStorageStorage,
	type VerifiableItem
} from "@twin.org/verifiable-storage-connector-entity-storage";
import { IotaVerifiableStorageConnector } from "@twin.org/verifiable-storage-connector-iota";
import { IotaStardustVerifiableStorageConnector } from "@twin.org/verifiable-storage-connector-iota-stardust";
import {
	type IVerifiableStorageComponent,
	VerifiableStorageConnectorFactory,
	type IVerifiableStorageConnector
} from "@twin.org/verifiable-storage-models";
import { VerifiableStorageService } from "@twin.org/verifiable-storage-service";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { VerifiableStorageComponentConfig } from "../models/config/verifiableStorageComponentConfig";
import type { VerifiableStorageConnectorConfig } from "../models/config/verifiableStorageConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { VerifiableStorageComponentType } from "../models/types/verifiableStorageComponentType";
import { VerifiableStorageConnectorType } from "../models/types/verifiableStorageConnectorType";

/**
 * Initialise the verifiable storage connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseVerifiableStorageConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: VerifiableStorageConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Verifiable Storage Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IVerifiableStorageConnector;
	let instanceType: string;
	if (type === VerifiableStorageConnectorType.IotaStardust) {
		const dltConfig = context.config.types.dltConfig?.find(
			dlt => dlt.type === context.defaultTypes.dltConfig
		);
		connector = new IotaStardustVerifiableStorageConnector({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaStardustVerifiableStorageConnector.NAMESPACE;
	} else if (type === VerifiableStorageConnectorType.Iota) {
		const dltConfig = context.config.types.dltConfig?.find(
			dlt => dlt.type === context.defaultTypes.dltConfig
		);
		connector = new IotaVerifiableStorageConnector({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaVerifiableStorageConnector.NAMESPACE;
	} else if (type === VerifiableStorageConnectorType.EntityStorage) {
		initSchemaVerifiableStorageStorage();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.verifiableStorageEntityStorageType,
			nameof<VerifiableItem>()
		);
		connector = new EntityStorageVerifiableStorageConnector(instanceConfig.options);
		instanceType = EntityStorageVerifiableStorageConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "verifiableStorageConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component: connector
	});
	VerifiableStorageConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the verifiable storage component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseVerifiableStorageComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: VerifiableStorageComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Verifiable Storage Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IVerifiableStorageComponent;
	let instanceType: string;

	if (type === VerifiableStorageComponentType.Service) {
		component = new VerifiableStorageService({
			...instanceConfig.options
		});
		instanceType = VerifiableStorageService.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "verifiableStorageComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component
	});
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
