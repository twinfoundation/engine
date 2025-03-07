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
	DataConverterConnectorType,
	DataExtractorConnectorType,
	DataProcessingComponentType,
	DocumentManagementComponentType,
	EntityStorageConnectorType,
	EventBusComponentType,
	EventBusConnectorType,
	FaucetConnectorType,
	IdentityComponentType,
	IdentityConnectorType,
	IdentityProfileComponentType,
	IdentityProfileConnectorType,
	IdentityResolverComponentType,
	IdentityResolverConnectorType,
	type IEngineConfig,
	ImmutableProofComponentType,
	ImmutableStorageComponentType,
	ImmutableStorageConnectorType,
	LoggingComponentType,
	LoggingConnectorType,
	MessagingComponentType,
	MessagingEmailConnectorType,
	MessagingPushNotificationConnectorType,
	MessagingSmsConnectorType,
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

	envVars.attestationVerificationMethodId ??= "attestation-assertion";
	envVars.immutableProofVerificationMethodId ??= "immutable-proof-assertion";
	envVars.blobStorageEnableEncryption ??= "false";
	envVars.blobStorageEncryptionKey ??= "blob-encryption";

	const coreConfig: IEngineConfig = {
		debug: Coerce.boolean(envVars.debug) ?? false,
		types: {}
	};

	configureEntityStorage(coreConfig, envVars);
	configureBlobStorage(coreConfig, envVars);
	configureVault(coreConfig, envVars);

	configureLogging(coreConfig, envVars);
	configureBackgroundTask(coreConfig, envVars);
	configureEventBus(coreConfig, envVars);
	configureTelemetry(coreConfig, envVars);
	configureMessaging(coreConfig, envVars);

	configureFaucet(coreConfig, envVars);
	configureWallet(coreConfig, envVars);
	configureNft(coreConfig, envVars);
	configureImmutableStorage(coreConfig, envVars);
	configureIdentity(coreConfig, envVars);
	configureIdentityResolver(coreConfig, envVars);
	configureIdentityProfile(coreConfig, envVars);
	configureAttestation(coreConfig, envVars);
	configureDataProcessing(coreConfig, envVars);

	configureAuditableItemGraph(coreConfig, envVars);
	configureAuditableItemStream(coreConfig, envVars);
	configureDocumentManagement(coreConfig, envVars);

	return coreConfig;
}

