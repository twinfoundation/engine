// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseError, ErrorHelper, GeneralError, I18n, Is, type IError } from "@twin.org/core";
import type {
	EngineTypeInitialiser,
	IEngineCore,
	IEngineCoreConfig,
	IEngineCoreContext,
	IEngineCoreTypeBaseConfig,
	IEngineCoreTypeConfig,
	IEngineState,
	IEngineStateStorage
} from "@twin.org/engine-models";
import { ConsoleLoggingConnector } from "@twin.org/logging-connector-console";
import { LoggingConnectorFactory, type ILoggingConnector } from "@twin.org/logging-models";
import { nameof } from "@twin.org/nameof";
import {
	initialiseAttestationComponent,
	initialiseAttestationConnector
} from "./components/attestation";
import { initialiseAuditableItemGraphComponent } from "./components/auditableItemGraph";
import { initialiseAuditableItemStreamComponent } from "./components/auditableItemStream";
import { initialiseBackgroundTaskConnector } from "./components/backgroundTask";
import {
	initialiseBlobStorageComponent,
	initialiseBlobStorageConnector
} from "./components/blobStorage";
import { initialiseEntityStorageComponent } from "./components/entityStorage";
import { initialiseFaucetConnector } from "./components/faucet";
import { initialiseIdentityComponent, initialiseIdentityConnector } from "./components/identity";
import {
	initialiseIdentityProfileComponent,
	initialiseIdentityProfileConnector
} from "./components/identityProfile";
import { initialiseImmutableProofComponent } from "./components/immutableProof";
import { initialiseImmutableStorageConnector } from "./components/immutableStorage";
import { initialiseLoggingComponent, initialiseLoggingConnector } from "./components/logging";
import { initialiseNftComponent, initialiseNftConnector } from "./components/nft";
import { initialiseTelemetryComponent, initialiseTelemetryConnector } from "./components/telemetry";
import { initialiseVaultConnector } from "./components/vault";
import { initialiseWalletConnector, initialiseWalletStorage } from "./components/wallet";
import type { IEngineCoreOptions } from "./models/IEngineCoreOptions";

/**
 * Core for the engine.
 */
export class EngineCore<S extends IEngineState = IEngineState> implements IEngineCore<S> {
	/**
	 * Name for the engine logger.
	 */
	public static readonly LOGGER_TYPE_NAME: string = "engine";

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<EngineCore>();

	/**
	 * The core context.
	 * @internal
	 */
	private readonly _context: IEngineCoreContext<S>;

	/**
	 * The state storage interface.
	 * @internal
	 */
	private readonly _stateStorage?: IEngineStateStorage;

	/**
	 * The logging connector for the engine.
	 * @internal
	 */
	private _engineLoggingConnector?: ILoggingConnector;

	/**
	 * Skip the bootstrap process.
	 * @internal
	 */
	private readonly _skipBootstrap?: boolean;

	/**
	 * The type initialisers.
	 * @internal
	 */
	private readonly _typeInitialisers: {
		type: string;
		typeConfig: IEngineCoreTypeConfig[];
		initialiser: EngineTypeInitialiser<IEngineCoreTypeBaseConfig>;
	}[];

	/**
	 * Method for bootstrapping any data for the engine.
	 * @internal
	 */
	private readonly _customBootstrap?: (
		engineCore: IEngineCore,
		context: IEngineCoreContext
	) => Promise<void>;

	/**
	 * Create a new instance of EngineCore.
	 * @param options The options for the engine.
	 */
	constructor(options?: IEngineCoreOptions) {
		options = options ?? {};
		options.config = options.config ?? {};
		options.config.debug = options.config.debug ?? false;
		options.config.silent = options.config.silent ?? false;

		this._skipBootstrap = options.skipBootstrap ?? false;
		this._customBootstrap = options.customBootstrap;
		this._typeInitialisers = [];

		this._context = {
			config: options.config,
			defaultTypes: {},
			componentInstances: [],
			state: { bootstrappedComponents: [] } as unknown as S,
			stateDirty: false
		};
		this._stateStorage = options.stateStorage;

		this.addCoreTypeInitialisers();
	}

