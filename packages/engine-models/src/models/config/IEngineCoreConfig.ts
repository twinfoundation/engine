// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineCoreTypeConfig } from "./IEngineCoreTypeConfig";

/**
 * Configuration for the engine core.
 */
export interface IEngineCoreConfig {
	/**
	 * Start the engine in debug mode.
	 * @default false
	 */
	debug?: boolean;

	/**
	 * Disable output to the console.
	 * @default false
	 */
	silent?: boolean;

	/**
	 * The types to initialise in the engine.
	 */
	types: {
		[type: string]: IEngineCoreTypeConfig[] | undefined;
	};
}
