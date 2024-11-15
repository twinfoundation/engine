// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineCoreTypeConfig } from "./IEngineCoreTypeConfig";
import type { AttestationComponentConfig } from "./typeConfig/attestationComponentConfig";
import type { AttestationConnectorConfig } from "./typeConfig/attestationConnectorConfig";
import type { AuditableItemGraphComponentConfig } from "./typeConfig/auditableItemGraphComponentConfig";
import type { AuditableItemStreamComponentConfig } from "./typeConfig/auditableItemStreamComponentConfig";
import type { BackgroundTaskConnectorConfig } from "./typeConfig/backgroundTaskConnectorConfig";
import type { BlobStorageComponentConfig } from "./typeConfig/blobStorageComponentConfig";
import type { BlobStorageConnectorConfig } from "./typeConfig/blobStorageConnectorConfig";
import type { DltConfig } from "./typeConfig/dltConfig";
import type { EntityStorageComponentConfig } from "./typeConfig/entityStorageComponentConfig";
import type { EntityStorageConnectorConfig } from "./typeConfig/entityStorageConnectorConfig";
import type { FaucetConnectorConfig } from "./typeConfig/faucetConnectorConfig";
import type { IdentityComponentConfig } from "./typeConfig/identityComponentConfig";
import type { IdentityConnectorConfig } from "./typeConfig/identityConnectorConfig";
import type { IdentityProfileComponentConfig } from "./typeConfig/identityProfileComponentConfig";
import type { IdentityProfileConnectorConfig } from "./typeConfig/identityProfileConnectorConfig";
import type { ImmutableProofComponentConfig } from "./typeConfig/immutableProofComponentConfig";
import type { ImmutableStorageConnectorConfig } from "./typeConfig/immutableStorageConnectorConfig";
import type { LoggingComponentConfig } from "./typeConfig/loggingComponentConfig";
import type { LoggingConnectorConfig } from "./typeConfig/loggingConnectorConfig";
import type { NftComponentConfig } from "./typeConfig/nftComponentConfig";
import type { NftConnectorConfig } from "./typeConfig/nftConnectorConfig";
import type { TelemetryComponentConfig } from "./typeConfig/telemetryComponentConfig";
import type { TelemetryConnectorConfig } from "./typeConfig/telemetryConnectorConfig";
import type { VaultConnectorConfig } from "./typeConfig/vaultConnectorConfig";
import type { WalletConnectorConfig } from "./typeConfig/walletConnectorConfig";

/**
 * Configuration for the engine core.
 */
export interface IEngineCoreConfig {
	/**
	 * Start the engine in debug mode.
	 * @default false
	 */
	debug?: boolean;

	/**
	 * Disable output to the console.
	 * @default false
	 */
	silent?: boolean;

	/**
	 * Logging connector options which can be overridden by individual components by specifying types other than default.
	 */
	loggingConnector?: IEngineCoreTypeConfig<LoggingConnectorConfig>[];

	/**
	 * Logging component options which can be overridden by individual components by specifying types other than default.
	 */
	loggingComponent?: IEngineCoreTypeConfig<LoggingComponentConfig>[];

	/**
	 * Entity storage connector options which can be overridden by individual components by specifying types other than default.
	 */
	entityStorageConnector?: IEngineCoreTypeConfig<EntityStorageConnectorConfig>[];

	/**
	 * Entity storage component options which can be overridden by individual components by specifying types other than default.
	 */
	entityStorageComponent?: IEngineCoreTypeConfig<EntityStorageComponentConfig>[];

	/**
	 * Blob storage connector options which can be overridden by individual components by specifying types other than default.
	 */
	blobStorageConnector?: IEngineCoreTypeConfig<BlobStorageConnectorConfig>[];

	/**
	 * Blob storage component options which can be overridden by individual components by specifying types other than default.
	 */
	blobStorageComponent?: IEngineCoreTypeConfig<BlobStorageComponentConfig>[];

	/**
	 * Telemetry connector options which can be overridden by individual components by specifying types other than default.
	 */
	telemetryConnector?: IEngineCoreTypeConfig<TelemetryConnectorConfig>[];

	/**
	 * Telemetry component options which can be overridden by individual components by specifying types other than default.
	 */
	telemetryComponent?: IEngineCoreTypeConfig<TelemetryComponentConfig>[];

	/**
	 * Background task connector options which can be overridden by individual components by specifying types other than default.
	 */
	backgroundTaskConnector?: IEngineCoreTypeConfig<BackgroundTaskConnectorConfig>[];

	/**
	 * Vault connector options which can be overridden by individual components by specifying types other than default.
	 */
	vaultConnector?: IEngineCoreTypeConfig<VaultConnectorConfig>[];

	/**
	 * DLT options which can be overridden by individual components by specifying types other than default.
	 */
	dltConfig?: IEngineCoreTypeConfig<DltConfig>[];

	/**
	 * Wallet connector options which can be overridden by individual components by specifying types other than default.
	 */
	walletConnector?: IEngineCoreTypeConfig<WalletConnectorConfig>[];

	/**
	 * Immutable storage connector options which can be overridden by individual components by specifying types other than default.
	 */
	immutableStorageConnector?: IEngineCoreTypeConfig<ImmutableStorageConnectorConfig>[];

	/**
	 * Immutable proof component options which can be overridden by individual components by specifying types other than default.
	 */
	immutableProofComponent?: IEngineCoreTypeConfig<ImmutableProofComponentConfig>[];

	/**
	 * Faucet connector options which can be overridden by individual components by specifying types other than default.
	 */
	faucetConnector?: IEngineCoreTypeConfig<FaucetConnectorConfig>[];

	/**
	 * Identity connector options which can be overridden by individual components by specifying types other than default.
	 */
	identityConnector?: IEngineCoreTypeConfig<IdentityConnectorConfig>[];

	/**
	 * Identity component profile options which can be overridden by individual components by specifying types other than default.
	 */
	identityComponent?: IEngineCoreTypeConfig<IdentityComponentConfig>[];

	/**
	 * Identity profile connector options which can be overridden by individual components by specifying types other than default.
	 */
	identityProfileConnector?: IEngineCoreTypeConfig<IdentityProfileConnectorConfig>[];

	/**
	 * Identity profile component profile options which can be overridden by individual components by specifying types other than default.
	 */
	identityProfileComponent?: IEngineCoreTypeConfig<IdentityProfileComponentConfig>[];

	/**
	 * NFT connector options which can be overridden by individual components by specifying types other than default.
	 */
	nftConnector?: IEngineCoreTypeConfig<NftConnectorConfig>[];

	/**
	 * NFT component options which can be overridden by individual components by specifying types other than default.
	 */
	nftComponent?: IEngineCoreTypeConfig<NftComponentConfig>[];

	/**
	 * Attestation connector options which can be overridden by individual components by specifying types other than default.
	 */
	attestationConnector?: IEngineCoreTypeConfig<AttestationConnectorConfig>[];

	/**
	 * Attestation component profile options which can be overridden by individual components by specifying types other than default.
	 */
	attestationComponent?: IEngineCoreTypeConfig<AttestationComponentConfig>[];

	/**
	 * Auditable item graph component options which can be overridden by individual components by specifying types other than default.
	 */
	auditableItemGraphComponent?: IEngineCoreTypeConfig<AuditableItemGraphComponentConfig>[];

	/**
	 * Auditable item stream component profile options which can be overridden by individual components by specifying types other than default.
	 */
	auditableItemStreamComponent?: IEngineCoreTypeConfig<AuditableItemStreamComponentConfig>[];
}