	/**
	 * Add a type initialiser.
	 * @param type The type to add the initialiser for.
	 * @param typeConfig The type config.
	 * @param initialiser The initialiser to add.
	 */
	public addTypeInitialiser<V extends IEngineCoreTypeBaseConfig>(
		type: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		initialiser: EngineTypeInitialiser<V>
	): void {
		if (!Is.empty(typeConfig)) {
			this._typeInitialisers.push({
				type,
				typeConfig,
				initialiser: initialiser as EngineTypeInitialiser<IEngineCoreTypeBaseConfig>
			});
		}
	}

	/**
	 * Start the engine core.
	 * @returns Nothing.
	 */
	public async start(): Promise<void> {
		this.setupEngineLogger();
		this.logInfo(I18n.formatMessage("engineCore.starting"));

		if (this._context.config.debug) {
			this.logInfo(I18n.formatMessage("engineCore.debuggingEnabled"));
		}

		if (await this.stateLoad()) {
			for (const { type, typeConfig, initialiser } of this._typeInitialisers) {
				this.initialiseTypeConfig(type, typeConfig, initialiser);
			}

			const canContinue = await this.bootstrap();
			if (canContinue) {
				this.logInfo(I18n.formatMessage("engineCore.componentsStarting"));

				for (const instance of this._context.componentInstances) {
					if (Is.function(instance.component.start)) {
						this.logInfo(
							I18n.formatMessage("engineCore.componentStarting", { element: instance.instanceType })
						);
						await instance.component.start(
							this._context.state.nodeIdentity,
							EngineCore.LOGGER_TYPE_NAME
						);
					}
				}

				this.logInfo(I18n.formatMessage("engineCore.componentsComplete"));
			}
		}
		this.logInfo(I18n.formatMessage("engineCore.started"));
	}

	/**
	 * Stop the engine core.
	 * @returns Nothing.
	 */
	public async stop(): Promise<void> {
		this.logInfo(I18n.formatMessage("engineCore.stopping"));
		this.logInfo(I18n.formatMessage("engineCore.componentsStopping"));

		for (const instance of this._context.componentInstances) {
			if (Is.function(instance.component.stop)) {
				this.logInfo(
					I18n.formatMessage("engineCore.componentStopping", { element: instance.instanceType })
				);

				try {
					await instance.component.stop(
						this._context.state.nodeIdentity,
						EngineCore.LOGGER_TYPE_NAME
					);
				} catch (err) {
					this.logError(
						new GeneralError(
							this.CLASS_NAME,
							"componentStopFailed",
							{
								component: instance.instanceType
							},
							BaseError.fromError(err)
						)
					);
				}
			}
		}
		this.logInfo(I18n.formatMessage("engineCore.componentsStopped"));
		this.logInfo(I18n.formatMessage("engineCore.stopped"));
	}

	/**
	 * Log info.
	 * @param message The message to log.
	 */
	public logInfo(message: string): void {
		this._engineLoggingConnector?.log({
			source: this.CLASS_NAME,
			level: "info",
			message
		});
	}

	/**
	 * Log error.
	 * @param error The error to log.
	 */
	public logError(error: IError): void {
		const formattedErrors = ErrorHelper.localizeErrors(error);
		for (const formattedError of formattedErrors) {
			let message = Is.stringValue(formattedError.source)
				? `${formattedError.source}: ${formattedError.message}`
				: formattedError.message;
			if (this._context.config.debug && Is.stringValue(formattedError.stack)) {
				message += `\n${formattedError.stack}`;
			}
			this._engineLoggingConnector?.log({
				source: this.CLASS_NAME,
				level: "error",
				message
			});
		}
	}

	/**
	 * Get the config for the engine.
	 * @returns The config for the engine.
	 */
	public getConfig(): IEngineCoreConfig {
		return this._context.config;
	}

	/**
	 * Get the state of the engine.
	 * @returns The state of the engine.
	 */
	public getState(): S {
		return this._context.state;
	}

	/**
	 * Get the types for the component.
	 * @returns The default types.
	 */
	public getDefaultTypes(): { [type: string]: string } {
		return this._context.defaultTypes;
	}

