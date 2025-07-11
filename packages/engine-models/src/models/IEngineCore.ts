// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@twin.org/core";
import type { IEngineCoreConfig } from "./config/IEngineCoreConfig";
import type { IEngineCoreTypeConfig } from "./config/IEngineCoreTypeConfig";
import type { IEngineCoreClone } from "./IEngineCoreClone";
import type { IEngineState } from "./IEngineState";

/**
 * Interface describing the engine core methods.
 */
export interface IEngineCore<
	C extends IEngineCoreConfig = IEngineCoreConfig,
	S extends IEngineState = IEngineState
> {
	/**
	 * Add a type initialiser.
	 * @param type The type to add the initialiser for.
	 * @param typeConfig The type config.
	 * @param module The name of the module which contains the initialiser method.
	 * @param method The name of the method to call.
	 */
	addTypeInitialiser(
		type: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		module: string,
		method: string
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
	getConfig(): C;

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
	getCloneData(): IEngineCoreClone<C, S>;

	/**
	 * Populate the engine from the clone data.
	 * @param cloneData The clone data to populate from.
	 * @param silent Should the clone be silent.
	 */
	populateClone(cloneData: IEngineCoreClone<C, S>, silent?: boolean): void;
}
