// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { Coerce, Is } from "@twin.org/core";
import {
	AttestationComponentType,
	AttestationConnectorType,
	AuditableItemGraphComponentType,
	AuditableItemStreamComponentType,
	BackgroundTaskConnectorType,
	BlobStorageComponentType,
	BlobStorageConnectorType,
	EntityStorageConnectorType,
	FaucetConnectorType,
	IdentityComponentType,
	IdentityConnectorType,
	IdentityProfileComponentType,
	IdentityProfileConnectorType,
	ImmutableProofComponentType,
	ImmutableStorageConnectorType,
	LoggingComponentType,
	LoggingConnectorType,
	NftComponentType,
	NftConnectorType,
	TelemetryComponentType,
	TelemetryConnectorType,
	VaultConnectorType,
	WalletConnectorType,
	type IEngineCoreConfig
} from "@twin.org/engine-models";
import type { IEngineCoreEnvironmentVariables } from "../models/IEngineCoreEnvironmentVariables";

/**
 * Build the engine core configuration from environment variables.
 * @param envVars The environment variables.
 * @returns The config for the core.
 */
export function buildEngineCoreConfiguration(
	envVars: IEngineCoreEnvironmentVariables
): IEngineCoreConfig {
	envVars.stateFilename ??= "engine-state.json";
	envVars.storageFileRoot = path.resolve(envVars.storageFileRoot);
	envVars.stateFilename = path.join(envVars.storageFileRoot, envVars.stateFilename);

	envVars.attestationAssertionMethodId ??= "attestation-assertion";
	envVars.immutableProofHashKeyId ??= "immutable-proof-hash";
	envVars.immutableProofAssertionMethodId ??= "immutable-proof-assertion";
	envVars.blobStorageEnableEncryption ??= "false";
	envVars.blobStorageEncryptionKey ??= "blob-encryption";

	const coreConfig: IEngineCoreConfig = {
		debug: Coerce.boolean(envVars.debug) ?? false,
		loggingConnector: [],
		loggingComponent: [{ type: LoggingComponentType.Service }],
		entityStorageConnector: [],
		blobStorageConnector: [],
		blobStorageComponent: [
			{
				type: BlobStorageComponentType.Service,
				options: {
					config: {
						vaultKeyId: envVars.blobStorageEncryptionKey
					}
				}
			}
		],
		backgroundTaskConnector: [],
		telemetryConnector: [],
		telemetryComponent: [{ type: TelemetryComponentType.Service }],
		vaultConnector: [],
		walletConnector: [],
		faucetConnector: [],
		immutableStorageConnector: [],
		nftConnector: [],
		nftComponent: [{ type: NftComponentType.Service }],
		identityConnector: [],
		identityComponent: [{ type: IdentityComponentType.Service }],
		identityProfileConnector: [],
		identityProfileComponent: [{ type: IdentityProfileComponentType.Service }],
		immutableProofComponent: [
			{
				type: ImmutableProofComponentType.Service,
				options: {
					config: {
						assertionMethodId: envVars.immutableProofAssertionMethodId,
						proofHashKeyId: envVars.immutableProofHashKeyId
					}
				}
			}
		],
		attestationConnector: [],
		attestationComponent: [
			{
				type: AttestationComponentType.Service
			}
		],
		auditableItemGraphComponent: [{ type: AuditableItemGraphComponentType.Service }],
		auditableItemStreamComponent: [{ type: AuditableItemStreamComponentType.Service }]
	};

	configureEntityStorageConnectors(coreConfig, envVars);
	configureBlobStorageConnectors(coreConfig, envVars);
	configureVaultConnectors(coreConfig, envVars);

	configureLogging(coreConfig, envVars);
	configureBackgroundTaskConnectors(coreConfig, envVars);
	configureTelemetryConnectors(coreConfig, envVars);

	configureFaucetConnectors(coreConfig, envVars);
	configureWalletConnectors(coreConfig, envVars);
	configureNftConnectors(coreConfig, envVars);
	configureImmutableStorageConnectors(coreConfig, envVars);
	configureIdentityConnectors(coreConfig, envVars);
	configureIdentityProfileConnectors(coreConfig, envVars);
	configureAttestationConnectors(coreConfig, envVars);

	return coreConfig;
}

