// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuditableItemGraphComponent } from "@twin.org/auditable-item-graph-models";
import { AuditableItemGraphClient } from "@twin.org/auditable-item-graph-rest-client";
import {
	type AuditableItemGraphChangeset,
	AuditableItemGraphService,
	type AuditableItemGraphVertex,
	initSchema as initSchemaAuditableItemGraph
} from "@twin.org/auditable-item-graph-service";
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { AuditableItemGraphComponentConfig } from "../models/config/auditableItemGraphComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { AuditableItemGraphComponentType } from "../models/types/auditableItemGraphComponentType";

/**
 * Initialise the auditable item graph component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseAuditableItemGraphComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AuditableItemGraphComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Auditable Item Graph Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IAuditableItemGraphComponent;
	let instanceType: string;

	if (type === AuditableItemGraphComponentType.Service) {
		initSchemaAuditableItemGraph();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.vertexEntityStorageType,
			nameof<AuditableItemGraphVertex>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.changesetEntityStorageType,
			nameof<AuditableItemGraphChangeset>()
		);

		component = new AuditableItemGraphService({
			immutableProofComponentType: context.defaultTypes.immutableProofComponent,
			eventBusComponentType: context.defaultTypes.eventBusComponent,
			...instanceConfig.options
		});
		instanceType = StringHelper.kebabCase(nameof(AuditableItemGraphService));
	} else if (type === AuditableItemGraphComponentType.RestClient) {
		component = new AuditableItemGraphClient(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(AuditableItemGraphClient));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "auditableItemGraphComponent"
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
