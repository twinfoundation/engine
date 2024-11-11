// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineServer, IEngineServerConfig } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";

/**
 * Server for the engine.
 */
export class EngineServer implements IEngineServer {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<EngineServer>();

	/**
	 * Create a new instance of EngineServer.
	 */
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor() {}

	/**
	 * Start the engine.
	 * @param config The configuration for the engine.
	 * @returns Nothing.
	 */
	public async start(config: IEngineServerConfig): Promise<void> {}

	/**
	 * Stop the engine.
	 * @returns Nothing.
	 */
	public async stop(): Promise<void> {}
}
