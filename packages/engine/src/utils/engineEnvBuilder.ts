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
	EventBusConnectorType,
	EventBusComponentType,
	FaucetConnectorType,
	IdentityComponentType,
	IdentityConnectorType,
	IdentityProfileComponentType,
	IdentityProfileConnectorType,
	type IEngineConfig,
	ImmutableProofComponentType,
	ImmutableStorageConnectorType,
	LoggingComponentType,
	LoggingConnectorType,
	NftComponentType,
	NftConnectorType,
	TelemetryComponentType,
	TelemetryConnectorType,
	VaultConnectorType,
	WalletConnectorType
} from "@twin.org/engine-types";
import type { IEngineEnvironmentVariables } from "../models/IEngineEnvironmentVariables";

/**
 * Build the engine core configuration from environment variables.
 * @param envVars The environment variables.
 * @returns The config for the core.
 */
export function buildEngineConfiguration(envVars: IEngineEnvironmentVariables): IEngineConfig {
	if (Is.stringValue(envVars.storageFileRoot)) {
		envVars.stateFilename ??= "engine-state.json";
		envVars.storageFileRoot = path.resolve(envVars.storageFileRoot);
		envVars.stateFilename = path.join(envVars.storageFileRoot, envVars.stateFilename);
	}

	envVars.attestationAssertionMethodId ??= "attestation-assertion";
	envVars.immutableProofHashKeyId ??= "immutable-proof-hash";
	envVars.immutableProofAssertionMethodId ??= "immutable-proof-assertion";
	envVars.blobStorageEnableEncryption ??= "false";
	envVars.blobStorageEncryptionKey ??= "blob-encryption";

	const coreConfig: IEngineConfig = {
		debug: Coerce.boolean(envVars.debug) ?? false,
		types: {}
	};

	configureEntityStorageConnectors(coreConfig, envVars);
	configureBlobStorageConnectors(coreConfig, envVars);
	configureVaultConnectors(coreConfig, envVars);

	configureLoggingConnectors(coreConfig, envVars);
	configureBackgroundTaskConnectors(coreConfig, envVars);
	configureEventBusConnectors(coreConfig, envVars);
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
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types ??= {};
	coreConfig.types.entityStorageConnector ??= [];

	if (
		(Coerce.boolean(envVars.entityMemoryEnable) ?? false) ||
		envVars.entityStorageConnectorType === EntityStorageConnectorType.Memory
	) {
		coreConfig.types.entityStorageConnector.push({
			type: EntityStorageConnectorType.Memory
		});
	}

	if (
		(Coerce.boolean(envVars.entityFileEnable) ?? false) ||
		envVars.entityStorageConnectorType === EntityStorageConnectorType.File
	) {
		coreConfig.types.entityStorageConnector.push({
			type: EntityStorageConnectorType.File,
			options: {
				config: { directory: envVars.storageFileRoot ?? "" },
				folderPrefix: envVars.entityStorageTablePrefix
			}
		});
	}

	if (Is.stringValue(envVars.awsDynamodbAccessKeyId)) {
		coreConfig.types.entityStorageConnector.push({
			type: EntityStorageConnectorType.AwsDynamoDb,
			options: {
				config: {
					region: envVars.awsDynamodbRegion ?? "",
					accessKeyId: envVars.awsDynamodbAccessKeyId ?? "",
					secretAccessKey: envVars.awsDynamodbSecretAccessKey ?? "",
					endpoint: envVars.awsDynamodbEndpoint ?? ""
				},
				tablePrefix: envVars.entityStorageTablePrefix
			}
		});
	}

	if (Is.stringValue(envVars.azureCosmosdbKey)) {
		coreConfig.types.entityStorageConnector.push({
			type: EntityStorageConnectorType.AzureCosmosDb,
			options: {
				config: {
					endpoint: envVars.azureCosmosdbEndpoint ?? "",
					key: envVars.azureCosmosdbKey ?? "",
					databaseId: envVars.azureCosmosdbDatabaseId ?? "",
					containerId: envVars.azureCosmosdbContainerId ?? ""
				},
				tablePrefix: envVars.entityStorageTablePrefix
			}
		});
	}

	if (Is.stringValue(envVars.gcpFirestoreCredentials)) {
		coreConfig.types.entityStorageConnector.push({
			type: EntityStorageConnectorType.GcpFirestoreDb,
			options: {
				config: {
					projectId: envVars.gcpFirestoreProjectId ?? "",
					credentials: envVars.gcpFirestoreCredentials ?? "",
					databaseId: envVars.gcpFirestoreDatabaseId ?? "",
					collectionName: envVars.gcpFirestoreCollectionName ?? "",
					endpoint: envVars.gcpFirestoreApiEndpoint ?? ""
				},
				tablePrefix: envVars.entityStorageTablePrefix
			}
		});
	}

	if (Is.stringValue(envVars.scylladbHosts)) {
		coreConfig.types.entityStorageConnector.push({
			type: EntityStorageConnectorType.ScyllaDb,
			options: {
				config: {
					hosts: envVars.scylladbHosts.split(",") ?? "",
					localDataCenter: envVars.scylladbLocalDataCenter ?? "",
					keyspace: envVars.scylladbKeyspace ?? ""
				},
				tablePrefix: envVars.entityStorageTablePrefix
			}
		});
	}

	const defaultStorageConnector = envVars.entityStorageConnectorType;
	if (Is.stringValue(defaultStorageConnector)) {
		for (const config of coreConfig.types.entityStorageConnector) {
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
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.blobStorageConnector ??= [];

	if (
		(Coerce.boolean(envVars.blobMemoryEnable) ?? false) ||
		envVars.blobStorageConnectorType === BlobStorageConnectorType.Memory
	) {
		coreConfig.types.blobStorageConnector.push({
			type: BlobStorageConnectorType.Memory
		});
	}

	if (
		(Coerce.boolean(envVars.blobFileEnable) ?? false) ||
		envVars.blobStorageConnectorType === BlobStorageConnectorType.File
	) {
		coreConfig.types.blobStorageConnector.push({
			type: BlobStorageConnectorType.File,
			options: {
				config: {
					directory: Is.stringValue(envVars.storageFileRoot)
						? path.join(envVars.storageFileRoot, "blob-storage")
						: ""
				},
				storagePrefix: envVars.blobStoragePrefix
			}
		});
	}

	if (Is.stringValue(envVars.ipfsApiUrl)) {
		coreConfig.types.blobStorageConnector.push({
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
		coreConfig.types.blobStorageConnector.push({
			type: BlobStorageConnectorType.AwsS3,
			options: {
				config: {
					region: envVars.awsS3Region ?? "",
					bucketName: envVars.awsS3BucketName ?? "",
					accessKeyId: envVars.awsS3AccessKeyId ?? "",
					secretAccessKey: envVars.awsS3SecretAccessKey ?? "",
					endpoint: envVars.awsS3Endpoint ?? ""
				},
				storagePrefix: envVars.blobStoragePrefix
			}
		});
	}

	if (Is.stringValue(envVars.azureStorageAccountKey)) {
		coreConfig.types.blobStorageConnector.push({
			type: BlobStorageConnectorType.AzureStorage,
			options: {
				config: {
					accountName: envVars.azureStorageAccountName ?? "",
					accountKey: envVars.azureStorageAccountKey ?? "",
					containerName: envVars.azureStorageContainerName ?? "",
					endpoint: envVars.azureStorageEndpoint ?? ""
				},
				storagePrefix: envVars.blobStoragePrefix
			}
		});
	}

	if (Is.stringValue(envVars.gcpStorageCredentials)) {
		coreConfig.types.blobStorageConnector.push({
			type: BlobStorageConnectorType.GcpStorage,
			options: {
				config: {
					projectId: envVars.gcpStorageProjectId ?? "",
					credentials: envVars.gcpStorageCredentials ?? "",
					bucketName: envVars.gcpStorageBucketName ?? "",
					apiEndpoint: envVars.gcpFirestoreApiEndpoint
				},
				storagePrefix: envVars.blobStoragePrefix
			}
		});
	}

	const defaultStorageConnectorType = envVars.blobStorageConnectorType;
	if (Is.stringValue(defaultStorageConnectorType)) {
		for (const config of coreConfig.types.blobStorageConnector) {
			if (config.type === defaultStorageConnectorType) {
				config.isDefault = true;
			}
		}
	}

	if (coreConfig.types.blobStorageConnector.length > 0) {
		coreConfig.types.blobStorageComponent ??= [];
		coreConfig.types.blobStorageComponent.push({
			type: BlobStorageComponentType.Service,
			options: {
				config: {
					vaultKeyId: envVars.blobStorageEncryptionKey
				}
			}
		});
	}
}

/**
 * Configures the logging connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureLoggingConnectors(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	const loggingConnectors = (envVars.loggingConnector ?? "").split(",");
	for (const loggingConnector of loggingConnectors) {
		if (loggingConnector === LoggingConnectorType.Console) {
			coreConfig.types.loggingConnector?.push({
				type: LoggingConnectorType.Console,
				options: {
					config: {
						translateMessages: true,
						hideGroups: true
					}
				}
			});
		} else if (loggingConnector === LoggingConnectorType.EntityStorage) {
			coreConfig.types.loggingConnector?.push({
				type: LoggingConnectorType.EntityStorage
			});
		}
	}
	if (loggingConnectors.length > 1) {
		coreConfig.types.loggingConnector?.push({
			type: LoggingConnectorType.Multi,
			isDefault: true,
			options: {
				loggingConnectorTypes: loggingConnectors
			}
		});
	}

	if (loggingConnectors.length > 0) {
		coreConfig.types.loggingComponent ??= [];
		coreConfig.types.loggingComponent.push({ type: LoggingComponentType.Service });
	}
}

/**
 * Configures the vault connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureVaultConnectors(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.vaultConnector ??= [];

	if (envVars.vaultConnector === VaultConnectorType.EntityStorage) {
		coreConfig.types.vaultConnector.push({
			type: VaultConnectorType.EntityStorage
		});
	} else if (envVars.vaultConnector === VaultConnectorType.Hashicorp) {
		coreConfig.types.vaultConnector.push({
			type: VaultConnectorType.Hashicorp,
			options: {
				config: {
					endpoint: envVars.hashicorpVaultEndpoint ?? "",
					token: envVars.hashicorpVaultToken ?? ""
				}
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
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.backgroundTaskConnector ??= [];

	if (envVars.backgroundTaskConnector === BackgroundTaskConnectorType.EntityStorage) {
		coreConfig.types.backgroundTaskConnector.push({
			type: BackgroundTaskConnectorType.EntityStorage
		});
	}
}

/**
 * Configures the event bud connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureEventBusConnectors(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.eventBusConnector ??= [];

	if (envVars.eventBusConnector === EventBusConnectorType.Local) {
		coreConfig.types.eventBusConnector.push({
			type: EventBusConnectorType.Local
		});
	}

	if (coreConfig.types.eventBusConnector.length > 0) {
		coreConfig.types.eventBusComponent ??= [];
		coreConfig.types.eventBusComponent.push({ type: EventBusComponentType.Service });
	}
}

/**
 * Configures the telemetry connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureTelemetryConnectors(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.telemetryConnector ??= [];

	if (envVars.telemetryConnector === TelemetryConnectorType.EntityStorage) {
		coreConfig.types.telemetryConnector.push({
			type: TelemetryConnectorType.EntityStorage
		});
	}

	if (coreConfig.types.telemetryConnector.length > 0) {
		coreConfig.types.telemetryComponents ??= [];
		coreConfig.types.telemetryComponents.push({ type: TelemetryComponentType.Service });
	}
}

/**
 * Configures the faucet connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureFaucetConnectors(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.faucetConnector ??= [];

	if (envVars.faucetConnector === FaucetConnectorType.EntityStorage) {
		coreConfig.types.faucetConnector.push({
			type: FaucetConnectorType.EntityStorage
		});
	} else if (envVars.faucetConnector === FaucetConnectorType.Iota) {
		coreConfig.types.faucetConnector.push({
			type: FaucetConnectorType.Iota,
			options: {
				config: {
					endpoint: envVars.iotaFaucetEndpoint ?? "",
					clientOptions: {
						nodes: [envVars.iotaNodeEndpoint ?? ""]
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
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.walletConnector ??= [];

	if (envVars.walletConnector === WalletConnectorType.EntityStorage) {
		coreConfig.types.walletConnector.push({
			type: WalletConnectorType.EntityStorage
		});
	} else if (envVars.walletConnector === WalletConnectorType.Iota) {
		coreConfig.types.walletConnector.push({
			type: WalletConnectorType.Iota,
			options: {
				config: {
					clientOptions: {
						nodes: [envVars.iotaNodeEndpoint ?? ""]
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
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.nftConnector ??= [];

	if (envVars.nftConnector === NftConnectorType.EntityStorage) {
		coreConfig.types.nftConnector.push({
			type: NftConnectorType.EntityStorage
		});
	} else if (envVars.nftConnector === NftConnectorType.Iota) {
		coreConfig.types.nftConnector.push({
			type: NftConnectorType.Iota,
			options: {
				config: {
					clientOptions: {
						nodes: [envVars.iotaNodeEndpoint ?? ""]
					},
					bech32Hrp: envVars.iotaBech32Hrp,
					coinType: Coerce.number(envVars.iotaCoinType)
				}
			}
		});
	}

	if (coreConfig.types.nftConnector.length > 0) {
		coreConfig.types.nftComponent ??= [];
		coreConfig.types.nftComponent.push({ type: NftComponentType.Service });
	}
}

/**
 * Configures the immutable storage connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureImmutableStorageConnectors(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.immutableStorageConnector ??= [];

	if (envVars.immutableStorageConnector === ImmutableStorageConnectorType.EntityStorage) {
		coreConfig.types.immutableStorageConnector.push({
			type: ImmutableStorageConnectorType.EntityStorage
		});
	} else if (envVars.immutableStorageConnector === ImmutableStorageConnectorType.Iota) {
		coreConfig.types.immutableStorageConnector.push({
			type: ImmutableStorageConnectorType.Iota,
			options: {
				config: {
					clientOptions: {
						nodes: [envVars.iotaNodeEndpoint ?? ""]
					},
					bech32Hrp: envVars.iotaBech32Hrp,
					coinType: Coerce.number(envVars.iotaCoinType)
				}
			}
		});
	}

	if (coreConfig.types.immutableStorageConnector.length > 0) {
		coreConfig.types.immutableProofComponent ??= [];
		coreConfig.types.immutableProofComponent.push({
			type: ImmutableProofComponentType.Service,
			options: {
				config: {
					assertionMethodId: envVars.immutableProofAssertionMethodId,
					proofHashKeyId: envVars.immutableProofHashKeyId
				}
			}
		});

		coreConfig.types.auditableItemGraphComponent ??= [];
		coreConfig.types.auditableItemGraphComponent.push({
			type: AuditableItemGraphComponentType.Service
		});

		coreConfig.types.auditableItemStreamComponent ??= [];
		coreConfig.types.auditableItemStreamComponent.push({
			type: AuditableItemStreamComponentType.Service
		});
	}
}

/**
 * Configures the identity connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureIdentityConnectors(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.identityConnector ??= [];

	if (envVars.identityConnector === IdentityConnectorType.EntityStorage) {
		coreConfig.types.identityConnector.push({
			type: IdentityConnectorType.EntityStorage
		});
	} else if (envVars.identityConnector === IdentityConnectorType.Iota) {
		coreConfig.types.identityConnector.push({
			type: IdentityConnectorType.Iota,
			options: {
				config: {
					clientOptions: {
						nodes: [envVars.iotaNodeEndpoint ?? ""]
					},
					bech32Hrp: envVars.iotaBech32Hrp,
					coinType: Coerce.number(envVars.iotaCoinType)
				}
			}
		});
	}

	if (coreConfig.types.identityConnector.length > 0) {
		coreConfig.types.identityComponent ??= [];
		coreConfig.types.identityComponent.push({ type: IdentityComponentType.Service });
	}
}

/**
 * Configures the identity profile connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureIdentityProfileConnectors(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.identityProfileConnector ??= [];

	if (envVars.identityProfileConnector === IdentityConnectorType.EntityStorage) {
		coreConfig.types.identityProfileConnector.push({
			type: IdentityProfileConnectorType.EntityStorage
		});
	}

	if (coreConfig.types.identityProfileConnector.length > 0) {
		coreConfig.types.identityProfileComponent ??= [];
		coreConfig.types.identityProfileComponent.push({ type: IdentityProfileComponentType.Service });
	}
}

/**
 * Configures the attestation connectors for the core.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureAttestationConnectors(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.attestationConnector ??= [];

	if (envVars.attestationConnector === AttestationConnectorType.EntityStorage) {
		coreConfig.types.attestationConnector.push({
			type: AttestationConnectorType.EntityStorage
		});
	} else if (envVars.attestationConnector === AttestationConnectorType.Iota) {
		coreConfig.types.attestationConnector.push({
			type: AttestationConnectorType.Iota
		});
	}

	if (coreConfig.types.attestationConnector.length > 0) {
		coreConfig.types.attestationComponent ??= [];
		coreConfig.types.attestationComponent.push({
			type: AttestationComponentType.Service
		});
	}
}
