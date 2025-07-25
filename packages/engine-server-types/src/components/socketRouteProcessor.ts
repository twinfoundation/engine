// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { AuthHeaderProcessor } from "@twin.org/api-auth-entity-storage-service";
import { SocketRouteProcessorFactory, type IBaseRouteProcessor } from "@twin.org/api-models";
import {
	LoggingProcessor,
	NodeIdentityProcessor,
	SocketRouteProcessor,
	StaticUserIdentityProcessor
} from "@twin.org/api-processors";
import { GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import type { SocketRouteProcessorConfig } from "../models/config/socketRouteProcessorConfig";
import type { IEngineServerConfig } from "../models/IEngineServerConfig";
import { SocketRouteProcessorType } from "../models/types/socketRouteProcessorType";

/**
 * Initialise the socket route processor.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseSocketRouteProcessorComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: SocketRouteProcessorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Socket Route Processor: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IBaseRouteProcessor;
	let instanceType: string;

	if (type === SocketRouteProcessorType.AuthHeader) {
		component = new AuthHeaderProcessor({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			config: {
				...instanceConfig.options?.config
			}
		});
		instanceType = StringHelper.kebabCase(nameof(AuthHeaderProcessor));
	} else if (type === SocketRouteProcessorType.Logging) {
		component = new LoggingProcessor({
			loggingComponentType: context.defaultTypes.loggingComponent,
			config: {
				...instanceConfig.options?.config
			}
		});
		instanceType = StringHelper.kebabCase(nameof(LoggingProcessor));
	} else if (type === SocketRouteProcessorType.NodeIdentity) {
		component = new NodeIdentityProcessor();
		instanceType = StringHelper.kebabCase(nameof(NodeIdentityProcessor));
	} else if (type === SocketRouteProcessorType.StaticUserIdentity) {
		component = new StaticUserIdentityProcessor(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(StaticUserIdentityProcessor));
	} else if (type === SocketRouteProcessorType.SocketRoute) {
		component = new SocketRouteProcessor(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(SocketRouteProcessor));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "socketRouteProcessorComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component
	});
	SocketRouteProcessorFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
