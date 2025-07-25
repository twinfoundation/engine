// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { AuthHeaderProcessor } from "@twin.org/api-auth-entity-storage-service";
import { RestRouteProcessorFactory, type IBaseRouteProcessor } from "@twin.org/api-models";
import {
	LoggingProcessor,
	NodeIdentityProcessor,
	RestRouteProcessor,
	StaticUserIdentityProcessor
} from "@twin.org/api-processors";
import { GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCoreContext, IEngineCore } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import type { RestRouteProcessorConfig } from "../models/config/restRouteProcessorConfig";
import type { IEngineServerConfig } from "../models/IEngineServerConfig";
import { RestRouteProcessorType } from "../models/types/restRouteProcessorType";

/**
 * Initialise the rest route processor.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseRestRouteProcessorComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: RestRouteProcessorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `REST Route Processor: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IBaseRouteProcessor;
	let instanceType: string;

	if (type === RestRouteProcessorType.AuthHeader) {
		component = new AuthHeaderProcessor({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			config: {
				...instanceConfig.options?.config
			}
		});
		instanceType = StringHelper.kebabCase(nameof(AuthHeaderProcessor));
	} else if (type === RestRouteProcessorType.Logging) {
		component = new LoggingProcessor({
			loggingComponentType: context.defaultTypes.loggingComponent,
			config: {
				...instanceConfig.options?.config
			}
		});
		instanceType = StringHelper.kebabCase(nameof(LoggingProcessor));
	} else if (type === RestRouteProcessorType.NodeIdentity) {
		component = new NodeIdentityProcessor();
		instanceType = StringHelper.kebabCase(nameof(NodeIdentityProcessor));
	} else if (type === RestRouteProcessorType.StaticUserIdentity) {
		component = new StaticUserIdentityProcessor(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(StaticUserIdentityProcessor));
	} else if (type === RestRouteProcessorType.RestRoute) {
		component = new RestRouteProcessor(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(RestRouteProcessor));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "restRouteProcessorComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component
	});
	RestRouteProcessorFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
