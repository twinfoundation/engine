// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The engine core environment variables.
 */
export interface IEngineCoreEnvironmentVariables {
	/**
	 * Start the engine in debug mode.
	 */
	debug: string;

	/**
	 * The root directory for storing items like state file.
	 */
	storageFileRoot: string;

	/**
	 * The name of the state file.
	 */
	stateFilename: string;

	/**
	 * The type of the default entity storage: file, memory, aws-dynamodb, azure-cosmosdb, gcp-firestoredb, scylladb.
	 */
	entityStorageConnectorType: string;

	/**
	 * A prefix for all the table in entity-storage, can be empty.
	 */
	entityStorageTablePrefix: string;

	/**
	 * AWS Dynamo DB access key id.
	 */
	awsDynamodbAccessKeyId: string;

	/**
	 * AWS Dynamo DB Endpoint if running local instance.
	 */
	awsDynamodbEndpoint: string;

	/**
	 * AWS Dynamo DB region.
	 */
	awsDynamodbRegion: string;

	/**
	 * AWS Dynamo DB secret access key.
	 */
	awsDynamodbSecretAccessKey: string;

	/**
	 * Azure Cosmos DB key.
	 */
	azureCosmosdbKey: string;

	/**
	 * Azure Cosmos DB container id.
	 */
	azureCosmosdbContainerId: string;

	/**
	 * Azure Cosmos DB database id.
	 */
	azureCosmosdbDatabaseId: string;

	/**
	 * Azure Cosmos DB endpoint.
	 */
	azureCosmosdbEndpoint: string;

	/**
	 * GCP Firestore collection name.
	 */
	gcpFirestoreCollectionName: string;

	/**
	 * GCP Firestore credentials.
	 */
	gcpFirestoreCredentials: string;

	/**
	 * GCP Firestore database id.
	 */
	gcpFirestoreDatabaseId: string;

	/**
	 * GCP Firestore endpoint.
	 */
	gcpFirestoreApiEndpoint: string;

	/**
	 * GCP Firestore project id.
	 */
	gcpFirestoreProjectId: string;

	/**
	 * ScyllaDB hosts as comma separated string.
	 */
	scylladbHosts: string;

	/**
	 * ScyllaDB keyspace.
	 */
	scylladbKeyspace: string;

	/**
	 * ScyllaDB local data center.
	 */
	scylladbLocalDataCenter: string;

	/**
	 * The security token for accessing IPFS API.
	 */
	ipfsBearerToken: string;

	/**
	 * The url for accessing IPFS API.
	 */
	ipfsApiUrl: string;

	/**
	 * The type of the default blob storage: memory, file, ipfs, aws-s3, azure-storage, gcp-storage.
	 */
	blobStorageConnectorType: string;

	/**
	 * Enable encryption for the blob storage.
	 */
	blobStorageEnableEncryption: string;

	/**
	 * The encryption key for the blob storage.
	 */
	blobStorageEncryptionKey: string;

	/**
	 * A prefix for all the blobs in blob-storage, can be empty.
	 */
	blobStoragePrefix: string;

	/**
	 * AWS S3 access key id.
	 */
	awsS3AccessKeyId: string;

	/**
	 * AWS S3 bucket name.
	 */
	awsS3BucketName: string;

	/**
	 * AWS S3 endpoint.
	 */
	awsS3Endpoint: string;

	/**
	 * AWS S3 region.
	 */
	awsS3Region: string;

	/**
	 * AWS S3 secret access key.
	 */
	awsS3SecretAccessKey: string;

	/**
	 * Azure Storage account key.
	 */
	azureStorageAccountKey: string;

	/**
	 * Azure Storage account name.
	 */
	azureStorageAccountName: string;

	/**
	 * Azure Storage container.
	 */
	azureStorageContainerName: string;

	/**
	 * Azure Storage endpoint.
	 */
	azureStorageEndpoint: string;

	/**
	 * GCP Storage bucket.
	 */
	gcpStorageBucketName: string;

	/**
	 * GCP Storage credentials.
	 */
	gcpStorageCredentials: string;

	/**
	 * GCP Storage endpoint.
	 */
	gcpStorageEndpoint: string;

	/**
	 * GCP Storage project id.
	 */
	gcpStorageProjectId: string;

	/**
	 * The type of the default vault connector: entity-storage, hashicorp.
	 */
	vaultConnector: string;

	/**
	 * Hashicorp Vault token.
	 */
	hashicorpVaultToken: string;

	/**
	 * Hashicorp Vault endpoint.
	 */
	hashicorpVaultEndpoint: string;

	/**
	 * The type of background task connector, can be a comma separated list: console, entity-storage.
	 */
	loggingConnector: string;

	/**
	 * The type of background task connector: entity-storage.
	 */
	backgroundTaskConnector: string;

	/**
	 * The type of telemetry connector: entity-storage.
	 */
	telemetryConnector: string;

	/**
	 * The type of faucet connector: entity-storage, iota.
	 */
	faucetConnector: string;

	/**
	 * The type of wallet connector: entity-storage, iota.
	 */
	walletConnector: string;

	/**
	 * The type of NFT connector: entity-storage, iota.
	 */
	nftConnector: string;

	/**
	 * The type of identity connector: entity-storage, iota.
	 */
	identityConnector: string;

	/**
	 * The type of immutable storage connector: entity-storage, iota.
	 */
	immutableStorageConnector: string;

	/**
	 * IOTA Faucet Endpoint.
	 */
	iotaFaucetEndpoint: string;

	/**
	 * IOTA Node Endpoint.
	 */
	iotaNodeEndpoint: string;

	/**
	 * IOTA Bech32 HRP
	 */
	iotaBech32Hrp: string;

	/**
	 * IOTA coin type.
	 */
	iotaCoinType: string;

	/**
	 * IOTA Explorer Endpoint.
	 */
	iotaExplorerEndpoint: string;

	/**
	 * The type of identity profile connector: entity-storage.
	 */
	identityProfileConnector: string;

	/**
	 * The identity assertion method id to use with immutable proofs.
	 */
	immutableProofAssertionMethodId: string;

	/**
	 * The hash key from the vault to use with immutable proofs.
	 */
	immutableProofHashKeyId: string;

	/**
	 * The type of attestation connector: entity-storage, iota.
	 */
	attestationConnector: string;

	/**
	 * The identity assertion method id to use with attestation.
	 */
	attestationAssertionMethodId: string;
}