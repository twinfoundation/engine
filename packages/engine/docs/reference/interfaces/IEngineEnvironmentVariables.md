# Interface: IEngineEnvironmentVariables

The engine core environment variables.

## Properties

### debug?

> `optional` **debug**: `string`

Start the engine in debug mode.

***

### storageFileRoot?

> `optional` **storageFileRoot**: `string`

The root directory for storing items like state file.

***

### stateFilename?

> `optional` **stateFilename**: `string`

The name of the state file.

***

### entityStorageConnectorType?

> `optional` **entityStorageConnectorType**: `string`

The type of the default entity storage: file, memory, aws-dynamodb, azure-cosmosdb, gcp-firestoredb, scylladb.

***

### entityStorageTablePrefix?

> `optional` **entityStorageTablePrefix**: `string`

A prefix for all the table in entity-storage, can be empty.

***

### entityFileEnable?

> `optional` **entityFileEnable**: `string`

Enable the file entity storage connector.

***

### entityMemoryEnable?

> `optional` **entityMemoryEnable**: `string`

Enable the memory entity storage connector.

***

### awsDynamodbAccessKeyId?

> `optional` **awsDynamodbAccessKeyId**: `string`

AWS Dynamo DB access key id.

***

### awsDynamodbEndpoint?

> `optional` **awsDynamodbEndpoint**: `string`

AWS Dynamo DB Endpoint if running local instance.

***

### awsDynamodbRegion?

> `optional` **awsDynamodbRegion**: `string`

AWS Dynamo DB region.

***

### awsDynamodbSecretAccessKey?

> `optional` **awsDynamodbSecretAccessKey**: `string`

AWS Dynamo DB secret access key.

***

### azureCosmosdbKey?

> `optional` **azureCosmosdbKey**: `string`

Azure Cosmos DB key.

***

### azureCosmosdbContainerId?

> `optional` **azureCosmosdbContainerId**: `string`

Azure Cosmos DB container id.

***

### azureCosmosdbDatabaseId?

> `optional` **azureCosmosdbDatabaseId**: `string`

Azure Cosmos DB database id.

***

### azureCosmosdbEndpoint?

> `optional` **azureCosmosdbEndpoint**: `string`

Azure Cosmos DB endpoint.

***

### gcpFirestoreCollectionName?

> `optional` **gcpFirestoreCollectionName**: `string`

GCP Firestore collection name.

***

### gcpFirestoreCredentials?

> `optional` **gcpFirestoreCredentials**: `string`

GCP Firestore credentials.

***

### gcpFirestoreDatabaseId?

> `optional` **gcpFirestoreDatabaseId**: `string`

GCP Firestore database id.

***

### gcpFirestoreApiEndpoint?

> `optional` **gcpFirestoreApiEndpoint**: `string`

GCP Firestore endpoint.

***

### gcpFirestoreProjectId?

> `optional` **gcpFirestoreProjectId**: `string`

GCP Firestore project id.

***

### scylladbHosts?

> `optional` **scylladbHosts**: `string`

ScyllaDB hosts as comma separated string.

***

### scylladbKeyspace?

> `optional` **scylladbKeyspace**: `string`

ScyllaDB keyspace.

***

### scylladbLocalDataCenter?

> `optional` **scylladbLocalDataCenter**: `string`

ScyllaDB local data center.

***

### ipfsBearerToken?

> `optional` **ipfsBearerToken**: `string`

The security token for accessing IPFS API.

***

### ipfsApiUrl?

> `optional` **ipfsApiUrl**: `string`

The url for accessing IPFS API.

***

### blobStorageConnectorType?

> `optional` **blobStorageConnectorType**: `string`

The type of the default blob storage: memory, file, ipfs, aws-s3, azure-storage, gcp-storage.

***

### blobStorageEnableEncryption?

> `optional` **blobStorageEnableEncryption**: `string`

Enable encryption for the blob storage.

***

### blobStorageEncryptionKey?

> `optional` **blobStorageEncryptionKey**: `string`

The encryption key for the blob storage.

***

### blobStoragePrefix?

> `optional` **blobStoragePrefix**: `string`

A prefix for all the blobs in blob-storage, can be empty.

***

### blobFileEnable?

> `optional` **blobFileEnable**: `string`

Enable the file blob storage connector.

***

### blobMemoryEnable?

> `optional` **blobMemoryEnable**: `string`

Enable the memory blob storage connector.

***

### awsS3AccessKeyId?

