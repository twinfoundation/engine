// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import {
	EntityStorageIdentityProfileConnector,
	initSchema as initSchemaIdentityStorage,
	type IdentityProfile
} from "@twin.org/identity-connector-entity-storage";
import {
	IdentityProfileConnectorFactory,
	type IIdentityProfileComponent,
	type IIdentityProfileConnector
} from "@twin.org/identity-models";
import { IdentityProfileClient } from "@twin.org/identity-rest-client";
import { IdentityProfileService } from "@twin.org/identity-service";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { IdentityProfileComponentConfig } from "../models/config/identityProfileComponentConfig";
import type { IdentityProfileConnectorConfig } from "../models/config/identityProfileConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { IdentityProfileComponentType } from "../models/types/identityProfileComponentType";
import { IdentityProfileConnectorType } from "../models/types/identityProfileConnectorType";

/**
 * Initialise the identity profile connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseIdentityProfileConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityProfileConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Identity Profile Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;

	let connector: IIdentityProfileConnector;
	let instanceType: string;
	if (type === IdentityProfileConnectorType.EntityStorage) {
		initSchemaIdentityStorage({ includeDocument: false });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.profileEntityStorageType,
			nameof<IdentityProfile>()
		);
		connector = new EntityStorageIdentityProfileConnector(instanceConfig.options);
		instanceType = EntityStorageIdentityProfileConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			serviceType: "identityProfile"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component: connector
	});
	IdentityProfileConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the identity profile component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseIdentityProfileComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityProfileComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Identity Profile Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IIdentityProfileComponent;
	let instanceType: string;

	if (type === IdentityProfileComponentType.Service) {
		component = new IdentityProfileService({
			profileEntityConnectorType: context.defaultTypes.identityProfileConnector,
			...instanceConfig.options
		});
		instanceType = StringHelper.kebabCase(nameof(IdentityProfileService));
	} else if (type === IdentityProfileComponentType.RestClient) {
		component = new IdentityProfileClient(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(IdentityProfileClient));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "identityProfileComponent"
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
