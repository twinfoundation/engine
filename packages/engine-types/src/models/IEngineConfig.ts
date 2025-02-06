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
import type { DataConverterConnectorConfig } from "./config/dataConverterConnectorConfig";
import type { DataExtractorConnectorConfig } from "./config/dataExtractorConnectorConfig";
import type { DataProcessingComponentConfig } from "./config/dataProcessingComponentConfig";
import type { DltConfig } from "./config/dltConfig";
import type { EntityStorageComponentConfig } from "./config/entityStorageComponentConfig";
import type { EntityStorageConnectorConfig } from "./config/entityStorageConnectorConfig";
import type { EventBusComponentConfig } from "./config/eventBusComponentConfig";
import type { EventBusConnectorConfig } from "./config/eventBusConnectorConfig";
import type { FaucetConnectorConfig } from "./config/faucetConnectorConfig";
import type { IdentityComponentConfig } from "./config/identityComponentConfig";
import type { IdentityConnectorConfig } from "./config/identityConnectorConfig";
import type { IdentityProfileComponentConfig } from "./config/identityProfileComponentConfig";
import type { IdentityProfileConnectorConfig } from "./config/identityProfileConnectorConfig";
import type { IdentityResolverComponentConfig } from "./config/identityResolverComponentConfig";
import type { IdentityResolverConnectorConfig } from "./config/identityResolverConnectorConfig";
import type { ImmutableProofComponentConfig } from "./config/immutableProofComponentConfig";
import type { ImmutableStorageConnectorConfig } from "./config/immutableStorageConnectorConfig";
import type { LoggingComponentConfig } from "./config/loggingComponentConfig";
import type { LoggingConnectorConfig } from "./config/loggingConnectorConfig";
import type { MessagingComponentConfig } from "./config/messagingComponentConfig";
import type { MessagingEmailConnectorConfig } from "./config/messagingEmailConnectorConfig";
import type { MessagingPushNotificationConnectorConfig } from "./config/messagingPushNotificationConnectorConfig";
import type { MessagingSmsConnectorConfig } from "./config/messagingSmsConnectorConfig";
import type { NftComponentConfig } from "./config/nftComponentConfig";
import type { NftConnectorConfig } from "./config/nftConnectorConfig";
import type { TelemetryComponentConfig } from "./config/telemetryComponentConfig";
import type { TelemetryConnectorConfig } from "./config/telemetryConnectorConfig";
import type { VaultConnectorConfig } from "./config/vaultConnectorConfig";
import type { WalletConnectorConfig } from "./config/walletConnectorConfig";

/**
 * Extended engine core config with known types.
 */
export interface IEngineConfig extends IEngineCoreConfig {
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
		 * Messaging email connector options which can be overridden by individual components by specifying types other than default.
		 */
		messagingEmailConnector?: IEngineCoreTypeConfig<MessagingEmailConnectorConfig>[];

		/**
		 * Messaging SMS connector options which can be overridden by individual components by specifying types other than default.
		 */
		messagingSmsConnector?: IEngineCoreTypeConfig<MessagingSmsConnectorConfig>[];

		/**
		 * Messaging push notification connector options which can be overridden by individual components by specifying types other than default.
		 */
		messagingPushNotificationConnector?: IEngineCoreTypeConfig<MessagingPushNotificationConnectorConfig>[];

		/**
		 * Messaging component options which can be overridden by individual components by specifying types other than default.
		 */
		messagingComponent?: IEngineCoreTypeConfig<MessagingComponentConfig>[];

		/**
		 * Background task connector options which can be overridden by individual components by specifying types other than default.
		 */
		backgroundTaskConnector?: IEngineCoreTypeConfig<BackgroundTaskConnectorConfig>[];

		/**
		 * Event bus connector options which can be overridden by individual components by specifying types other than default.
		 */
		eventBusConnector?: IEngineCoreTypeConfig<EventBusConnectorConfig>[];

		/**
		 * Event bus component options which can be overridden by individual components by specifying types other than default.
		 */
		eventBusComponent?: IEngineCoreTypeConfig<EventBusComponentConfig>[];

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
		 * Identity component options which can be overridden by individual components by specifying types other than default.
		 */
		identityComponent?: IEngineCoreTypeConfig<IdentityComponentConfig>[];

		/**
		 * Identity resolver connector options which can be overridden by individual components by specifying types other than default.
		 */
		identityResolverConnector?: IEngineCoreTypeConfig<IdentityResolverConnectorConfig>[];

		/**
		 * Identity resolver component options which can be overridden by individual components by specifying types other than default.
		 */
		identityResolverComponent?: IEngineCoreTypeConfig<IdentityResolverComponentConfig>[];

		/**
		 * Identity profile connector options which can be overridden by individual components by specifying types other than default.
		 */
		identityProfileConnector?: IEngineCoreTypeConfig<IdentityProfileConnectorConfig>[];

		/**
		 * Identity profile component options which can be overridden by individual components by specifying types other than default.
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
		 * Attestation component options which can be overridden by individual components by specifying types other than default.
		 */
		attestationComponent?: IEngineCoreTypeConfig<AttestationComponentConfig>[];

		/**
		 * Auditable item graph component options which can be overridden by individual components by specifying types other than default.
		 */
		auditableItemGraphComponent?: IEngineCoreTypeConfig<AuditableItemGraphComponentConfig>[];

		/**
		 * Auditable item stream component  options which can be overridden by individual components by specifying types other than default.
		 */
		auditableItemStreamComponent?: IEngineCoreTypeConfig<AuditableItemStreamComponentConfig>[];

		/**
		 * Data converter connector options which can be overridden by individual components by specifying types other than default.
		 */
		dataConverterConnector?: IEngineCoreTypeConfig<DataConverterConnectorConfig>[];

		/**
		 * Data extractor connector options which can be overridden by individual components by specifying types other than default.
		 */
		dataExtractorConnector?: IEngineCoreTypeConfig<DataExtractorConnectorConfig>[];

		/**
		 * Date processing options which can be overridden by individual components by specifying types other than default.
		 */
		dataProcessingComponent?: IEngineCoreTypeConfig<DataProcessingComponentConfig>[];
	};
}
