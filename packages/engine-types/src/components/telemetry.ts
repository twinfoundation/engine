// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IEngineCoreContext, IEngineCore } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import {
	EntityStorageTelemetryConnector,
	initSchema,
	type TelemetryMetric,
	type TelemetryMetricValue
} from "@twin.org/telemetry-connector-entity-storage";
import {
	TelemetryConnectorFactory,
	type ITelemetryComponent,
	type ITelemetryConnector
} from "@twin.org/telemetry-models";
import { TelemetryService } from "@twin.org/telemetry-service";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { TelemetryComponentConfig } from "../models/config/telemetryComponentConfig.js";
import type { TelemetryConnectorConfig } from "../models/config/telemetryConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { TelemetryComponentType } from "../models/types/telemetryComponentType.js";
import { TelemetryConnectorType } from "../models/types/telemetryConnectorType.js";

/**
 * Initialise a telemetry connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseTelemetryConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TelemetryConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Telemetry Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: ITelemetryConnector;
	let instanceType: string;

	if (type === TelemetryConnectorType.EntityStorage) {
		initSchema();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.telemetryMetricStorageConnectorType,
			nameof<TelemetryMetric>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.telemetryMetricValueStorageConnectorType,
			nameof<TelemetryMetricValue>()
		);
		connector = new EntityStorageTelemetryConnector({
			loggingConnectorType: context.defaultTypes.loggingConnector,
			...instanceConfig.options
		});
		instanceType = EntityStorageTelemetryConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "telemetryConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component: connector });
	TelemetryConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the telemetry component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseTelemetryComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TelemetryComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Telemetry Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: ITelemetryComponent;
	let instanceType: string;

	if (type === TelemetryComponentType.Service) {
		component = new TelemetryService({
			telemetryConnectorType: context.defaultTypes.telemetryConnector,
			...instanceConfig.options
		});
		instanceType = TelemetryService.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "telemetryComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component });
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
