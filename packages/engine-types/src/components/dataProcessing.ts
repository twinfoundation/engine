// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import {
	JsonConverterConnector,
	XmlConverterConnector
} from "@twin.org/data-processing-converters";
import { JsonPathExtractorConnector } from "@twin.org/data-processing-extractors";
import {
	DataConverterConnectorFactory,
	DataExtractorConnectorFactory,
	type IDataConverterConnector,
	type IDataExtractorConnector,
	type IDataProcessingComponent
} from "@twin.org/data-processing-models";
import {
	DataProcessingService,
	initSchema as initSchemaDataProcessing,
	type ExtractionRuleGroup
} from "@twin.org/data-processing-service";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { DataConverterConnectorConfig } from "../models/config/dataConverterConnectorConfig";
import type { DataExtractorConnectorConfig } from "../models/config/dataExtractorConnectorConfig";
import type { DataProcessingComponentConfig } from "../models/config/dataProcessingComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { DataConverterConnectorType } from "../models/types/dataConverterConnectorType";
import { DataExtractorConnectorType } from "../models/types/dataExtractorConnectorType";
import { DataProcessingComponentType } from "../models/types/dataProcessingComponentType";

/**
 * Initialise the data converter connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseDataConverterConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DataConverterConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Data Converter Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IDataConverterConnector;
	let instanceType: string;

	if (type === DataConverterConnectorType.Json) {
		connector = new JsonConverterConnector();
		instanceType = JsonConverterConnector.NAMESPACE;
	} else if (type === DataConverterConnectorType.Xml) {
		connector = new XmlConverterConnector();
		instanceType = XmlConverterConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "dataConverterConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component: connector
	});
	DataConverterConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the data extractor connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseDataExtractorConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DataExtractorConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Data Extractor Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IDataExtractorConnector;
	let instanceType: string;

	if (type === DataExtractorConnectorType.JsonPath) {
		connector = new JsonPathExtractorConnector();
		instanceType = JsonPathExtractorConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "dataExtractorConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component: connector
	});
	DataExtractorConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the data processing component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseDataProcessingComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DataProcessingComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Data Processing Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IDataProcessingComponent;
	let instanceType: string;

	if (type === DataProcessingComponentType.Service) {
		initSchemaDataProcessing();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.extractionRuleGroupStorageConnectorType,
			nameof<ExtractionRuleGroup>()
		);

		component = new DataProcessingService({
			...instanceConfig.options
		});
		instanceType = DataProcessingService.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "dataProcessingComponent"
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
