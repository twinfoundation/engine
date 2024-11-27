// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	BaseError,
	ErrorHelper,
	GeneralError,
	Guards,
	I18n,
	Is,
	type IError
} from "@twin.org/core";
import type {
	EngineTypeInitialiser,
	IEngineCore,
	IEngineCoreClone,
	IEngineCoreConfig,
	IEngineCoreContext,
	IEngineCoreTypeBaseConfig,
	IEngineCoreTypeConfig,
	IEngineState,
	IEngineStateStorage
} from "@twin.org/engine-models";
import { EntitySchemaFactory, type IEntitySchema } from "@twin.org/entity";
import { ConsoleLoggingConnector } from "@twin.org/logging-connector-console";
import { LoggingConnectorFactory, type ILoggingConnector } from "@twin.org/logging-models";
import { ModuleHelper } from "@twin.org/modules";
import { nameof } from "@twin.org/nameof";
import type { IEngineCoreOptions } from "./models/IEngineCoreOptions";
import { MemoryStateStorage } from "./storage/memoryStateStorage";

/**
 * Core for the engine.
 */
export class EngineCore<
	C extends IEngineCoreConfig = IEngineCoreConfig,
	S extends IEngineState = IEngineState
> implements IEngineCore<C, S>
{
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
	 */
	protected _context: IEngineCoreContext<C, S>;

	/**
	 * The state storage interface.
	 * @internal
	 */
	private _stateStorage?: IEngineStateStorage<S>;

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
	 * The logger type name to use.
	 * @internal
	 */
	private readonly _loggerTypeName: string;

	/**
	 * The type initialisers.
	 * @internal
	 */
	private _typeInitialisers: {
		type: string;
		typeConfig: IEngineCoreTypeConfig[];
		module: string;
		method: string;
	}[];

	/**
	 * Is the engine started.
	 * @internal
	 */
	private _isStarted: boolean;

	/**
	 * Add type initialisers to the engine.
	 * @internal
	 */
	private readonly _populateTypeInitialisers?: (
		engineCore: IEngineCore<C, S>,
		context: IEngineCoreContext<C, S>
	) => void;

	/**
	 * Method for bootstrapping any data for the engine.
	 * @internal
	 */
	private readonly _customBootstrap?: (
		engineCore: IEngineCore<C, S>,
		context: IEngineCoreContext<C, S>
	) => Promise<void>;

	/**
	 * Create a new instance of EngineCore.
	 * @param options The options for the engine.
	 */
	constructor(options?: IEngineCoreOptions<C, S>) {
		options = options ?? {};
		options.config = options.config ?? ({} as C);
		options.config.debug = options.config.debug ?? false;
		options.config.silent = options.config.silent ?? false;
		options.config.types ??= {};

		this._skipBootstrap = options.skipBootstrap ?? false;
		this._populateTypeInitialisers = options.populateTypeInitialisers;
		this._customBootstrap = options.customBootstrap;
		this._loggerTypeName = options.loggerTypeName ?? EngineCore.LOGGER_TYPE_NAME;
		this._typeInitialisers = [];

		this._context = {
			config: options.config,
			defaultTypes: {},
			componentInstances: [],
			state: { bootstrappedComponents: [] } as unknown as S,
			stateDirty: false
		};
		this._stateStorage = options.stateStorage;
		this._isStarted = false;

		if (Is.function(this._populateTypeInitialisers)) {
			this._populateTypeInitialisers(this, this._context);
		}
	}

	/**
	 * Add a type initialiser.
	 * @param type The type to add the initialiser for.
	 * @param typeConfig The type config.
	 * @param module The name of the module which contains the initialiser method.
	 * @param method The name of the method to call.
	 */
	public addTypeInitialiser(
		type: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		module: string,
		method: string
	): void {
		if (!Is.empty(typeConfig)) {
			this._typeInitialisers.push({
				type,
				typeConfig,
				module,
				method
			});
		}
	}

	/**
	 * Start the engine core.
	 * @returns True if the start was successful.
	 */
	public async start(): Promise<boolean> {
		if (this._isStarted) {
			return false;
		}

		this.setupEngineLogger();
		this.logInfo(I18n.formatMessage("engineCore.starting"));

		if (this._context.config.debug) {
			this.logInfo(I18n.formatMessage("engineCore.debuggingEnabled"));
		}

		let canContinue = await this.stateLoad();
		if (canContinue) {
			for (const { type, typeConfig, module, method } of this._typeInitialisers) {
				await this.initialiseTypeConfig(type, typeConfig, module, method);
			}

			canContinue = await this.bootstrap();
			if (canContinue) {
				this.logInfo(I18n.formatMessage("engineCore.componentsStarting"));

				for (const instance of this._context.componentInstances) {
					if (Is.function(instance.component.start)) {
						this.logInfo(
							I18n.formatMessage("engineCore.componentStarting", { element: instance.instanceType })
						);
						await instance.component.start(this._context.state.nodeIdentity, this._loggerTypeName);
					}
				}

				this.logInfo(I18n.formatMessage("engineCore.componentsComplete"));
			}
		}

		if (canContinue) {
			this.logInfo(I18n.formatMessage("engineCore.started"));
			this._isStarted = true;
		}

		return canContinue;
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
					await instance.component.stop(this._context.state.nodeIdentity, this._loggerTypeName);
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
	public getConfig(): C {
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
	 * Get the data required to create a clone of the engine.
	 * @returns The clone data.
	 */
	public getCloneData(): IEngineCoreClone<C, S> {
		const entitySchemas: {
			[schema: string]: IEntitySchema;
		} = {};

		const entitySchemaNames = EntitySchemaFactory.names();
		for (const schemaName of entitySchemaNames) {
			entitySchemas[schemaName] = EntitySchemaFactory.get(schemaName);
		}

		const cloneData: IEngineCoreClone<C, S> = {
			config: this._context.config,
			state: this._context.state,
			typeInitialisers: this._typeInitialisers,
			entitySchemas
		};

		return cloneData;
	}

	/**
	 * Populate the engine from the clone data.
	 * @param cloneData The clone data to populate from.
	 */
	public populateClone(cloneData: IEngineCoreClone<C, S>): void {
		Guards.object(this.CLASS_NAME, nameof(cloneData), cloneData);
		Guards.object(this.CLASS_NAME, nameof(cloneData.config), cloneData.config);
		Guards.object(this.CLASS_NAME, nameof(cloneData.state), cloneData.state);
		Guards.array(this.CLASS_NAME, nameof(cloneData.typeInitialisers), cloneData.typeInitialisers);

		this._context = {
			config: cloneData.config,
			defaultTypes: {},
			componentInstances: [],
			state: { bootstrappedComponents: [] } as unknown as S,
			stateDirty: false
		};

		this._typeInitialisers = cloneData.typeInitialisers;

		for (const schemaName of Object.keys(cloneData.entitySchemas)) {
			EntitySchemaFactory.register(schemaName, () => cloneData.entitySchemas[schemaName]);
		}

		this._stateStorage = new MemoryStateStorage(true, cloneData.state);
		this._isStarted = false;
	}

	/**
	 * Initialise the types from connector.
	 * @param typeKey The key for the default types.
	 * @param instanceMethod The function to initialise the instance.
	 * @internal
	 */
	private async initialiseTypeConfig<Y extends IEngineCoreTypeBaseConfig>(
		typeKey: string,
		typeConfig: IEngineCoreTypeConfig<Y>[],
		module: string,
		method: string
	): Promise<void> {
		if (Is.arrayValue(typeConfig)) {
			const instanceMethod = await ModuleHelper.getModuleEntry<EngineTypeInitialiser>(
				module,
				method
			);

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
				instanceType: this._loggerTypeName,
				component: engineLogger
			});

			LoggingConnectorFactory.register(this._loggerTypeName, () => engineLogger);

			this._engineLoggingConnector = engineLogger;
			this._context.defaultTypes.loggingConnector = this._loggerTypeName;
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
	 * @returns True if the state was saved.
	 * @internal
	 */
	private async stateSave(): Promise<boolean> {
		if (this._stateStorage && !Is.empty(this._context.state) && this._context.stateDirty) {
			try {
				await this._stateStorage.save(this, this._context.state);
				this._context.stateDirty = false;
				return true;
			} catch (err) {
				this.logError(BaseError.fromError(err));
			}
			return false;
		}
		return true;
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
						const bootstrapName = `${instance.component.CLASS_NAME}-${instance.instanceType}`;

						if (!this._context.state.bootstrappedComponents.includes(bootstrapName)) {
							this.logInfo(
								I18n.formatMessage("engineCore.bootstrapping", {
									element: bootstrapName
								})
							);

							const bootstrapSuccess = await instance.component.bootstrap(this._loggerTypeName);

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
				if (await this.stateSave()) {
					this.logInfo(I18n.formatMessage("engineCore.bootstrapComplete"));
				} else {
					canContinue = false;
				}
			}
		}

		return canContinue;
	}
}
