// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineCoreConfig } from "./config/IEngineCoreConfig";
import type { IEngineState } from "./IEngineState";

/**
 * Interface describing the data required to clone an engine.
 */
export interface IEngineCoreClone<S extends IEngineState = IEngineState> {
	/**
	 * The config for the engine.
	 */
	config: IEngineCoreConfig;

	/**
	 * The state of the engine.
	 */
	state: S;
}