	/**
	 * Initialise the types from connector.
	 * @param typeKey The key for the default types.
	 * @param instanceMethod The function to initialise the instance.
	 * @internal
	 */
	private initialiseTypeConfig<Y extends IEngineCoreTypeBaseConfig>(
		typeKey: string,
		typeConfig: IEngineCoreTypeConfig<Y>[],
		instanceMethod: (
			engineCore: IEngineCore,
			context: IEngineCoreContext,
			instanceConfig: Y,
			overrideInstanceType?: string
		) => string | undefined
	): void {
		if (Is.arrayValue(typeConfig)) {
			for (let i = 0; i < typeConfig.length; i++) {
				const instanceType = instanceMethod(
					this,
					this._context,
					typeConfig[i],
					typeConfig[i].overrideInstanceType
				);
				if (
					Is.stringValue(instanceType) &&
					(Is.empty(this._context.defaultTypes[typeKey]) || typeConfig[i].isDefault)
				) {
					this._context.defaultTypes[typeKey] = instanceType;
				}
			}
		}
	}

	/**
	 * Setup the engine logger.
	 * @internal
	 */
	private setupEngineLogger(): void {
		if (!this._context.config.silent) {
			const engineLogger = new ConsoleLoggingConnector({
				config: {
					translateMessages: true,
					hideGroups: true
				}
			});

			this._context.componentInstances.push({
				instanceType: EngineCore.LOGGER_TYPE_NAME,
				component: engineLogger
			});

			LoggingConnectorFactory.register(EngineCore.LOGGER_TYPE_NAME, () => engineLogger);

			this._engineLoggingConnector = engineLogger;
			this._context.defaultTypes.loggingConnector = EngineCore.LOGGER_TYPE_NAME;
		}
	}

	/**
	 * Load the state.
	 * @returns True if the state was loaded and can continue.
	 * @internal
	 */
	private async stateLoad(): Promise<boolean> {
		if (this._stateStorage) {
			try {
				this._context.state = ((await this._stateStorage.load(this)) ?? {
					bootstrappedComponents: []
				}) as unknown as S;
				this._context.state.bootstrappedComponents ??= [];
				this._context.stateDirty = false;

				return true;
			} catch (err) {
				this.logError(BaseError.fromError(err));
				return false;
			}
		}
		return true;
	}

	/**
	 * Save the state.
	 * @internal
	 */
	private async stateSave(): Promise<void> {
		if (this._stateStorage && !Is.empty(this._context.state) && this._context.stateDirty) {
			try {
				await this._stateStorage.save(this, this._context.state);
				this._context.stateDirty = false;
			} catch (err) {
				this.logError(BaseError.fromError(err));
			}
		}
	}

	/**
	 * Bootstrap the engine.
	 * @returns True if the engine can continue.
	 * @internal
	 */
	private async bootstrap(): Promise<boolean> {
		let canContinue = true;

		if (!this._skipBootstrap) {
			this.logInfo(I18n.formatMessage("engineCore.bootstrapStarted"));

			try {
				// First bootstrap the components.
				for (const instance of this._context.componentInstances) {
					if (Is.function(instance.component.bootstrap)) {
						const bootstrapName = `component-${instance.component.CLASS_NAME}-${instance.instanceType}`;

						if (!this._context.state.bootstrappedComponents.includes(bootstrapName)) {
							this.logInfo(
								I18n.formatMessage("engineCore.bootstrapping", {
									element: bootstrapName
								})
							);

							const bootstrapSuccess = await instance.component.bootstrap(
								EngineCore.LOGGER_TYPE_NAME
							);

							// If the bootstrap method failed then throw an error
							if (!bootstrapSuccess) {
								throw new GeneralError(this.CLASS_NAME, "bootstrapFailed", {
									component: `${instance.component.CLASS_NAME}:${instance.instanceType}`
								});
							}

							// Otherwise add the component to the bootstrapped list and set the state as dirty
							this._context.state.bootstrappedComponents.push(bootstrapName);
							this._context.stateDirty = true;
						}
					}
				}
				// Now perform any custom bootstrap operations
				if (canContinue && Is.function(this._customBootstrap)) {
					await this._customBootstrap(this, this._context);
				}
			} catch (err) {
				canContinue = false;
				this.logError(BaseError.fromError(err));
			} finally {
				await this.stateSave();
				if (canContinue) {
					this.logInfo(I18n.formatMessage("engineCore.bootstrapComplete"));
				}
			}
		}

		return canContinue;
	}

