// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import type { IFederatedCatalogueComponent } from "@twin.org/federated-catalogue-models";
import { FederatedCatalogueClient } from "@twin.org/federated-catalogue-rest-client";
import {
	type DataResourceEntry,
	type DataSpaceConnectorEntry,
	FederatedCatalogueService,
	initSchema as initSchemaFederatedCatalogue,
	type ParticipantEntry,
	type ServiceOfferingEntry
} from "@twin.org/federated-catalogue-service";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { FederatedCatalogueComponentConfig } from "../models/config/federatedCatalogueComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { FederatedCatalogueComponentType } from "../models/types/federatedCatalogueComponentType";

/**
 * Initialise the federated catalogue component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseFederatedCatalogueComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: FederatedCatalogueComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Federated Catalogue Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IFederatedCatalogueComponent;
	let instanceType: string;

	if (type === FederatedCatalogueComponentType.Service) {
		initSchemaFederatedCatalogue();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.dataResourceEntityStorageType,
			nameof<DataResourceEntry>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.participantEntityStorageType,
			nameof<ParticipantEntry>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.serviceOfferingEntityStorageType,
			nameof<ServiceOfferingEntry>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.dataSpaceConnectorStorageType,
			nameof<DataSpaceConnectorEntry>()
		);

		component = new FederatedCatalogueService({
			loggingConnectorType: context.defaultTypes.loggingConnector,
			identityResolverComponentType: context.defaultTypes.identityResolverComponent,
			...instanceConfig.options
		});
		instanceType = StringHelper.kebabCase(nameof(FederatedCatalogueService));
	} else if (type === FederatedCatalogueComponentType.RestClient) {
		component = new FederatedCatalogueClient(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(FederatedCatalogueClient));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "FederatedCatalogueComponent"
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
