// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@twin.org/core";
import type { IEngineCoreConfig } from "./config/IEngineCoreConfig";
import type { IEngineCoreTypeBaseConfig } from "./config/IEngineCoreTypeBaseConfig";
import type { IEngineCoreTypeConfig } from "./config/IEngineCoreTypeConfig";
import type { EngineTypeInitialiser } from "./engineTypeInitialiser";
import type { IEngineCoreClone } from "./IEngineCoreClone";
import type { IEngineState } from "./IEngineState";

/**
 * Interface describing the engine core methods.
 */
export interface IEngineCore<S extends IEngineState = IEngineState> {
	/**
	 * Add a type initialiser.
	 * @param type The type to add the initialiser for.
	 * @param typeConfig The type config.
	 * @param initialiser The initialiser to add.
	 */
	addTypeInitialiser<T extends IEngineCoreTypeBaseConfig>(
		type: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		initialiser: EngineTypeInitialiser<T>
	): void;

	/**
	 * Start the engine core.
	 * @returns True if the start was successful.
	 */
	start(): Promise<boolean>;

	/**
	 * Stop the engine core.
	 * @returns Nothing.
	 */
	stop(): Promise<void>;

	/**
	 * Log info.
	 * @param message The message to log.
	 */
	logInfo(message: string): void;

	/**
	 * Log error.
	 * @param error The error to log.
	 */
	logError(error: IError): void;

	/**
	 * Get the config for the engine.
	 * @returns The config for the engine.
	 */
	getConfig(): IEngineCoreConfig;

	/**
	 * Get the state of the engine.
	 * @returns The state of the engine.
	 */
	getState(): S;

	/**
	 * Get the types for the component.
	 * @returns The default types.
	 */
	getDefaultTypes(): { [type: string]: string };

	/**
	 * Get the data required to create a clone of the engine.
	 * @returns The clone data.
	 */
	getCloneData(): IEngineCoreClone;

	/**
	 * Populate the engine from the clone data.
	 * @param cloneData The clone data to populate from.
	 */
	populateClone(cloneData: IEngineCoreClone): void;
}