	/**
	 * Add the core type initializers.
	 * @internal
	 */
	private addCoreTypeInitialisers(): void {
		this.addTypeInitialiser(
			"loggingConnector",
			this._context.config.loggingConnector,
			initialiseLoggingConnector
		);
		this.addTypeInitialiser(
			"loggingComponent",
			this._context.config.loggingComponent,
			initialiseLoggingComponent
		);

		this.addTypeInitialiser(
			"backgroundTaskConnector",
			this._context.config.backgroundTaskConnector,
			initialiseBackgroundTaskConnector
		);

		this.addTypeInitialiser(
			"telemetryConnector",
			this._context.config.telemetryConnector,
			initialiseTelemetryConnector
		);
		this.addTypeInitialiser(
			"telemetryComponent",
			this._context.config.telemetryComponent,
			initialiseTelemetryComponent
		);

		this.addTypeInitialiser(
			"entityStorageComponent",
			this._context.config.entityStorageComponent,
			initialiseEntityStorageComponent
		);

		this.addTypeInitialiser(
			"vaultConnector",
			this._context.config.vaultConnector,
			initialiseVaultConnector
		);

		this.addTypeInitialiser(
			"blobStorageConnector",
			this._context.config.blobStorageConnector,
			initialiseBlobStorageConnector
		);
		this.addTypeInitialiser(
			"blobStorageComponent",
			this._context.config.blobStorageComponent,
			initialiseBlobStorageComponent
		);

		this.addTypeInitialiser(
			"immutableStorageConnector",
			this._context.config.immutableStorageConnector,
			initialiseImmutableStorageConnector
		);

		this.addTypeInitialiser(
			"walletConnector",
			this._context.config.walletConnector,
			initialiseWalletStorage
		);
		this.addTypeInitialiser(
			"faucetConnector",
			this._context.config.faucetConnector,
			initialiseFaucetConnector
		);
		this.addTypeInitialiser(
			"walletConnector",
			this._context.config.walletConnector,
			initialiseWalletConnector
		);

		this.addTypeInitialiser(
			"identityConnector",
			this._context.config.identityConnector,
			initialiseIdentityConnector
		);
		this.addTypeInitialiser(
			"identityComponent",
			this._context.config.identityComponent,
			initialiseIdentityComponent
		);

		this.addTypeInitialiser(
			"identityProfileConnector",
			this._context.config.identityProfileConnector,
			initialiseIdentityProfileConnector
		);
		this.addTypeInitialiser(
			"identityProfileComponent",
			this._context.config.identityProfileComponent,
			initialiseIdentityProfileComponent
		);

		this.addTypeInitialiser(
			"nftConnector",
			this._context.config.nftConnector,
			initialiseNftConnector
		);
		this.addTypeInitialiser(
			"nftComponent",
			this._context.config.nftComponent,
			initialiseNftComponent
		);

		this.addTypeInitialiser(
			"immutableProofComponent",
			this._context.config.immutableProofComponent,
			initialiseImmutableProofComponent
		);

		this.addTypeInitialiser(
			"attestationConnector",
			this._context.config.attestationConnector,
			initialiseAttestationConnector
		);
		this.addTypeInitialiser(
			"attestationComponent",
			this._context.config.attestationComponent,
			initialiseAttestationComponent
		);

		this.addTypeInitialiser(
			"auditableItemGraphComponent",
			this._context.config.auditableItemGraphComponent,
			initialiseAuditableItemGraphComponent
		);
		this.addTypeInitialiser(
			"auditableItemStreamComponent",
			this._context.config.auditableItemStreamComponent,
			initialiseAuditableItemStreamComponent
		);
	}
}
