// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import {
	EntityStorageIdentityResolverConnector,
	initSchema as initSchemaIdentityStorage,
	type IdentityDocument
} from "@twin.org/identity-connector-entity-storage";
import { IotaIdentityResolverConnector } from "@twin.org/identity-connector-iota";
import { IotaRebasedIdentityResolverConnector } from "@twin.org/identity-connector-iota-rebased";
import {
	IdentityResolverConnectorFactory,
	type IIdentityResolverComponent,
	type IIdentityResolverConnector
} from "@twin.org/identity-models";
import { IdentityResolverService } from "@twin.org/identity-service";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { IdentityResolverComponentConfig } from "../models/config/identityResolverComponentConfig";
import type { IdentityResolverConnectorConfig } from "../models/config/identityResolverConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { IdentityResolverComponentType } from "../models/types/identityResolverComponentType";
import { IdentityResolverConnectorType } from "../models/types/identityResolverConnectorType";

/**
 * Initialise the identity resolver connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseIdentityResolverConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityResolverConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Identity Resolver Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IIdentityResolverConnector;
	let instanceType: string;
	if (type === IdentityResolverConnectorType.Iota) {
		const dltConfig = context.config.types.dltConfig?.find(
			dlt => dlt.type === context.defaultTypes.dltConfig
		);
		connector = new IotaIdentityResolverConnector({
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaIdentityResolverConnector.NAMESPACE;
	} else if (type === IdentityResolverConnectorType.IotaRebased) {
		const dltConfig = context.config.types.dltConfig?.find(
			dlt => dlt.type === context.defaultTypes.dltConfig
		);
		connector = new IotaRebasedIdentityResolverConnector({
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaRebasedIdentityResolverConnector.NAMESPACE;
	} else if (type === IdentityResolverConnectorType.EntityStorage) {
		initSchemaIdentityStorage({ includeProfile: false });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.didDocumentEntityStorageType,
			nameof<IdentityDocument>()
		);
		connector = new EntityStorageIdentityResolverConnector({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			...instanceConfig.options
		});
		instanceType = EntityStorageIdentityResolverConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "identityResolverConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component: connector });
	IdentityResolverConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the identity resolver component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseIdentityResolverComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityResolverComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Identity Resolver Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IIdentityResolverComponent;
	let instanceType: string;

	if (type === IdentityResolverComponentType.Service) {
		component = new IdentityResolverService(instanceConfig.options);
		instanceType = IdentityResolverService.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "identityResolverComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component });
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
