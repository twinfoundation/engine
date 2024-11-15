// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IEngineCore,
	IEngineCoreConfig,
	IEngineCoreContext,
	IEngineStateStorage
} from "@twin.org/engine-models";

/**
 * The options for creating engine core.
 */
export interface IEngineCoreOptions {
	/**
	 * The engine core config.
	 */
	config?: IEngineCoreConfig;

	/**
	 * The state storage component.
	 */
	stateStorage?: IEngineStateStorage;

	/**
	 * Skip the bootstrap process, useful for additional engine instances.
	 */
	skipBootstrap?: boolean;

	/**
	 * Custom bootstrap method for the engine.
	 */
	customBootstrap?: (engineCore: IEngineCore, context: IEngineCoreContext) => Promise<void>;
}
