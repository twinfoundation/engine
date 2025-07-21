// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import type { IRightsManagementComponent } from "@twin.org/rights-management-models";
import { RightsManagementClient } from "@twin.org/rights-management-rest-client";
import { RightsManagementService } from "@twin.org/rights-management-service";
import type { RightsManagementComponentConfig } from "../models/config/rightsManagementComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementComponentType } from "../models/types/rightsManagementComponentType";

/**
 * Initialise the rights management component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseRightsManagementComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Rights Management Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IRightsManagementComponent;
	let instanceType: string;

	if (type === RightsManagementComponentType.Service) {
		component = new RightsManagementService({
			papComponentType: context.defaultTypes.rightsManagementPapComponent,
			...instanceConfig.options
		});
		instanceType = StringHelper.kebabCase(nameof(RightsManagementService));
	} else if (type === RightsManagementComponentType.RestClient) {
		component = new RightsManagementClient(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(RightsManagementClient));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "RightsManagementComponent"
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
