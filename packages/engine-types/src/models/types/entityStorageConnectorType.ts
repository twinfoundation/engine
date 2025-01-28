// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Entity storage connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntityStorageConnectorType = {
	/**
	 * Use storage.
	 */
	File: "file",

	/**
	 * Memory.
	 */
	Memory: "memory",

	/**
	 * ScyllaDb.
	 */
	ScyllaDb: "scylladb",

	/**
	 * AWS DynamoDB.
	 */
	AwsDynamoDb: "aws-dynamodb",

	/**
	 * Azure CosmosDB.
	 */
	AzureCosmosDb: "azure-cosmosdb",

	/**
	 * GCP Firestore.
	 */
	GcpFirestoreDb: "gcp-firestoredb",

	/**
	 * MySqlDb.
	 */
	MySqlDb: "mysql"
} as const;

/**
 * Entity storage connector types.
 */
export type EntityStorageConnectorType =
	(typeof EntityStorageConnectorType)[keyof typeof EntityStorageConnectorType];
