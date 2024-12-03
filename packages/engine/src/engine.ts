// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { EngineCore, type IEngineCoreOptions } from "@twin.org/engine-core";
import type { IEngineState } from "@twin.org/engine-models";
import type { IEngineConfig } from "@twin.org/engine-types";
import { nameof } from "@twin.org/nameof";

/**
 * The engine with built in types.
 */
export class Engine<
	C extends IEngineConfig = IEngineConfig,
	S extends IEngineState = IEngineState
> extends EngineCore<C, S> {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<Engine>();

	/**
	 * Create a new instance of Engine.
	 * @param options The options for the engine.
	 */
	constructor(options?: IEngineCoreOptions<C, S>) {
		super(options);

		this.addCoreTypeInitialisers();
	}

	/**
	 * Add the core type initializers.
	 * @internal
	 */
	private addCoreTypeInitialisers(): void {
		this.addTypeInitialiser(
			"loggingConnector",
			this._context.config.types.loggingConnector,
			"@twin.org/engine-types",
			"initialiseLoggingConnector"
		);
		this.addTypeInitialiser(
			"loggingComponent",
			this._context.config.types.loggingComponent,
			"@twin.org/engine-types",
			"initialiseLoggingComponent"
		);

		this.addTypeInitialiser(
			"backgroundTaskConnector",
			this._context.config.types.backgroundTaskConnector,
			"@twin.org/engine-types",
			"initialiseBackgroundTaskConnector"
		);

		this.addTypeInitialiser(
			"eventBusConnector",
			this._context.config.types.eventBusConnector,
			"@twin.org/engine-types",
			"initialiseEventBusConnector"
		);
		this.addTypeInitialiser(
			"eventBusComponent",
			this._context.config.types.eventBusComponent,
			"@twin.org/engine-types",
			"initialiseEventBusComponent"
		);

		this.addTypeInitialiser(
			"telemetryConnector",
			this._context.config.types.telemetryConnector,
			"@twin.org/engine-types",
			"initialiseTelemetryConnector"
		);
		this.addTypeInitialiser(
			"telemetryComponent",
			this._context.config.types.telemetryComponent,
			"@twin.org/engine-types",
			"initialiseTelemetryComponent"
		);

		this.addTypeInitialiser(
			"entityStorageComponent",
			this._context.config.types.entityStorageComponent,
			"@twin.org/engine-types",
			"initialiseEntityStorageComponent"
		);

		this.addTypeInitialiser(
			"vaultConnector",
			this._context.config.types.vaultConnector,
			"@twin.org/engine-types",
			"initialiseVaultConnector"
		);

		this.addTypeInitialiser(
			"blobStorageConnector",
			this._context.config.types.blobStorageConnector,
			"@twin.org/engine-types",
			"initialiseBlobStorageConnector"
		);
		this.addTypeInitialiser(
			"blobStorageComponent",
			this._context.config.types.blobStorageComponent,
			"@twin.org/engine-types",
			"initialiseBlobStorageComponent"
		);

		this.addTypeInitialiser(
			"immutableStorageConnector",
			this._context.config.types.immutableStorageConnector,
			"@twin.org/engine-types",
			"initialiseImmutableStorageConnector"
		);

		this.addTypeInitialiser(
			"walletConnector",
			this._context.config.types.walletConnector,
			"@twin.org/engine-types",
			"initialiseWalletStorage"
		);
		this.addTypeInitialiser(
			"faucetConnector",
			this._context.config.types.faucetConnector,
			"@twin.org/engine-types",
			"initialiseFaucetConnector"
		);
		this.addTypeInitialiser(
			"walletConnector",
			this._context.config.types.walletConnector,
			"@twin.org/engine-types",
			"initialiseWalletConnector"
		);

		this.addTypeInitialiser(
			"identityConnector",
			this._context.config.types.identityConnector,
			"@twin.org/engine-types",
			"initialiseIdentityConnector"
		);
		this.addTypeInitialiser(
			"identityComponent",
			this._context.config.types.identityComponent,
			"@twin.org/engine-types",
			"initialiseIdentityComponent"
		);

		this.addTypeInitialiser(
			"identityProfileConnector",
			this._context.config.types.identityProfileConnector,
			"@twin.org/engine-types",
			"initialiseIdentityProfileConnector"
		);
		this.addTypeInitialiser(
			"identityProfileComponent",
			this._context.config.types.identityProfileComponent,
			"@twin.org/engine-types",
			"initialiseIdentityProfileComponent"
		);

		this.addTypeInitialiser(
			"nftConnector",
			this._context.config.types.nftConnector,
			"@twin.org/engine-types",
			"initialiseNftConnector"
		);
		this.addTypeInitialiser(
			"nftComponent",
			this._context.config.types.nftComponent,
			"@twin.org/engine-types",
			"initialiseNftComponent"
		);

		this.addTypeInitialiser(
			"immutableProofComponent",
			this._context.config.types.immutableProofComponent,
			"@twin.org/engine-types",
			"initialiseImmutableProofComponent"
		);

		this.addTypeInitialiser(
			"attestationConnector",
			this._context.config.types.attestationConnector,
			"@twin.org/engine-types",
			"initialiseAttestationConnector"
		);
		this.addTypeInitialiser(
			"attestationComponent",
			this._context.config.types.attestationComponent,
			"@twin.org/engine-types",
			"initialiseAttestationComponent"
		);

		this.addTypeInitialiser(
			"auditableItemGraphComponent",
			this._context.config.types.auditableItemGraphComponent,
			"@twin.org/engine-types",
			"initialiseAuditableItemGraphComponent"
		);
		this.addTypeInitialiser(
			"auditableItemStreamComponent",
			this._context.config.types.auditableItemStreamComponent,
			"@twin.org/engine-types",
			"initialiseAuditableItemStreamComponent"
		);
	}
}
