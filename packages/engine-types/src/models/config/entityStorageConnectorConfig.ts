// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ICosmosDbEntityStorageConnectorConstructorOptions } from "@twin.org/entity-storage-connector-cosmosdb";
import type { IDynamoDbEntityStorageConnectorConstructorOptions } from "@twin.org/entity-storage-connector-dynamodb";
import type { IFileEntityStorageConnectorConstructorOptions } from "@twin.org/entity-storage-connector-file";
import type { IFirestoreEntityStorageConnectorConstructorOptions } from "@twin.org/entity-storage-connector-gcp-firestore";
import type { IMongoDbEntityStorageConnectorConstructorOptions } from "@twin.org/entity-storage-connector-mongodb";
import type { IMySqlEntityStorageConnectorConstructorOptions } from "@twin.org/entity-storage-connector-mysql";
import type { IPostgreSqlEntityStorageConnectorConstructorOptions } from "@twin.org/entity-storage-connector-postgresql";
import type { IScyllaDBTableConnectorConstructorOptions } from "@twin.org/entity-storage-connector-scylladb";
import type { EntityStorageConnectorType } from "../types/entityStorageConnectorType";

/**
 * Entity storage connector config types.
 */
export type EntityStorageConnectorConfig =
	| {
			type: typeof EntityStorageConnectorType.File;
			options: Omit<IFileEntityStorageConnectorConstructorOptions, "entitySchema"> & {
				folderPrefix?: string;
			};
	  }
	| {
			type: typeof EntityStorageConnectorType.Memory;
			options?: never;
	  }
	| {
			type: typeof EntityStorageConnectorType.AwsDynamoDb;
			options: Omit<
				IDynamoDbEntityStorageConnectorConstructorOptions,
				"entitySchema" | "config"
			> & {
				config: Omit<IDynamoDbEntityStorageConnectorConstructorOptions["config"], "tableName">;
				tablePrefix?: string;
			};
	  }
	| {
			type: typeof EntityStorageConnectorType.AzureCosmosDb;
			options: Omit<
				ICosmosDbEntityStorageConnectorConstructorOptions,
				"entitySchema" | "config"
			> & {
				config: Omit<ICosmosDbEntityStorageConnectorConstructorOptions["config"], "tableName">;
				tablePrefix?: string;
			};
	  }
	| {
			type: typeof EntityStorageConnectorType.GcpFirestoreDb;
			options: Omit<
				IFirestoreEntityStorageConnectorConstructorOptions,
				"entitySchema" | "config"
			> & {
				config: Omit<IFirestoreEntityStorageConnectorConstructorOptions["config"], "tableName">;
				tablePrefix?: string;
			};
	  }
	| {
			type: typeof EntityStorageConnectorType.ScyllaDb;
			options: Omit<IScyllaDBTableConnectorConstructorOptions, "entitySchema" | "config"> & {
				config: Omit<IScyllaDBTableConnectorConstructorOptions["config"], "tableName">;
				tablePrefix?: string;
			};
	  }
	| {
			type: typeof EntityStorageConnectorType.MySqlDb;
			options: Omit<IMySqlEntityStorageConnectorConstructorOptions, "entitySchema" | "config"> & {
				config: Omit<IMySqlEntityStorageConnectorConstructorOptions["config"], "tableName">;
				tablePrefix?: string;
			};
	  }
	| {
			type: typeof EntityStorageConnectorType.MongoDb;
			options: Omit<IMongoDbEntityStorageConnectorConstructorOptions, "entitySchema" | "config"> & {
				config: Omit<IMongoDbEntityStorageConnectorConstructorOptions["config"], "collection">;
				tablePrefix?: string;
			};
	  }
	| {
			type: typeof EntityStorageConnectorType.PostgreSql;
			options: Omit<
				IPostgreSqlEntityStorageConnectorConstructorOptions,
				"entitySchema" | "config"
			> & {
				config: Omit<IPostgreSqlEntityStorageConnectorConstructorOptions["config"], "tableName">;
				tablePrefix?: string;
			};
	  };
