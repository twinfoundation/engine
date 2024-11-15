// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IInformationComponent } from "@twin.org/api-models";
import { InformationService } from "@twin.org/api-service";
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import {
	InformationComponentType,
	type IEngineCore,
	type IEngineCoreContext,
	type InformationComponentConfig
} from "@twin.org/engine-models";

/**
 * Initialise the information component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseInformationComponent(
	engineCore: IEngineCore,
	context: IEngineCoreContext,
	instanceConfig: InformationComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Information Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IInformationComponent;
	let instanceType: string;

	if (type === InformationComponentType.Service) {
		component = new InformationService(instanceConfig.options);
		instanceType = InformationService.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "informationComponent"
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
