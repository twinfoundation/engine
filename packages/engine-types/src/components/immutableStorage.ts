// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IEngineCoreContext, IEngineCore } from "@twin.org/engine-models";
import {
	EntityStorageImmutableStorageConnector,
	initSchema as initSchemaImmutableStorageStorage,
	type ImmutableItem
} from "@twin.org/immutable-storage-connector-entity-storage";
import { IotaImmutableStorageConnector } from "@twin.org/immutable-storage-connector-iota";
import { IotaStardustImmutableStorageConnector } from "@twin.org/immutable-storage-connector-iota-stardust";
import {
	type IImmutableStorageComponent,
	ImmutableStorageConnectorFactory,
	type IImmutableStorageConnector
} from "@twin.org/immutable-storage-models";
import { ImmutableStorageService } from "@twin.org/immutable-storage-service";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { ImmutableStorageComponentConfig } from "../models/config/immutableStorageComponentConfig";
import type { ImmutableStorageConnectorConfig } from "../models/config/immutableStorageConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { ImmutableStorageComponentType } from "../models/types/immutableStorageComponentType";
import { ImmutableStorageConnectorType } from "../models/types/immutableStorageConnectorType";

/**
 * Initialise the immutable storage connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseImmutableStorageConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: ImmutableStorageConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Immutable Storage Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IImmutableStorageConnector;
	let instanceType: string;
	if (type === ImmutableStorageConnectorType.IotaStardust) {
		const dltConfig = context.config.types.dltConfig?.find(
			dlt => dlt.type === context.defaultTypes.dltConfig
		);
		connector = new IotaStardustImmutableStorageConnector({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaStardustImmutableStorageConnector.NAMESPACE;
	} else if (type === ImmutableStorageConnectorType.Iota) {
		const dltConfig = context.config.types.dltConfig?.find(
			dlt => dlt.type === context.defaultTypes.dltConfig
		);
		connector = new IotaImmutableStorageConnector({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaImmutableStorageConnector.NAMESPACE;
	} else if (type === ImmutableStorageConnectorType.EntityStorage) {
		initSchemaImmutableStorageStorage();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.immutableStorageEntityStorageType,
			nameof<ImmutableItem>()
		);
		connector = new EntityStorageImmutableStorageConnector(instanceConfig.options);
		instanceType = EntityStorageImmutableStorageConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "immutableStorageConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component: connector
	});
	ImmutableStorageConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the immutable storage component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseImmutableStorageComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: ImmutableStorageComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Immutable Storage Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IImmutableStorageComponent;
	let instanceType: string;

	if (type === ImmutableStorageComponentType.Service) {
		component = new ImmutableStorageService({
			...instanceConfig.options
		});
		instanceType = ImmutableStorageService.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "immutableStorageComponent"
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
