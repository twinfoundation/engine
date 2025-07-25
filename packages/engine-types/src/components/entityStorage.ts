// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { ComponentFactory, GeneralError, I18n, Is, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { CosmosDbEntityStorageConnector } from "@twin.org/entity-storage-connector-cosmosdb";
import { DynamoDbEntityStorageConnector } from "@twin.org/entity-storage-connector-dynamodb";
import { FileEntityStorageConnector } from "@twin.org/entity-storage-connector-file";
import { FirestoreEntityStorageConnector } from "@twin.org/entity-storage-connector-gcp-firestore";
import { MemoryEntityStorageConnector } from "@twin.org/entity-storage-connector-memory";
import { MongoDbEntityStorageConnector } from "@twin.org/entity-storage-connector-mongodb";
import { MySqlEntityStorageConnector } from "@twin.org/entity-storage-connector-mysql";
import { PostgreSqlEntityStorageConnector } from "@twin.org/entity-storage-connector-postgresql";
import { ScyllaDBTableConnector } from "@twin.org/entity-storage-connector-scylladb";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageComponent,
	type IEntityStorageConnector
} from "@twin.org/entity-storage-models";
import { EntityStorageClient } from "@twin.org/entity-storage-rest-client";
import { EntityStorageService } from "@twin.org/entity-storage-service";
import { nameof } from "@twin.org/nameof";
import type { EntityStorageComponentConfig } from "../models/config/entityStorageComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { EntityStorageComponentType } from "../models/types/entityStorageComponentType";
import { EntityStorageConnectorType } from "../models/types/entityStorageConnectorType";

/**
 * Initialise the entity storage connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param typeCustom Override the type of connector to use instead of default configuration.
 * @param schema The schema for the entity storage.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseEntityStorageConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	typeCustom: string | undefined,
	schema: string
): void {
	const instanceName = StringHelper.kebabCase(schema);

	if (!EntityStorageConnectorFactory.hasName(instanceName)) {
		let entityStorageConfig;

		if (Is.stringValue(typeCustom)) {
			// A custom type has been specified, so look it up
			entityStorageConfig = context.config.types.entityStorageConnector?.find(
				c => c.type === typeCustom || c.overrideInstanceType === typeCustom
			);
			if (Is.empty(entityStorageConfig)) {
				throw new GeneralError("engineCore", "entityStorageCustomMissing", {
					typeCustom,
					storageName: instanceName
				});
			}
		} else {
			// The default entity storage method is either the one with the isDefault flag set
			// or pick the first one if no default is set.
			entityStorageConfig =
				context.config.types.entityStorageConnector?.find(c => c.isDefault ?? false) ??
				context.config.types.entityStorageConnector?.[0];
			if (Is.empty(entityStorageConfig)) {
				throw new GeneralError("engineCore", "entityStorageMissing", {
					storageName: instanceName
				});
			}
		}

		const type = entityStorageConfig.type;
		let entityStorageConnector: IEntityStorageConnector;

		engineCore.logInfo(
			I18n.formatMessage("engineCore.configuringEntityStorage", {
				element: "Entity Storage",
				storageName: instanceName,
				storageType: type
			})
		);

		if (type === EntityStorageConnectorType.Memory) {
			entityStorageConnector = new MemoryEntityStorageConnector({
				entitySchema: schema
			});
		} else if (type === EntityStorageConnectorType.File) {
			entityStorageConnector = new FileEntityStorageConnector({
				entitySchema: schema,
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					directory: path.join(
						entityStorageConfig.options.config.directory,
						`${entityStorageConfig.options.folderPrefix ?? ""}${instanceName}`
					)
				}
			});
		} else if (type === EntityStorageConnectorType.AwsDynamoDb) {
			entityStorageConnector = new DynamoDbEntityStorageConnector({
				entitySchema: schema,
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					tableName: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else if (type === EntityStorageConnectorType.AzureCosmosDb) {
			entityStorageConnector = new CosmosDbEntityStorageConnector({
				entitySchema: schema,
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					containerId: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else if (type === EntityStorageConnectorType.GcpFirestoreDb) {
			entityStorageConnector = new FirestoreEntityStorageConnector({
				entitySchema: schema,
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					collectionName: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else if (type === EntityStorageConnectorType.ScyllaDb) {
			entityStorageConnector = new ScyllaDBTableConnector({
				entitySchema: schema,
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					tableName: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else if (type === EntityStorageConnectorType.MySqlDb) {
			entityStorageConnector = new MySqlEntityStorageConnector({
				entitySchema: schema,
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					tableName: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else if (type === EntityStorageConnectorType.MongoDb) {
			entityStorageConnector = new MongoDbEntityStorageConnector({
				entitySchema: schema,
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					collection: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else if (type === EntityStorageConnectorType.PostgreSql) {
			entityStorageConnector = new PostgreSqlEntityStorageConnector({
				entitySchema: schema,
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					tableName: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else {
			throw new GeneralError("engineCore", "connectorUnknownType", {
				type,
				connectorType: "entityStorageConnector"
			});
		}

		context.componentInstances.push({
			instanceType: instanceName,
			component: entityStorageConnector
		});
		EntityStorageConnectorFactory.register(instanceName, () => entityStorageConnector);
	}
}

/**
 * Initialise the entity storage connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseEntityStorageComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: EntityStorageComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Entity Storage Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;

	let component: IEntityStorageComponent;
	let instanceType: string;
	if (type === EntityStorageComponentType.Service) {
		const kebabName = StringHelper.kebabCase(instanceConfig.options.entityStorageType);

		// See if there is a custom entity storage for this type, otherwise just use the default one.
		const hasCustom = context.config.types.entityStorageConnector?.some(
			c => c.type === kebabName || c.overrideInstanceType === kebabName
		);

		initialiseEntityStorageConnector(
			engineCore,
			context,
			hasCustom ? kebabName : undefined,
			instanceConfig.options.entityStorageType
		);
		component = new EntityStorageService({
			entityStorageType: kebabName,
			config: {
				...instanceConfig.options.config
			}
		});
		instanceType = StringHelper.kebabCase(instanceConfig.options.entityStorageType);
	} else if (type === EntityStorageComponentType.RestClient) {
		const kebabName = StringHelper.kebabCase(instanceConfig.options.entityStorageType);
		component = new EntityStorageClient({
			pathPrefix: kebabName,
			...instanceConfig.options
		});
		instanceType = `${StringHelper.kebabCase(nameof(EntityStorageClient))}-${kebabName}`;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			serviceType: "entityStorageComponent"
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
