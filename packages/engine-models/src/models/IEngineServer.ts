// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineCoreTypeConfig } from "./config/IEngineCoreTypeConfig";

/**
 * Interface describing the engine server methods.
 */
export interface IEngineServer {
	/**
	 * Add a REST route generator.
	 * @param type The type to add the generator for.
	 * @param typeConfig The type config.
	 * @param module The module containing the generator.
	 * @param method The method to call on the module.
	 */
	addRestRouteGenerator(
		type: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		module: string,
		method: string
	): void;

	/**
	 * Add a socket route generator.
	 * @param type The type to add the generator for.
	 * @param typeConfig The type config.
	 * @param module The module containing the generator.
	 * @param method The method to call on the module.
	 */
	addSocketRouteGenerator(
		type: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		module: string,
		method: string
	): void;

	/**
	 * Start the engine server.
	 * @returns True if the start was successful.
	 */
	start(): Promise<boolean>;

	/**
	 * Stop the engine server.
	 * @returns Nothing.
	 */
	stop(): Promise<void>;
}