/**
 * Configures the entity storage.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureEntityStorage(
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

	if (Is.stringValue(envVars.mySqlHost)) {
		coreConfig.types.entityStorageConnector.push({
			type: EntityStorageConnectorType.MySqlDb,
			options: {
				config: {
					host: envVars.mySqlHost,
					port: envVars.mySqlPort ?? 3306,
					user: envVars.mySqlUser ?? "",
					password: envVars.mySqlPassword ?? "",
					database: envVars.mySqlDatabase ?? ""
				},
				tablePrefix: envVars.entityStorageTablePrefix
			}
		});
	}

	if (Is.stringValue(envVars.mySqlHost)) {
		coreConfig.types.entityStorageConnector.push({
			type: EntityStorageConnectorType.MySqlDb,
			options: {
				config: {
					host: envVars.mySqlHost,
					port: envVars.mySqlPort ?? 3306,
					user: envVars.mySqlUser ?? "",
					password: envVars.mySqlPassword ?? "",
					database: envVars.mySqlDatabase ?? ""
				},
				tablePrefix: envVars.entityStorageTablePrefix
			}
		});
	}

	if (Is.stringValue(envVars.mongoDbHost)) {
		coreConfig.types.entityStorageConnector.push({
			type: EntityStorageConnectorType.MongoDb,
			options: {
				config: {
					host: envVars.mongoDbHost,
					port: envVars.mongoDbPort,
					user: envVars.mongoDbUser ?? "",
					password: envVars.mongoDbPassword ?? "",
					database: envVars.mongoDbDatabase ?? ""
				},
				tablePrefix: envVars.entityStorageTablePrefix
			}
		});
	}

	if (Is.stringValue(envVars.postgreSqlHost)) {
		coreConfig.types.entityStorageConnector.push({
			type: EntityStorageConnectorType.PostgreSql,
			options: {
				config: {
					host: envVars.postgreSqlHost,
					port: envVars.postgreSqlPort,
					user: envVars.postgreSqlUser ?? "",
					password: envVars.postgreSqlPassword ?? "",
					database: envVars.postgreSqlDatabase ?? ""
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
 * Configures the blob storage.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureBlobStorage(
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
 * Configures the logging.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureLogging(coreConfig: IEngineConfig, envVars: IEngineEnvironmentVariables): void {
	coreConfig.types.loggingConnector ??= [];

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
				},
				isDefault: loggingConnectors.length === 1
			});
		} else if (loggingConnector === LoggingConnectorType.EntityStorage) {
			coreConfig.types.loggingConnector?.push({
				type: LoggingConnectorType.EntityStorage,
				isDefault: loggingConnectors.length === 1
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
 * Configures the vault.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureVault(coreConfig: IEngineConfig, envVars: IEngineEnvironmentVariables): void {
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
 * Configures the background task.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureBackgroundTask(
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
 * Configures the event bud.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureEventBus(coreConfig: IEngineConfig, envVars: IEngineEnvironmentVariables): void {
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
 * Configures the telemetry.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureTelemetry(coreConfig: IEngineConfig, envVars: IEngineEnvironmentVariables): void {
	coreConfig.types.telemetryConnector ??= [];

	if (envVars.telemetryConnector === TelemetryConnectorType.EntityStorage) {
		coreConfig.types.telemetryConnector.push({
			type: TelemetryConnectorType.EntityStorage
		});
	}

	if (coreConfig.types.telemetryConnector.length > 0) {
		coreConfig.types.telemetryComponent ??= [];
		coreConfig.types.telemetryComponent.push({ type: TelemetryComponentType.Service });
	}
}

/**
 * Configures the messaging.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureMessaging(coreConfig: IEngineConfig, envVars: IEngineEnvironmentVariables): void {
	coreConfig.types.messagingEmailConnector ??= [];
	coreConfig.types.messagingSmsConnector ??= [];
	coreConfig.types.messagingPushNotificationConnector ??= [];

	if (envVars.messagingEmailConnector === MessagingEmailConnectorType.EntityStorage) {
		coreConfig.types.messagingEmailConnector.push({
			type: MessagingEmailConnectorType.EntityStorage
		});
	} else if (envVars.messagingEmailConnector === MessagingEmailConnectorType.Aws) {
		coreConfig.types.messagingEmailConnector.push({
			type: MessagingEmailConnectorType.Aws,
			options: {
				config: {
					region: envVars.awsS3Region ?? "",
					accessKeyId: envVars.awsS3AccessKeyId ?? "",
					secretAccessKey: envVars.awsS3SecretAccessKey ?? "",
					endpoint: envVars.awsS3Endpoint ?? ""
				}
			}
		});
	}

	if (envVars.messagingSmsConnector === MessagingSmsConnectorType.EntityStorage) {
		coreConfig.types.messagingSmsConnector.push({
			type: MessagingSmsConnectorType.EntityStorage
		});
	} else if (envVars.messagingSmsConnector === MessagingSmsConnectorType.Aws) {
		coreConfig.types.messagingSmsConnector.push({
			type: MessagingSmsConnectorType.Aws,
			options: {
				config: {
					region: envVars.awsS3Region ?? "",
					accessKeyId: envVars.awsS3AccessKeyId ?? "",
					secretAccessKey: envVars.awsS3SecretAccessKey ?? "",
					endpoint: envVars.awsS3Endpoint ?? ""
				}
			}
		});
	}

	if (
		envVars.messagingPushNotificationConnector ===
		MessagingPushNotificationConnectorType.EntityStorage
	) {
		coreConfig.types.messagingPushNotificationConnector.push({
			type: MessagingPushNotificationConnectorType.EntityStorage
		});
	} else if (
		envVars.messagingPushNotificationConnector === MessagingPushNotificationConnectorType.Aws
	) {
		coreConfig.types.messagingPushNotificationConnector.push({
			type: MessagingPushNotificationConnectorType.Aws,
			options: {
				config: {
					region: envVars.awsS3Region ?? "",
					accessKeyId: envVars.awsS3AccessKeyId ?? "",
					secretAccessKey: envVars.awsS3SecretAccessKey ?? "",
					endpoint: envVars.awsS3Endpoint ?? "",
					applicationsSettings: Is.json(envVars.awsMessagingPushNotificationApplications)
						? JSON.parse(envVars.awsMessagingPushNotificationApplications)
						: []
				}
			}
		});
	}

	if (
		coreConfig.types.messagingEmailConnector.length > 0 ||
		coreConfig.types.messagingSmsConnector.length > 0 ||
		coreConfig.types.messagingPushNotificationConnector.length > 0
	) {
		coreConfig.types.messagingComponent ??= [];
		coreConfig.types.messagingComponent.push({ type: MessagingComponentType.Service });
	}
}

/**
 * Configures the faucet.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureFaucet(coreConfig: IEngineConfig, envVars: IEngineEnvironmentVariables): void {
	coreConfig.types.faucetConnector ??= [];

	if (envVars.faucetConnector === FaucetConnectorType.EntityStorage) {
		coreConfig.types.faucetConnector.push({
			type: FaucetConnectorType.EntityStorage
		});
	} else if (envVars.faucetConnector === FaucetConnectorType.IotaStardust) {
		coreConfig.types.faucetConnector.push({
			type: FaucetConnectorType.IotaStardust,
			options: {
				config: {
					endpoint: envVars.iotaStardustFaucetEndpoint ?? "",
					clientOptions: {
						nodes: [envVars.iotaStardustNodeEndpoint ?? ""]
					},
					bech32Hrp: envVars.iotaStardustBech32Hrp,
					coinType: Coerce.number(envVars.iotaStardustCoinType)
				}
			}
		});
	} else if (envVars.faucetConnector === FaucetConnectorType.Iota) {
		coreConfig.types.faucetConnector.push({
			type: FaucetConnectorType.Iota,
			options: {
				config: {
					endpoint: envVars.iotaFaucetEndpoint ?? "",
					clientOptions: {
						url: envVars.iotaNodeEndpoint ?? ""
					},
					network: envVars.iotaNetwork ?? "",
					coinType: Coerce.number(envVars.iotaCoinType)
				}
			}
		});
	}
}

/**
 * Configures the wallet.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureWallet(coreConfig: IEngineConfig, envVars: IEngineEnvironmentVariables): void {
	coreConfig.types.walletConnector ??= [];

	if (envVars.walletConnector === WalletConnectorType.EntityStorage) {
		coreConfig.types.walletConnector.push({
			type: WalletConnectorType.EntityStorage
		});
	} else if (envVars.walletConnector === WalletConnectorType.IotaStardust) {
		coreConfig.types.walletConnector.push({
			type: WalletConnectorType.IotaStardust,
			options: {
				config: {
					clientOptions: {
						nodes: [envVars.iotaStardustNodeEndpoint ?? ""]
					},
					bech32Hrp: envVars.iotaStardustBech32Hrp,
					coinType: Coerce.number(envVars.iotaStardustCoinType)
				}
			}
		});
	} else if (envVars.walletConnector === WalletConnectorType.Iota) {
		coreConfig.types.walletConnector.push({
			type: WalletConnectorType.Iota,
			options: {
				config: {
					clientOptions: {
						url: envVars.iotaNodeEndpoint ?? ""
					},
					network: envVars.iotaNetwork ?? "",
					coinType: Coerce.number(envVars.iotaCoinType)
				}
			}
		});
	}
}

/**
 * Configures the NFT.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureNft(coreConfig: IEngineConfig, envVars: IEngineEnvironmentVariables): void {
	coreConfig.types.nftConnector ??= [];

	if (envVars.nftConnector === NftConnectorType.EntityStorage) {
		coreConfig.types.nftConnector.push({
			type: NftConnectorType.EntityStorage
		});
	} else if (envVars.nftConnector === NftConnectorType.IotaStardust) {
		coreConfig.types.nftConnector.push({
			type: NftConnectorType.IotaStardust,
			options: {
				config: {
					clientOptions: {
						nodes: [envVars.iotaStardustNodeEndpoint ?? ""]
					},
					bech32Hrp: envVars.iotaStardustBech32Hrp,
					coinType: Coerce.number(envVars.iotaStardustCoinType)
				}
			}
		});
	} else if (envVars.nftConnector === NftConnectorType.Iota) {
		coreConfig.types.nftConnector.push({
			type: NftConnectorType.Iota,
			options: {
				config: {
					clientOptions: {
						url: envVars.iotaNodeEndpoint ?? ""
					},
					network: envVars.iotaNetwork ?? "",
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
 * Configures the immutable storage.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureImmutableStorage(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.immutableStorageConnector ??= [];

	if (envVars.immutableStorageConnector === ImmutableStorageConnectorType.EntityStorage) {
		coreConfig.types.immutableStorageConnector.push({
			type: ImmutableStorageConnectorType.EntityStorage
		});
	} else if (envVars.immutableStorageConnector === ImmutableStorageConnectorType.IotaStardust) {
		coreConfig.types.immutableStorageConnector.push({
			type: ImmutableStorageConnectorType.IotaStardust,
			options: {
				config: {
					clientOptions: {
						nodes: [envVars.iotaStardustNodeEndpoint ?? ""]
					},
					bech32Hrp: envVars.iotaStardustBech32Hrp,
					coinType: Coerce.number(envVars.iotaStardustCoinType)
				}
			}
		});
	} else if (envVars.immutableStorageConnector === ImmutableStorageConnectorType.Iota) {
		coreConfig.types.immutableStorageConnector.push({
			type: ImmutableStorageConnectorType.Iota,
			options: {
				config: {
					clientOptions: {
						url: envVars.iotaNodeEndpoint ?? ""
					},
					network: envVars.iotaNetwork ?? "",
					coinType: Coerce.number(envVars.iotaCoinType)
				}
			}
		});
	}

	if (coreConfig.types.immutableStorageConnector.length > 0) {
		coreConfig.types.immutableStorageComponent ??= [];
		coreConfig.types.immutableStorageComponent.push({
			type: ImmutableStorageComponentType.Service
		});

		coreConfig.types.immutableProofComponent ??= [];
		coreConfig.types.immutableProofComponent.push({
			type: ImmutableProofComponentType.Service,
			options: {
				config: {
					verificationMethodId: envVars.immutableProofVerificationMethodId
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
 * Configures the identity.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureIdentity(coreConfig: IEngineConfig, envVars: IEngineEnvironmentVariables): void {
	coreConfig.types.identityConnector ??= [];

	if (envVars.identityConnector === IdentityConnectorType.EntityStorage) {
		coreConfig.types.identityConnector.push({
			type: IdentityConnectorType.EntityStorage
		});
	} else if (envVars.identityConnector === IdentityConnectorType.IotaStardust) {
		coreConfig.types.identityConnector.push({
			type: IdentityConnectorType.IotaStardust,
			options: {
				config: {
					clientOptions: {
						nodes: [envVars.iotaStardustNodeEndpoint ?? ""]
					},
					bech32Hrp: envVars.iotaStardustBech32Hrp,
					coinType: Coerce.number(envVars.iotaStardustCoinType)
				}
			}
		});
	} else if (envVars.identityConnector === IdentityConnectorType.Iota) {
		coreConfig.types.identityConnector.push({
			type: IdentityConnectorType.Iota,
			options: {
				config: {
					clientOptions: {
						url: envVars.iotaNodeEndpoint ?? ""
					},
					network: envVars.iotaNetwork ?? "",
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
 * Configures the identity resolver.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureIdentityResolver(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.identityResolverConnector ??= [];

	if (envVars.identityResolverConnector === IdentityResolverConnectorType.EntityStorage) {
		coreConfig.types.identityResolverConnector.push({
			type: IdentityResolverConnectorType.EntityStorage
		});
	} else if (envVars.identityResolverConnector === IdentityResolverConnectorType.IotaStardust) {
		coreConfig.types.identityResolverConnector.push({
			type: IdentityResolverConnectorType.IotaStardust,
			options: {
				config: {
					clientOptions: {
						nodes: [envVars.iotaStardustNodeEndpoint ?? ""]
					},
					bech32Hrp: envVars.iotaStardustBech32Hrp,
					coinType: Coerce.number(envVars.iotaStardustCoinType)
				}
			}
		});
	} else if (envVars.identityResolverConnector === IdentityResolverConnectorType.Iota) {
		coreConfig.types.identityResolverConnector.push({
			type: IdentityResolverConnectorType.Iota,
			options: {
				config: {
					clientOptions: {
						url: envVars.iotaNodeEndpoint ?? ""
					},
					network: envVars.iotaNetwork ?? "",
					coinType: Coerce.number(envVars.iotaCoinType)
				}
			}
		});
	} else if (envVars.identityResolverConnector === IdentityResolverConnectorType.IotaUniversal) {
		coreConfig.types.identityResolverConnector.push({
			type: IdentityResolverConnectorType.IotaUniversal,
			options: {
				config: {
					endpoint: envVars.iotaUniversalResolverEndpoint ?? ""
				}
			}
		});
	}

	if (coreConfig.types.identityResolverConnector.length > 0) {
		coreConfig.types.identityResolverComponent ??= [];
		coreConfig.types.identityResolverComponent.push({
			type: IdentityResolverComponentType.Service
		});
	}
}

/**
 * Configures the identity profile.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureIdentityProfile(
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
 * Configures the attestation.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureAttestation(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.attestationConnector ??= [];

	if (envVars.attestationConnector === AttestationConnectorType.Nft) {
		coreConfig.types.attestationConnector.push({
			type: AttestationConnectorType.Nft
		});
	}

	if (coreConfig.types.attestationConnector.length > 0) {
		coreConfig.types.attestationComponent ??= [];
		coreConfig.types.attestationComponent.push({
			type: AttestationComponentType.Service,
			options: {
				config: {
					verificationMethodId: envVars.attestationVerificationMethodId
				}
			}
		});
	}
}

/**
 * Configures the auditable item graph.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureAuditableItemGraph(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	if (Is.arrayValue(coreConfig.types.immutableStorageConnector)) {
		coreConfig.types.auditableItemGraphComponent ??= [];
		coreConfig.types.auditableItemGraphComponent.push({
			type: AuditableItemGraphComponentType.Service
		});
	}
}

/**
 * Configures the auditable item stream.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureAuditableItemStream(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	if (Is.arrayValue(coreConfig.types.immutableStorageConnector)) {
		coreConfig.types.auditableItemStreamComponent ??= [];
		coreConfig.types.auditableItemStreamComponent.push({
			type: AuditableItemStreamComponentType.Service
		});
	}
}

/**
 * Configures the data processing.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureDataProcessing(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	coreConfig.types.dataConverterConnector ??= [];
	coreConfig.types.dataExtractorConnector ??= [];

	const converterConnectors = envVars.dataConverterConnectors?.split(",") ?? [];
	for (const converterConnector of converterConnectors) {
		if (converterConnector === DataConverterConnectorType.Json) {
			coreConfig.types.dataConverterConnector.push({
				type: DataConverterConnectorType.Json
			});
		} else if (converterConnector === DataConverterConnectorType.Xml) {
			coreConfig.types.dataConverterConnector.push({
				type: DataConverterConnectorType.Xml
			});
		}
	}

	const extractorConnectors = envVars.dataExtractorConnectors?.split(",") ?? [];
	for (const extractorConnector of extractorConnectors) {
		if (extractorConnector === DataExtractorConnectorType.JsonPath) {
			coreConfig.types.dataExtractorConnector.push({
				type: DataExtractorConnectorType.JsonPath
			});
		}
	}

	if (
		coreConfig.types.dataConverterConnector.length > 0 ||
		coreConfig.types.dataExtractorConnector.length > 0
	) {
		coreConfig.types.dataProcessingComponent ??= [];
		coreConfig.types.dataProcessingComponent.push({ type: DataProcessingComponentType.Service });
	}
}

/**
 * Configures the document management.
 * @param coreConfig The core config.
 * @param envVars The environment variables.
 */
function configureDocumentManagement(
	coreConfig: IEngineConfig,
	envVars: IEngineEnvironmentVariables
): void {
	if (
		Is.arrayValue(coreConfig.types.auditableItemGraphComponent) &&
		Is.arrayValue(coreConfig.types.blobStorageComponent) &&
		Is.arrayValue(coreConfig.types.attestationComponent)
	) {
		coreConfig.types.documentManagementComponent ??= [];
		coreConfig.types.documentManagementComponent.push({
			type: DocumentManagementComponentType.Service
		});
	}
}
