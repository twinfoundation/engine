// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntitySchema } from "@twin.org/entity";
import type { IEngineCoreConfig } from "./config/IEngineCoreConfig";
import type { IEngineCoreTypeConfig } from "./config/IEngineCoreTypeConfig";
import type { IEngineState } from "./IEngineState";

/**
 * Interface describing the data required to clone an engine.
 */
export interface IEngineCoreClone<
	C extends IEngineCoreConfig = IEngineCoreConfig,
	S extends IEngineState = IEngineState
> {
	/**
	 * The config for the engine.
	 */
	config: C;

	/**
	 * The state of the engine.
	 */
	state: S;

	/**
	 * The type initialisers for the engine.
	 */
	typeInitialisers: {
		type: string;
		typeConfig: IEngineCoreTypeConfig[];
		module: string;
		method: string;
	}[];

	/**
	 * The entity schemas for the engine.
	 */
	entitySchemas: { [schema: string]: IEntitySchema };
}
