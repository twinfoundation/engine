// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineCore } from "./IEngineCore";
import type { IEngineState } from "./IEngineState";

/**
 * Definition of state storage for engine.
 */
export interface IEngineStateStorage<S extends IEngineState = IEngineState> {
	/**
	 * Method for loading the state.
	 * @param engineCore The engine core to load the state for.
	 * @returns The state of the engine or undefined if it doesn't exist.
	 */
	load(engineCore: IEngineCore): Promise<S | undefined>;

	/**
	 * Method for saving the state.
	 * @param engineCore The engine core to save the state for.
	 * @param state The state of the engine to save.
	 * @returns Nothing.
	 */
	save(engineCore: IEngineCore, state: S): Promise<void>;
}
