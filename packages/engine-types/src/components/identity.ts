// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import {
	EntityStorageIdentityConnector,
	initSchema as initSchemaIdentityStorage,
	type IdentityDocument
} from "@twin.org/identity-connector-entity-storage";
import { IotaIdentityConnector } from "@twin.org/identity-connector-iota";
import {
	IdentityConnectorFactory,
	type IIdentityComponent,
	type IIdentityConnector
} from "@twin.org/identity-models";
import { IdentityClient } from "@twin.org/identity-rest-client";
import { IdentityService } from "@twin.org/identity-service";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { IdentityComponentConfig } from "../models/config/identityComponentConfig";
import type { IdentityConnectorConfig } from "../models/config/identityConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { IdentityComponentType } from "../models/types/identityComponentType";
import { IdentityConnectorType } from "../models/types/identityConnectorType";

/**
 * Initialise the identity connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseIdentityConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Identity Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IIdentityConnector;
	let instanceType: string;
	if (type === IdentityConnectorType.Iota) {
		const dltConfig = context.config.types.dltConfig?.find(
			dlt => dlt.type === context.defaultTypes.dltConfig
		);
		connector = new IotaIdentityConnector({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaIdentityConnector.NAMESPACE;
	} else if (type === IdentityConnectorType.EntityStorage) {
		initSchemaIdentityStorage({ includeProfile: false });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.didDocumentEntityStorageType,
			nameof<IdentityDocument>()
		);
		connector = new EntityStorageIdentityConnector({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			...instanceConfig.options
		});
		instanceType = EntityStorageIdentityConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "identityConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component: connector });
	IdentityConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the identity component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseIdentityComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Identity Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IIdentityComponent;
	let instanceType: string;

	if (type === IdentityComponentType.Service) {
		component = new IdentityService(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(IdentityService));
	} else if (type === IdentityComponentType.RestClient) {
		component = new IdentityClient(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(IdentityClient));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "identityComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component });
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
