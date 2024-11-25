// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { EngineCore, type IEngineCoreOptions } from "@twin.org/engine-core";
import type { IEngineCore, IEngineCoreContext, IEngineState } from "@twin.org/engine-models";
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

		this.addCoreTypeInitialisers(this, this._context);
	}

	/**
	 * Add the core type initializers.
	 * @internal
	 */
	private addCoreTypeInitialisers(
		engineCore: IEngineCore<C, S>,
		context: IEngineCoreContext<C, S>
	): void {
		this.addTypeInitialiser(
			"loggingConnector",
			context.config.types.loggingConnector,
			"@twin.org/engine-types",
			"initialiseLoggingConnector"
		);
		this.addTypeInitialiser(
			"loggingComponent",
			context.config.types.loggingComponent,
			"@twin.org/engine-types",
			"initialiseLoggingComponent"
		);

		this.addTypeInitialiser(
			"backgroundTaskConnector",
			context.config.types.backgroundTaskConnector,
			"@twin.org/engine-types",
			"initialiseBackgroundTaskConnector"
		);

		this.addTypeInitialiser(
			"telemetryConnector",
			context.config.types.telemetryConnector,
			"@twin.org/engine-types",
			"initialiseTelemetryConnector"
		);
		this.addTypeInitialiser(
			"telemetryComponent",
			context.config.types.telemetryComponent,
			"@twin.org/engine-types",
			"initialiseTelemetryComponent"
		);

		this.addTypeInitialiser(
			"entityStorageComponent",
			context.config.types.entityStorageComponent,
			"@twin.org/engine-types",
			"initialiseEntityStorageComponent"
		);

		this.addTypeInitialiser(
			"vaultConnector",
			context.config.types.vaultConnector,
			"@twin.org/engine-types",
			"initialiseVaultConnector"
		);

		this.addTypeInitialiser(
			"blobStorageConnector",
			context.config.types.blobStorageConnector,
			"@twin.org/engine-types",
			"initialiseBlobStorageConnector"
		);
		this.addTypeInitialiser(
			"blobStorageComponent",
			context.config.types.blobStorageComponent,
			"@twin.org/engine-types",
			"initialiseBlobStorageComponent"
		);

		this.addTypeInitialiser(
			"immutableStorageConnector",
			context.config.types.immutableStorageConnector,
			"@twin.org/engine-types",
			"initialiseImmutableStorageConnector"
		);

		this.addTypeInitialiser(
			"walletConnector",
			context.config.types.walletConnector,
			"@twin.org/engine-types",
			"initialiseWalletStorage"
		);
		this.addTypeInitialiser(
			"faucetConnector",
			context.config.types.faucetConnector,
			"@twin.org/engine-types",
			"initialiseFaucetConnector"
		);
		this.addTypeInitialiser(
			"walletConnector",
			context.config.types.walletConnector,
			"@twin.org/engine-types",
			"initialiseWalletConnector"
		);

		this.addTypeInitialiser(
			"identityConnector",
			context.config.types.identityConnector,
			"@twin.org/engine-types",
			"initialiseIdentityConnector"
		);
		this.addTypeInitialiser(
			"identityComponent",
			context.config.types.identityComponent,
			"@twin.org/engine-types",
			"initialiseIdentityComponent"
		);

		this.addTypeInitialiser(
			"identityProfileConnector",
			context.config.types.identityProfileConnector,
			"@twin.org/engine-types",
			"initialiseIdentityProfileConnector"
		);
		this.addTypeInitialiser(
			"identityProfileComponent",
			context.config.types.identityProfileComponent,
			"@twin.org/engine-types",
			"initialiseIdentityProfileComponent"
		);

		this.addTypeInitialiser(
			"nftConnector",
			context.config.types.nftConnector,
			"@twin.org/engine-types",
			"initialiseNftConnector"
		);
		this.addTypeInitialiser(
			"nftComponent",
			context.config.types.nftComponent,
			"@twin.org/engine-types",
			"initialiseNftComponent"
		);

		this.addTypeInitialiser(
			"immutableProofComponent",
			context.config.types.immutableProofComponent,
			"@twin.org/engine-types",
			"initialiseImmutableProofComponent"
		);

		this.addTypeInitialiser(
			"attestationConnector",
			context.config.types.attestationConnector,
			"@twin.org/engine-types",
			"initialiseAttestationConnector"
		);
		this.addTypeInitialiser(
			"attestationComponent",
			context.config.types.attestationComponent,
			"@twin.org/engine-types",
			"initialiseAttestationComponent"
		);

		this.addTypeInitialiser(
			"auditableItemGraphComponent",
			context.config.types.auditableItemGraphComponent,
			"@twin.org/engine-types",
			"initialiseAuditableItemGraphComponent"
		);
		this.addTypeInitialiser(
			"auditableItemStreamComponent",
			context.config.types.auditableItemStreamComponent,
			"@twin.org/engine-types",
			"initialiseAuditableItemStreamComponent"
		);
	}
}
