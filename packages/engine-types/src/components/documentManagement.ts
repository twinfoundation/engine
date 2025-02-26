// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IDocumentManagementComponent } from "@twin.org/document-management-models";
import { DocumentManagementService } from "@twin.org/document-management-service";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import type { DocumentManagementComponentConfig } from "../models/config/documentManagementComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { DocumentManagementComponentType } from "../models/types/documentManagementComponentType";

/**
 * Initialise the document management component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseDocumentManagementComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DocumentManagementComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Document Management Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IDocumentManagementComponent;
	let instanceType: string;

	if (type === DocumentManagementComponentType.Service) {
		component = new DocumentManagementService({
			auditableItemGraphComponentType: context.defaultTypes.auditableItemGraphComponent,
			blobStorageComponentType: context.defaultTypes.blobStorageComponent,
			attestationComponentType: context.defaultTypes.attestationComponent,
			...instanceConfig.options
		});
		instanceType = DocumentManagementService.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "documentManagementComponent"
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
