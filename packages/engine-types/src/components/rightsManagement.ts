// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { EntityStorageService } from "@twin.org/entity-storage-service";
import { nameof } from "@twin.org/nameof";
import type { IRightsManagementComponent } from "@twin.org/rights-management-models";
import {
	PolicyAdministrationPointComponentEntityStorage,
	initSchema as initSchemaRightsManagement,
	type OdrlPolicy
} from "@twin.org/rights-management-pap-entity-storage";
import { RightsManagementService } from "@twin.org/rights-management-service";
import { initialiseEntityStorageConnector } from "./entityStorage";
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
		// Initialize the ODRL policy schema
		initSchemaRightsManagement();

		// Initialize ODRL policy entity storage connector
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.config?.defaultEntityStorageType,
			nameof<OdrlPolicy>()
		);

		// Create and register entity storage service for ODRL policies
		const odrlPolicyEntityStorageService = new EntityStorageService<OdrlPolicy>({
			entityStorageType: "odrl-policy",
			config: {
				includeNodeIdentity: false,
				includeUserIdentity: false
			}
		});
		ComponentFactory.register("odrl-policy", () => odrlPolicyEntityStorageService);

		// Create and register the PAP component
		const papComponent = new PolicyAdministrationPointComponentEntityStorage({
			entityStorageType: "odrl-policy"
		});
		ComponentFactory.register(
			PolicyAdministrationPointComponentEntityStorage.NAMESPACE,
			() => papComponent
		);

		// Create the main Rights Management service
		component = new RightsManagementService(instanceConfig.options);
		instanceType = RightsManagementService.NAMESPACE;
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