> `optional` **awsS3AccessKeyId**: `string`

AWS S3 access key id.

***

### awsS3BucketName?

> `optional` **awsS3BucketName**: `string`

AWS S3 bucket name.

***

### awsS3Endpoint?

> `optional` **awsS3Endpoint**: `string`

AWS S3 endpoint.

***

### awsS3Region?

> `optional` **awsS3Region**: `string`

AWS S3 region.

***

### awsS3SecretAccessKey?

> `optional` **awsS3SecretAccessKey**: `string`

AWS S3 secret access key.

***

### azureStorageAccountKey?

> `optional` **azureStorageAccountKey**: `string`

Azure Storage account key.

***

### azureStorageAccountName?

> `optional` **azureStorageAccountName**: `string`

Azure Storage account name.

***

### azureStorageContainerName?

> `optional` **azureStorageContainerName**: `string`

Azure Storage container.

***

### azureStorageEndpoint?

> `optional` **azureStorageEndpoint**: `string`

Azure Storage endpoint.

***

### gcpStorageBucketName?

> `optional` **gcpStorageBucketName**: `string`

GCP Storage bucket.

***

### gcpStorageCredentials?

> `optional` **gcpStorageCredentials**: `string`

GCP Storage credentials.

***

### gcpStorageEndpoint?

> `optional` **gcpStorageEndpoint**: `string`

GCP Storage endpoint.

***

### gcpStorageProjectId?

> `optional` **gcpStorageProjectId**: `string`

GCP Storage project id.

***

### vaultConnector?

> `optional` **vaultConnector**: `string`

The type of the default vault connector: entity-storage, hashicorp.

***

### hashicorpVaultToken?

> `optional` **hashicorpVaultToken**: `string`

Hashicorp Vault token.

***

### hashicorpVaultEndpoint?

> `optional` **hashicorpVaultEndpoint**: `string`

Hashicorp Vault endpoint.

***

### loggingConnector?

> `optional` **loggingConnector**: `string`

The type of background task connector, can be a comma separated list: console, entity-storage.

***

### backgroundTaskConnector?

> `optional` **backgroundTaskConnector**: `string`

The type of background task connector: entity-storage.

***

### eventBusConnector?

> `optional` **eventBusConnector**: `string`

The type of event bus connector: local.

***

### eventBusComponent?

> `optional` **eventBusComponent**: `string`

The type of event bus component: service.

***

### telemetryConnector?

> `optional` **telemetryConnector**: `string`

The type of telemetry connector: entity-storage.

***

### faucetConnector?

> `optional` **faucetConnector**: `string`

The type of faucet connector: entity-storage, iota.

***

### walletConnector?

> `optional` **walletConnector**: `string`

The type of wallet connector: entity-storage, iota.

***

### nftConnector?

> `optional` **nftConnector**: `string`

The type of NFT connector: entity-storage, iota.

***

### identityConnector?

> `optional` **identityConnector**: `string`

The type of identity connector: entity-storage, iota.

***

### immutableStorageConnector?

> `optional` **immutableStorageConnector**: `string`

The type of immutable storage connector: entity-storage, iota.

***

### iotaFaucetEndpoint?

> `optional` **iotaFaucetEndpoint**: `string`

IOTA Faucet Endpoint.

***

### iotaNodeEndpoint?

> `optional` **iotaNodeEndpoint**: `string`

IOTA Node Endpoint.

***

### iotaBech32Hrp?

> `optional` **iotaBech32Hrp**: `string`

IOTA Bech32 HRP

***

### iotaCoinType?

> `optional` **iotaCoinType**: `string`

IOTA coin type.

***

### iotaExplorerEndpoint?

> `optional` **iotaExplorerEndpoint**: `string`

IOTA Explorer Endpoint.

***

### identityProfileConnector?

> `optional` **identityProfileConnector**: `string`

The type of identity profile connector: entity-storage.

***

### immutableProofAssertionMethodId?

> `optional` **immutableProofAssertionMethodId**: `string`

The identity assertion method id to use with immutable proofs.

***

### immutableProofHashKeyId?

> `optional` **immutableProofHashKeyId**: `string`

The hash key from the vault to use with immutable proofs.

***

### attestationConnector?

> `optional` **attestationConnector**: `string`

The type of attestation connector: entity-storage, iota.

***

### attestationAssertionMethodId?

> `optional` **attestationAssertionMethodId**: `string`

The identity assertion method id to use with attestation.
