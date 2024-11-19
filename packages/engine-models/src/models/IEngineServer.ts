// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineCoreTypeConfig } from "./config/IEngineCoreTypeConfig";
import type { RestRouteGenerator } from "./restRouteGenerator";
import type { SocketRouteGenerator } from "./socketRouteGenerator";

/**
 * Interface describing the engine server methods.
 */
export interface IEngineServer {
	/**
	 * Add a REST route generator.
	 * @param type The type to add the generator for.
	 * @param typeConfig The type config.
	 * @param generator The generator to add.
	 */
	addRestRouteGenerator(
		type: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		generator: RestRouteGenerator
	): void;

	/**
	 * Add a socket route generator.
	 * @param type The type to add the generator for.
	 * @param typeConfig The type config.
	 * @param generator The generator to add.
	 */
	addSocketRouteGenerator(
		type: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		generator: SocketRouteGenerator
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