/**
 * Configures the entity storage connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureEntityStorageConnectors(
	coreConfig: IEngineCoreConfig,
	envVars: IEngineCoreEnvironmentVariables
): void {
	coreConfig.entityStorageConnector ??= [];

	if (
		(Coerce.boolean(envVars.entityMemoryEnable) ?? false) ||
		envVars.blobStorageConnectorType === EntityStorageConnectorType.Memory
	) {
		coreConfig.entityStorageConnector.push({
			type: EntityStorageConnectorType.Memory
		});
	}

	if (
		(Coerce.boolean(envVars.entityFileEnable) ?? false) ||
		envVars.entityStorageConnectorType === EntityStorageConnectorType.File
	) {
		coreConfig.entityStorageConnector.push({
			type: EntityStorageConnectorType.File,
			options: { config: { directory: envVars.storageFileRoot } }
		});
	}

	if (Is.stringValue(envVars.awsDynamodbAccessKeyId)) {
		coreConfig.entityStorageConnector.push({
			type: EntityStorageConnectorType.AwsDynamoDb,
			options: {
				config: {
					region: envVars.awsDynamodbRegion,
					accessKeyId: envVars.awsDynamodbAccessKeyId,
					secretAccessKey: envVars.awsDynamodbSecretAccessKey,
					endpoint: envVars.awsDynamodbEndpoint
				},
				tablePrefix: envVars.entityStorageTablePrefix
			}
		});
	}

	if (Is.stringValue(envVars.azureCosmosdbKey)) {
		coreConfig.entityStorageConnector.push({
			type: EntityStorageConnectorType.AzureCosmosDb,
			options: {
				config: {
					endpoint: envVars.azureCosmosdbEndpoint,
					key: envVars.azureCosmosdbKey,
					databaseId: envVars.azureCosmosdbDatabaseId,
					containerId: envVars.azureCosmosdbContainerId
				},
				tablePrefix: envVars.entityStorageTablePrefix
			}
		});
	}

	if (Is.stringValue(envVars.gcpFirestoreCredentials)) {
		coreConfig.entityStorageConnector.push({
			type: EntityStorageConnectorType.GcpFirestoreDb,
			options: {
				config: {
					projectId: envVars.gcpFirestoreProjectId,
					credentials: envVars.gcpFirestoreCredentials,
					databaseId: envVars.gcpFirestoreDatabaseId,
					collectionName: envVars.gcpFirestoreCollectionName,
					endpoint: envVars.gcpFirestoreApiEndpoint
				},
				tablePrefix: envVars.entityStorageTablePrefix
			}
		});
	}

	if (Is.stringValue(envVars.scylladbHosts)) {
		coreConfig.entityStorageConnector.push({
			type: EntityStorageConnectorType.ScyllaDb,
			options: {
				config: {
					hosts: envVars.scylladbHosts.split(","),
					localDataCenter: envVars.scylladbLocalDataCenter,
					keyspace: envVars.scylladbKeyspace
				},
				tablePrefix: envVars.entityStorageTablePrefix
			}
		});
	}

	const defaultStorageConnector = envVars.entityStorageConnectorType;
	if (Is.stringValue(defaultStorageConnector)) {
		for (const config of coreConfig.entityStorageConnector) {
			if (config.type === defaultStorageConnector) {
				config.isDefault = true;
			}
		}
	}
}

/**
 * Configures the blob storage connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureBlobStorageConnectors(
	coreConfig: IEngineCoreConfig,
	envVars: IEngineCoreEnvironmentVariables
): void {
	coreConfig.blobStorageConnector ??= [];

	if (
		(Coerce.boolean(envVars.blobMemoryEnable) ?? false) ||
		envVars.blobStorageConnectorType === BlobStorageConnectorType.Memory
	) {
		coreConfig.blobStorageConnector.push({
			type: BlobStorageConnectorType.Memory
		});
	}

	if (
		(Coerce.boolean(envVars.blobFileEnable) ?? false) ||
		envVars.blobStorageConnectorType === BlobStorageConnectorType.File
	) {
		coreConfig.blobStorageConnector.push({
			type: BlobStorageConnectorType.File,
			options: {
				config: { directory: envVars.storageFileRoot },
				storagePrefix: envVars.blobStoragePrefix
			}
		});
	}

	if (Is.stringValue(envVars.ipfsApiUrl)) {
		coreConfig.blobStorageConnector.push({
			type: BlobStorageConnectorType.Ipfs,
			options: {
				config: {
					apiUrl: envVars.ipfsApiUrl,
					bearerToken: envVars.ipfsBearerToken
				}
			}
		});
	}

	if (Is.stringValue(envVars.awsS3AccessKeyId)) {
		coreConfig.blobStorageConnector.push({
			type: BlobStorageConnectorType.AwsS3,
			options: {
				config: {
					region: envVars.awsS3Region,
					bucketName: envVars.awsS3BucketName,
					accessKeyId: envVars.awsS3AccessKeyId,
					secretAccessKey: envVars.awsS3SecretAccessKey,
					endpoint: envVars.awsS3Endpoint
				},
				storagePrefix: envVars.blobStoragePrefix
			}
		});
	}

	if (Is.stringValue(envVars.azureStorageAccountKey)) {
		coreConfig.blobStorageConnector.push({
			type: BlobStorageConnectorType.AzureStorage,
			options: {
				config: {
					accountName: envVars.azureStorageAccountName,
					accountKey: envVars.azureStorageAccountKey,
					containerName: envVars.azureStorageContainerName,
					endpoint: envVars.azureStorageEndpoint
				},
				storagePrefix: envVars.blobStoragePrefix
			}
		});
	}

	if (Is.stringValue(envVars.gcpStorageCredentials)) {
		coreConfig.blobStorageConnector.push({
			type: BlobStorageConnectorType.GcpStorage,
			options: {
				config: {
					projectId: envVars.gcpStorageProjectId,
					credentials: envVars.gcpStorageCredentials,
					bucketName: envVars.gcpStorageBucketName,
					apiEndpoint: envVars.gcpFirestoreApiEndpoint
				},
				storagePrefix: envVars.blobStoragePrefix
			}
		});
	}

	const defaultStorageConnectorType = envVars.blobStorageConnectorType;
	if (Is.stringValue(defaultStorageConnectorType)) {
		for (const config of coreConfig.blobStorageConnector) {
			if (config.type === defaultStorageConnectorType) {
				config.isDefault = true;
			}
		}
	}
}

/**
 * Configures the logging connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureLogging(
	coreConfig: IEngineCoreConfig,
	envVars: IEngineCoreEnvironmentVariables
): void {
	const loggingConnectors = (envVars.loggingConnector ?? "").split(",");
	for (const loggingConnector of loggingConnectors) {
		if (loggingConnector === LoggingConnectorType.Console) {
			coreConfig.loggingConnector?.push({
				type: LoggingConnectorType.Console,
				options: {
					config: {
						translateMessages: true,
						hideGroups: true
					}
				}
			});
		} else if (loggingConnector === LoggingConnectorType.EntityStorage) {
			coreConfig.loggingConnector?.push({
				type: LoggingConnectorType.EntityStorage
			});
		}
	}
	if (loggingConnectors.length > 1) {
		coreConfig.loggingConnector?.push({
			type: LoggingConnectorType.Multi,
			isDefault: true,
			options: {
				loggingConnectorTypes: loggingConnectors
			}
		});
	}
}

/**
 * Configures the vault connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureVaultConnectors(
	coreConfig: IEngineCoreConfig,
	envVars: IEngineCoreEnvironmentVariables
): void {
	coreConfig.vaultConnector ??= [];

	if (envVars.vaultConnector === VaultConnectorType.EntityStorage) {
		coreConfig.vaultConnector.push({
			type: VaultConnectorType.EntityStorage
		});
	} else if (envVars.vaultConnector === VaultConnectorType.Hashicorp) {
		coreConfig.vaultConnector.push({
			type: VaultConnectorType.Hashicorp,
			options: {
				config: { endpoint: envVars.hashicorpVaultEndpoint, token: envVars.hashicorpVaultToken }
			}
		});
	}
}

/**
 * Configures the background task connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureBackgroundTaskConnectors(
	coreConfig: IEngineCoreConfig,
	envVars: IEngineCoreEnvironmentVariables
): void {
	coreConfig.backgroundTaskConnector ??= [];

	if (envVars.backgroundTaskConnector === BackgroundTaskConnectorType.EntityStorage) {
		coreConfig.backgroundTaskConnector.push({
			type: BackgroundTaskConnectorType.EntityStorage
		});
	}
}

/**
 * Configures the telemetry connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureTelemetryConnectors(
	coreConfig: IEngineCoreConfig,
	envVars: IEngineCoreEnvironmentVariables
): void {
	coreConfig.telemetryConnector ??= [];

	if (envVars.telemetryConnector === TelemetryConnectorType.EntityStorage) {
		coreConfig.telemetryConnector.push({
			type: TelemetryConnectorType.EntityStorage
		});
	}
}

/**
 * Configures the faucet connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureFaucetConnectors(
	coreConfig: IEngineCoreConfig,
	envVars: IEngineCoreEnvironmentVariables
): void {
	coreConfig.faucetConnector ??= [];

	if (envVars.faucetConnector === FaucetConnectorType.EntityStorage) {
		coreConfig.faucetConnector.push({
			type: FaucetConnectorType.EntityStorage
		});
	} else if (envVars.faucetConnector === FaucetConnectorType.Iota) {
		coreConfig.faucetConnector.push({
			type: FaucetConnectorType.Iota,
			options: {
				config: {
					endpoint: envVars.iotaFaucetEndpoint,
					clientOptions: {
						nodes: [envVars.iotaNodeEndpoint]
					},
					bech32Hrp: envVars.iotaBech32Hrp,
					coinType: Coerce.number(envVars.iotaCoinType)
				}
			}
		});
	}
}

/**
 * Configures the wallet connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureWalletConnectors(
	coreConfig: IEngineCoreConfig,
	envVars: IEngineCoreEnvironmentVariables
): void {
	coreConfig.walletConnector ??= [];

	if (envVars.walletConnector === WalletConnectorType.EntityStorage) {
		coreConfig.walletConnector.push({
			type: WalletConnectorType.EntityStorage
		});
	} else if (envVars.walletConnector === WalletConnectorType.Iota) {
		coreConfig.walletConnector.push({
			type: WalletConnectorType.Iota,
			options: {
				config: {
					clientOptions: {
						nodes: [envVars.iotaNodeEndpoint]
					},
					bech32Hrp: envVars.iotaBech32Hrp,
					coinType: Coerce.number(envVars.iotaCoinType)
				}
			}
		});
	}
}

/**
 * Configures the NFT connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureNftConnectors(
	coreConfig: IEngineCoreConfig,
	envVars: IEngineCoreEnvironmentVariables
): void {
	coreConfig.nftConnector ??= [];

	if (envVars.nftConnector === NftConnectorType.EntityStorage) {
		coreConfig.nftConnector.push({
			type: NftConnectorType.EntityStorage
		});
	} else if (envVars.nftConnector === NftConnectorType.Iota) {
		coreConfig.nftConnector.push({
			type: NftConnectorType.Iota,
			options: {
				config: {
					clientOptions: {
						nodes: [envVars.iotaNodeEndpoint]
					},
					bech32Hrp: envVars.iotaBech32Hrp,
					coinType: Coerce.number(envVars.iotaCoinType)
				}
			}
		});
	}
}

/**
 * Configures the immutable storage connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureImmutableStorageConnectors(
	coreConfig: IEngineCoreConfig,
	envVars: IEngineCoreEnvironmentVariables
): void {
	coreConfig.immutableStorageConnector ??= [];

	if (envVars.immutableStorageConnector === ImmutableStorageConnectorType.EntityStorage) {
		coreConfig.immutableStorageConnector.push({
			type: ImmutableStorageConnectorType.EntityStorage
		});
	} else if (envVars.immutableStorageConnector === ImmutableStorageConnectorType.Iota) {
		coreConfig.immutableStorageConnector.push({
			type: ImmutableStorageConnectorType.Iota,
			options: {
				config: {
					clientOptions: {
						nodes: [envVars.iotaNodeEndpoint]
					},
					bech32Hrp: envVars.iotaBech32Hrp,
					coinType: Coerce.number(envVars.iotaCoinType)
				}
			}
		});
	}
}

/**
 * Configures the identity connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureIdentityConnectors(
	coreConfig: IEngineCoreConfig,
	envVars: IEngineCoreEnvironmentVariables
): void {
	coreConfig.identityConnector ??= [];

	if (envVars.identityConnector === IdentityConnectorType.EntityStorage) {
		coreConfig.identityConnector.push({
			type: IdentityConnectorType.EntityStorage
		});
	} else if (envVars.identityConnector === IdentityConnectorType.Iota) {
		coreConfig.identityConnector.push({
			type: IdentityConnectorType.Iota,
			options: {
				config: {
					clientOptions: {
						nodes: [envVars.iotaNodeEndpoint]
					},
					bech32Hrp: envVars.iotaBech32Hrp,
					coinType: Coerce.number(envVars.iotaCoinType)
				}
			}
		});
	}
}

/**
 * Configures the identity profile connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureIdentityProfileConnectors(
	coreConfig: IEngineCoreConfig,
	envVars: IEngineCoreEnvironmentVariables
): void {
	coreConfig.identityProfileConnector ??= [];

	if (envVars.identityProfileConnector === IdentityConnectorType.EntityStorage) {
		coreConfig.identityProfileConnector.push({
			type: IdentityProfileConnectorType.EntityStorage
		});
	}
}

/**
 * Configures the attestation connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureAttestationConnectors(
	coreConfig: IEngineCoreConfig,
	envVars: IEngineCoreEnvironmentVariables
): void {
	coreConfig.attestationConnector ??= [];

	if (envVars.attestationConnector === AttestationConnectorType.EntityStorage) {
		coreConfig.attestationConnector.push({
			type: AttestationConnectorType.EntityStorage
		});
	} else if (envVars.attestationConnector === AttestationConnectorType.Iota) {
		coreConfig.attestationConnector.push({
			type: AttestationConnectorType.Iota
		});
	}
}
