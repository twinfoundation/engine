# Interface: IEngineEnvironmentVariables

The engine core environment variables.

## Properties

### debug

> **debug**: `string`

Start the engine in debug mode.

***

### storageFileRoot

> **storageFileRoot**: `string`

The root directory for storing items like state file.

***

### stateFilename

> **stateFilename**: `string`

The name of the state file.

***

### entityStorageConnectorType

> **entityStorageConnectorType**: `string`

The type of the default entity storage: file, memory, aws-dynamodb, azure-cosmosdb, gcp-firestoredb, scylladb.

***

### entityStorageTablePrefix

> **entityStorageTablePrefix**: `string`

A prefix for all the table in entity-storage, can be empty.

***

### entityFileEnable

> **entityFileEnable**: `string`

Enable the file entity storage connector.

***

### entityMemoryEnable

> **entityMemoryEnable**: `string`

Enable the memory entity storage connector.

***

### awsDynamodbAccessKeyId

> **awsDynamodbAccessKeyId**: `string`

AWS Dynamo DB access key id.

***

### awsDynamodbEndpoint

> **awsDynamodbEndpoint**: `string`

AWS Dynamo DB Endpoint if running local instance.

***

### awsDynamodbRegion

> **awsDynamodbRegion**: `string`

AWS Dynamo DB region.

***

### awsDynamodbSecretAccessKey

> **awsDynamodbSecretAccessKey**: `string`

AWS Dynamo DB secret access key.

***

### azureCosmosdbKey

> **azureCosmosdbKey**: `string`

Azure Cosmos DB key.

***

### azureCosmosdbContainerId

> **azureCosmosdbContainerId**: `string`

Azure Cosmos DB container id.

***

### azureCosmosdbDatabaseId

> **azureCosmosdbDatabaseId**: `string`

Azure Cosmos DB database id.

***

### azureCosmosdbEndpoint

> **azureCosmosdbEndpoint**: `string`

Azure Cosmos DB endpoint.

***

### gcpFirestoreCollectionName

> **gcpFirestoreCollectionName**: `string`

GCP Firestore collection name.

***

### gcpFirestoreCredentials

> **gcpFirestoreCredentials**: `string`

GCP Firestore credentials.

***

### gcpFirestoreDatabaseId

> **gcpFirestoreDatabaseId**: `string`

GCP Firestore database id.

***

### gcpFirestoreApiEndpoint

> **gcpFirestoreApiEndpoint**: `string`

GCP Firestore endpoint.

***

### gcpFirestoreProjectId

> **gcpFirestoreProjectId**: `string`

GCP Firestore project id.

***

### scylladbHosts

> **scylladbHosts**: `string`

ScyllaDB hosts as comma separated string.

***

### scylladbKeyspace

> **scylladbKeyspace**: `string`

ScyllaDB keyspace.

***

### scylladbLocalDataCenter

> **scylladbLocalDataCenter**: `string`

ScyllaDB local data center.

***

### ipfsBearerToken

> **ipfsBearerToken**: `string`

The security token for accessing IPFS API.

***

### ipfsApiUrl

> **ipfsApiUrl**: `string`

The url for accessing IPFS API.

***

### blobStorageConnectorType

> **blobStorageConnectorType**: `string`

The type of the default blob storage: memory, file, ipfs, aws-s3, azure-storage, gcp-storage.

***

### blobStorageEnableEncryption

> **blobStorageEnableEncryption**: `string`

Enable encryption for the blob storage.

***

### blobStorageEncryptionKey

> **blobStorageEncryptionKey**: `string`

The encryption key for the blob storage.

***

### blobStoragePrefix

> **blobStoragePrefix**: `string`

A prefix for all the blobs in blob-storage, can be empty.

***

### blobFileEnable

> **blobFileEnable**: `string`

Enable the file blob storage connector.

***

### blobMemoryEnable

> **blobMemoryEnable**: `string`

