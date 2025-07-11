// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IEngineCore,
	IEngineCoreConfig,
	IEngineCoreContext,
	IEngineState,
	IEngineStateStorage
} from "@twin.org/engine-models";

/**
 * The options for creating engine core.
 */
export interface IEngineCoreOptions<
	C extends IEngineCoreConfig = IEngineCoreConfig,
	S extends IEngineState = IEngineState
> {
	/**
	 * The engine core config.
	 */
	config?: C;

	/**
	 * The state storage component.
	 */
	stateStorage?: IEngineStateStorage<S>;

	/**
	 * Skip the bootstrap process, useful for additional engine instances.
	 */
	skipBootstrap?: boolean;

	/**
	 * Populate the type initialisers for the engine.
	 */
	populateTypeInitialisers?: (
		engineCore: IEngineCore<C, S>,
		context: IEngineCoreContext<C, S>
	) => void;

	/**
	 * Custom bootstrap method for the engine.
	 */
	customBootstrap?: (
		engineCore: IEngineCore<C, S>,
		context: IEngineCoreContext<C, S>
	) => Promise<void>;

	/**
	 * The name of the logger to use in the engine.
	 * @default engine
	 */
	loggerTypeName?: string;
}
