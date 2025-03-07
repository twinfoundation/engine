// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import type { IImmutableProofComponent } from "@twin.org/immutable-proof-models";
import {
	type ImmutableProof,
	ImmutableProofService,
	initSchema as initSchemaImmutableProof
} from "@twin.org/immutable-proof-service";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { ImmutableProofComponentConfig } from "../models/config/immutableProofComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { ImmutableProofComponentType } from "../models/types/immutableProofComponentType";

/**
 * Initialise the immutable proof component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseImmutableProofComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: ImmutableProofComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Immutable Proof Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IImmutableProofComponent;
	let instanceType: string;

	if (type === ImmutableProofComponentType.Service) {
		initSchemaImmutableProof();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.immutableProofEntityStorageType,
			nameof<ImmutableProof>()
		);

		component = new ImmutableProofService({
			immutableStorageType: context.defaultTypes.immutableStorageConnector,
			identityConnectorType: context.defaultTypes.identityConnector,
			backgroundTaskConnectorType: context.defaultTypes.backgroundTaskConnector,
			eventBusComponentType: context.defaultTypes.eventBusComponent,
			...instanceConfig.options
		});
		instanceType = ImmutableProofService.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "immutableProofComponent"
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
