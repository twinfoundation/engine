// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuditableItemStreamComponent } from "@twin.org/auditable-item-stream-models";
import { AuditableItemStreamClient } from "@twin.org/auditable-item-stream-rest-client";
import {
	type AuditableItemStream,
	type AuditableItemStreamEntry,
	AuditableItemStreamService,
	initSchema as initSchemaAuditableItemStream
} from "@twin.org/auditable-item-stream-service";
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { AuditableItemStreamComponentConfig } from "../models/config/auditableItemStreamComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { AuditableItemStreamComponentType } from "../models/types/auditableItemStreamComponentType";

/**
 * Initialise the auditable item stream component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseAuditableItemStreamComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AuditableItemStreamComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Auditable Item Stream Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IAuditableItemStreamComponent;
	let instanceType: string;

	if (type === AuditableItemStreamComponentType.Service) {
		initSchemaAuditableItemStream();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.streamEntityStorageType,
			nameof<AuditableItemStream>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.streamEntryEntityStorageType,
			nameof<AuditableItemStreamEntry>()
		);

		component = new AuditableItemStreamService({
			immutableProofComponentType: context.defaultTypes.immutableProofComponent,
			eventBusComponentType: context.defaultTypes.eventBusComponent,
			...instanceConfig.options
		});
		instanceType = StringHelper.kebabCase(nameof(AuditableItemStreamService));
	} else if (type === AuditableItemStreamComponentType.RestClient) {
		component = new AuditableItemStreamClient(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(AuditableItemStreamClient));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "auditableItemStreamComponent"
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
