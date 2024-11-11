// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineServerConfig } from "./IEngineServerConfig";

/**
 * Interface describing the engine server methods.
 */
export interface IEngineServer {
	/**
	 * Start the engine.
	 * @param config The configuration for the engine.
	 * @returns Nothing.
	 */
	start(config: IEngineServerConfig): Promise<void>;

	/**
	 * Stop the engine.
	 * @returns Nothing.
	 */
	stop(): Promise<void>;
}
