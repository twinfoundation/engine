// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineCoreConfig, IEngineCoreTypeConfig } from "@twin.org/engine-models";
import type { AttestationComponentConfig } from "./config/attestationComponentConfig";
import type { AttestationConnectorConfig } from "./config/attestationConnectorConfig";
import type { AuditableItemGraphComponentConfig } from "./config/auditableItemGraphComponentConfig";
import type { AuditableItemStreamComponentConfig } from "./config/auditableItemStreamComponentConfig";
import type { BackgroundTaskConnectorConfig } from "./config/backgroundTaskConnectorConfig";
import type { BlobStorageComponentConfig } from "./config/blobStorageComponentConfig";
import type { BlobStorageConnectorConfig } from "./config/blobStorageConnectorConfig";
import type { DltConfig } from "./config/dltConfig";
import type { EntityStorageComponentConfig } from "./config/entityStorageComponentConfig";
import type { EntityStorageConnectorConfig } from "./config/entityStorageConnectorConfig";
import type { FaucetConnectorConfig } from "./config/faucetConnectorConfig";
import type { IdentityComponentConfig } from "./config/identityComponentConfig";
import type { IdentityConnectorConfig } from "./config/identityConnectorConfig";
import type { IdentityProfileComponentConfig } from "./config/identityProfileComponentConfig";
import type { IdentityProfileConnectorConfig } from "./config/identityProfileConnectorConfig";
import type { ImmutableProofComponentConfig } from "./config/immutableProofComponentConfig";
import type { ImmutableStorageConnectorConfig } from "./config/immutableStorageConnectorConfig";
import type { LoggingComponentConfig } from "./config/loggingComponentConfig";
import type { LoggingConnectorConfig } from "./config/loggingConnectorConfig";
import type { NftComponentConfig } from "./config/nftComponentConfig";
import type { NftConnectorConfig } from "./config/nftConnectorConfig";
import type { TelemetryComponentConfig } from "./config/telemetryComponentConfig";
import type { TelemetryConnectorConfig } from "./config/telemetryConnectorConfig";
import type { VaultConnectorConfig } from "./config/vaultConnectorConfig";
import type { WalletConnectorConfig } from "./config/walletConnectorConfig";

/**
 * Extended engine core config with known types.
 */
export interface IEngineCoreTypesConfig extends IEngineCoreConfig {
	/**
	 * The types to initialise in the engine.
	 */
	types: {
		[type: string]: IEngineCoreTypeConfig[] | undefined;

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
	};
}
