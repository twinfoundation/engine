// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
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
import { TelemetryClient } from "@twin.org/telemetry-rest-client";
import { TelemetryService } from "@twin.org/telemetry-service";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { TelemetryComponentConfig } from "../models/config/telemetryComponentConfig";
import type { TelemetryConnectorConfig } from "../models/config/telemetryConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { TelemetryComponentType } from "../models/types/telemetryComponentType";
import { TelemetryConnectorType } from "../models/types/telemetryConnectorType";

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
		instanceType = StringHelper.kebabCase(nameof(TelemetryService));
	} else if (type === TelemetryComponentType.RestClient) {
		component = new TelemetryClient(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(TelemetryClient));
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