Enable the memory blob storage connector.

***

### awsS3AccessKeyId

> **awsS3AccessKeyId**: `string`

AWS S3 access key id.

***

### awsS3BucketName

> **awsS3BucketName**: `string`

AWS S3 bucket name.

***

### awsS3Endpoint

> **awsS3Endpoint**: `string`

AWS S3 endpoint.

***

### awsS3Region

> **awsS3Region**: `string`

AWS S3 region.

***

### awsS3SecretAccessKey

> **awsS3SecretAccessKey**: `string`

AWS S3 secret access key.

***

### azureStorageAccountKey

> **azureStorageAccountKey**: `string`

Azure Storage account key.

***

### azureStorageAccountName

> **azureStorageAccountName**: `string`

Azure Storage account name.

***

### azureStorageContainerName

> **azureStorageContainerName**: `string`

Azure Storage container.

***

### azureStorageEndpoint

> **azureStorageEndpoint**: `string`

Azure Storage endpoint.

***

### gcpStorageBucketName

> **gcpStorageBucketName**: `string`

GCP Storage bucket.

***

### gcpStorageCredentials

> **gcpStorageCredentials**: `string`

GCP Storage credentials.

***

### gcpStorageEndpoint

> **gcpStorageEndpoint**: `string`

GCP Storage endpoint.

***

### gcpStorageProjectId

> **gcpStorageProjectId**: `string`

GCP Storage project id.

***

### vaultConnector

> **vaultConnector**: `string`

The type of the default vault connector: entity-storage, hashicorp.

***

### hashicorpVaultToken

> **hashicorpVaultToken**: `string`

Hashicorp Vault token.

***

### hashicorpVaultEndpoint

> **hashicorpVaultEndpoint**: `string`

Hashicorp Vault endpoint.

***

### loggingConnector

> **loggingConnector**: `string`

The type of background task connector, can be a comma separated list: console, entity-storage.

***

### backgroundTaskConnector

> **backgroundTaskConnector**: `string`

The type of background task connector: entity-storage.

***

### telemetryConnector

> **telemetryConnector**: `string`

The type of telemetry connector: entity-storage.

***

### faucetConnector

> **faucetConnector**: `string`

The type of faucet connector: entity-storage, iota.

***

### walletConnector

> **walletConnector**: `string`

The type of wallet connector: entity-storage, iota.

***

### nftConnector

> **nftConnector**: `string`

The type of NFT connector: entity-storage, iota.

***

### identityConnector

> **identityConnector**: `string`

The type of identity connector: entity-storage, iota.

***

### immutableStorageConnector

> **immutableStorageConnector**: `string`

The type of immutable storage connector: entity-storage, iota.

***

### iotaFaucetEndpoint

> **iotaFaucetEndpoint**: `string`

IOTA Faucet Endpoint.

***

### iotaNodeEndpoint

> **iotaNodeEndpoint**: `string`

IOTA Node Endpoint.

***

### iotaBech32Hrp

> **iotaBech32Hrp**: `string`

IOTA Bech32 HRP

***

### iotaCoinType

> **iotaCoinType**: `string`

IOTA coin type.

***

### iotaExplorerEndpoint

> **iotaExplorerEndpoint**: `string`

IOTA Explorer Endpoint.

***

### identityProfileConnector

> **identityProfileConnector**: `string`

The type of identity profile connector: entity-storage.

***

### immutableProofAssertionMethodId

> **immutableProofAssertionMethodId**: `string`

The identity assertion method id to use with immutable proofs.

***

### immutableProofHashKeyId

> **immutableProofHashKeyId**: `string`

The hash key from the vault to use with immutable proofs.

***

### attestationConnector

> **attestationConnector**: `string`

The type of attestation connector: entity-storage, iota.

***

### attestationAssertionMethodId

> **attestationAssertionMethodId**: `string`

The identity assertion method id to use with attestation.
