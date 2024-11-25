// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { MimeTypeProcessorFactory, type IMimeTypeProcessor } from "@twin.org/api-models";
import { JwtMimeTypeProcessor } from "@twin.org/api-processors";
import { GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import type { MimeTypeProcessorConfig } from "../models/config/mimeTypeProcessorConfig";
import type { IEngineServerConfig } from "../models/IEngineServerConfig";
import { MimeTypeProcessorType } from "../models/types/mimeTypeProcessorType";

/**
 * Initialise the mime type processor.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseMimeTypeProcessorComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: MimeTypeProcessorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Mime Type Processor: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IMimeTypeProcessor;
	let instanceType: string;

	if (type === MimeTypeProcessorType.Jwt) {
		component = new JwtMimeTypeProcessor();
		instanceType = JwtMimeTypeProcessor.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "mimeTypeProcessorComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component
	});
	MimeTypeProcessorFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
