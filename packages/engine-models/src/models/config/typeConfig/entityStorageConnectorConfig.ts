// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ICosmosDbEntityStorageConnectorConfig } from "@twin.org/entity-storage-connector-cosmosdb";
import type { IDynamoDbEntityStorageConnectorConfig } from "@twin.org/entity-storage-connector-dynamodb";
import type { IFileEntityStorageConnectorConfig } from "@twin.org/entity-storage-connector-file";
import type { IFirestoreEntityStorageConnectorConfig } from "@twin.org/entity-storage-connector-gcp-firestore";
import type { IScyllaDBTableConfig } from "@twin.org/entity-storage-connector-scylladb";
import type { EntityStorageConnectorType } from "../../types/entityStorageConnectorType";

/**
 * Entity storage connector config types.
 */
export type EntityStorageConnectorConfig =
	| {
			type: typeof EntityStorageConnectorType.File;
			options: {
				config: IFileEntityStorageConnectorConfig;
				folderPrefix?: string;
			};
	  }
	| {
			type: typeof EntityStorageConnectorType.Memory;
			options?: never;
	  }
	| {
			type: typeof EntityStorageConnectorType.AwsDynamoDb;
			options: {
				loggingConnectorType?: string;
				config: Omit<IDynamoDbEntityStorageConnectorConfig, "tableName">;
				tablePrefix?: string;
			};
	  }
	| {
			type: typeof EntityStorageConnectorType.AzureCosmosDb;
			options: {
				loggingConnectorType?: string;
				config: Omit<ICosmosDbEntityStorageConnectorConfig, "tableName">;
				tablePrefix?: string;
			};
	  }
	| {
			type: typeof EntityStorageConnectorType.GcpFirestoreDb;
			options: {
				loggingConnectorType?: string;
				config: Omit<IFirestoreEntityStorageConnectorConfig, "tableName">;
				tablePrefix?: string;
			};
	  }
	| {
			type: typeof EntityStorageConnectorType.ScyllaDb;
			options: {
				loggingConnectorType?: string;
				config: Omit<IScyllaDBTableConfig, "tableName">;
				tablePrefix?: string;
			};
	  };
