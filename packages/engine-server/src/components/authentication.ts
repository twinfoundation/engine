// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuthenticationComponent } from "@twin.org/api-auth-entity-storage-models";
import {
	EntityStorageAuthenticationService,
	initSchema as initSchemaAuthEntityStorage,
	type AuthenticationUser
} from "@twin.org/api-auth-entity-storage-service";
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import { initialiseEntityStorageConnector } from "@twin.org/engine-core";
import {
	AuthenticationComponentType,
	type IEngineCoreContext,
	type AuthenticationComponentConfig,
	type IEngineCore
} from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";

/**
 * Initialise the authentication.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseAuthenticationComponent(
	engineCore: IEngineCore,
	context: IEngineCoreContext,
	instanceConfig: AuthenticationComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Authentication Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IAuthenticationComponent;
	let instanceType: string;

	if (type === AuthenticationComponentType.AuthEntityStorage) {
		initSchemaAuthEntityStorage();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.userEntityStorageType,
			nameof<AuthenticationUser>()
		);

		component = new EntityStorageAuthenticationService({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			...instanceConfig.options
		});
		instanceType = EntityStorageAuthenticationService.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "authenticationComponent"
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
