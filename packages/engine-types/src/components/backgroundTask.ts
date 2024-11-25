// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	EntityStorageBackgroundTaskConnector,
	initSchema,
	type BackgroundTask
} from "@twin.org/background-task-connector-entity-storage";
import {
	BackgroundTaskConnectorFactory,
	type IBackgroundTaskConnector
} from "@twin.org/background-task-models";
import { GeneralError, I18n } from "@twin.org/core";
import type { IEngineCoreContext, IEngineCore } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { BackgroundTaskConnectorConfig } from "../models/config/backgroundTaskConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { BackgroundTaskConnectorType } from "../models/types/backgroundTaskConnectorType.js";

/**
 * Initialise a background task connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseBackgroundTaskConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: BackgroundTaskConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Background Task Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IBackgroundTaskConnector;
	let instanceType: string;

	if (type === BackgroundTaskConnectorType.EntityStorage) {
		initSchema();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.backgroundTaskEntityStorageType,
			nameof<BackgroundTask>()
		);
		connector = new EntityStorageBackgroundTaskConnector({
			loggingConnectorType: context.defaultTypes.loggingConnector,
			...instanceConfig.options
		});
		instanceType = EntityStorageBackgroundTaskConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "backgroundTaskConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component: connector });
	BackgroundTaskConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}
