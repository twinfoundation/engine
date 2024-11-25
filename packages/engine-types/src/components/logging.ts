// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { ConsoleLoggingConnector } from "@twin.org/logging-connector-console";
import {
	EntityStorageLoggingConnector,
	initSchema as initSchemaLogging,
	type LogEntry
} from "@twin.org/logging-connector-entity-storage";
import {
	type ILoggingComponent,
	LoggingConnectorFactory,
	MultiLoggingConnector,
	type ILoggingConnector
} from "@twin.org/logging-models";
import { LoggingService } from "@twin.org/logging-service";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { LoggingComponentConfig } from "../models/config/loggingComponentConfig";
import type { LoggingConnectorConfig } from "../models/config/loggingConnectorConfig";
import type { IEngineCoreTypesConfig } from "../models/IEngineCoreTypesConfig";
import { LoggingComponentType } from "../models/types/loggingComponentType";
import { LoggingConnectorType } from "../models/types/loggingConnectorType";

/**
 * Initialise the logging connector.
 * @param engineCore The engine core.
 * @param context The engine core context.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseLoggingConnector(
	engineCore: IEngineCore<IEngineCoreTypesConfig>,
	context: IEngineCoreContext<IEngineCoreTypesConfig>,
	instanceConfig: LoggingConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Logging Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: ILoggingConnector;
	let instanceType: string;

	if (type === LoggingConnectorType.Console) {
		connector = new ConsoleLoggingConnector(instanceConfig.options);
		instanceType = ConsoleLoggingConnector.NAMESPACE;
	} else if (type === LoggingConnectorType.EntityStorage) {
		initSchemaLogging();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.logEntryStorageConnectorType,
			nameof<LogEntry>()
		);
		connector = new EntityStorageLoggingConnector(instanceConfig.options);
		instanceType = EntityStorageLoggingConnector.NAMESPACE;
	} else if (type === LoggingConnectorType.Multi) {
		connector = new MultiLoggingConnector(instanceConfig.options);
		instanceType = MultiLoggingConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "loggingConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component: connector });
	LoggingConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the logging component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseLoggingComponent(
	engineCore: IEngineCore<IEngineCoreTypesConfig>,
	context: IEngineCoreContext<IEngineCoreTypesConfig>,
	instanceConfig: LoggingComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Logging Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: ILoggingComponent;
	let instanceType: string;

	if (type === LoggingComponentType.Service) {
		component = new LoggingService({
			loggingConnectorType: context.defaultTypes.loggingConnector,
			...instanceConfig.options
		});
		instanceType = LoggingService.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "loggingComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component });
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
