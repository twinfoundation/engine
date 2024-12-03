// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { LocalEventBusConnector } from "@twin.org/event-bus-connector-local";
import {
	EventBusConnectorFactory,
	type IEventBusComponent,
	type IEventBusConnector
} from "@twin.org/event-bus-models";
import { EventBusService } from "@twin.org/event-bus-service";
import type { EventBusComponentConfig } from "../models/config/eventBusComponentConfig.js";
import type { EventBusConnectorConfig } from "../models/config/eventBusConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { EventBusComponentType } from "../models/types/eventBusComponentType.js";
import { EventBusConnectorType } from "../models/types/eventBusConnectorType.js";

/**
 * Initialise a event bus connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseEventBusConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: EventBusConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Event Bus Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IEventBusConnector;
	let instanceType: string;

	if (type === EventBusConnectorType.Local) {
		connector = new LocalEventBusConnector({
			loggingConnectorType: context.defaultTypes.loggingConnector,
			...instanceConfig.options
		});
		instanceType = LocalEventBusConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "eventBusConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component: connector });
	EventBusConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the event bus component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseEventBusComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: EventBusComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Event Bus Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IEventBusComponent;
	let instanceType: string;

	if (type === EventBusComponentType.Service) {
		component = new EventBusService({
			eventBusConnectorType: context.defaultTypes.eventBusConnector,
			...instanceConfig.options
		});
		instanceType = EventBusService.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "EventBusComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component });
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
