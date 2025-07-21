// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import type { IPolicyAdministrationPointComponent } from "@twin.org/rights-management-models";
import {
	initSchema as initSchemaRightsManagementPap,
	type OdrlPolicy,
	PolicyAdministrationPointService
} from "@twin.org/rights-management-pap-service";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { RightsManagementPapComponentConfig } from "../models/config/rightsManagementPapComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementPapComponentType } from "../models/types/rightsManagementPapComponentType";

/**
 * Initialise the rights management PAP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseRightsManagementPapComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPapComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Rights Management PAP Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IPolicyAdministrationPointComponent;
	let instanceType: string;

	if (type === RightsManagementPapComponentType.Service) {
		initSchemaRightsManagementPap();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.odrlPolicyEntityStorageType,
			nameof<OdrlPolicy>()
		);

		component = new PolicyAdministrationPointService(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(PolicyAdministrationPointService));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "RightsManagementPapComponent"
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
