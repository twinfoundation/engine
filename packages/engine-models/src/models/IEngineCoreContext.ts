// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IEngineCoreConfig } from "./config/IEngineCoreConfig";
import type { IEngineState } from "./IEngineState";

/**
 * The context for the engine core.
 */
export interface IEngineCoreContext<
	C extends IEngineCoreConfig = IEngineCoreConfig,
	S extends IEngineState = IEngineState
> {
	/**
	 * The engine core config.
	 */
	config: C;

	/**
	 * The engine core state.
	 */
	state: S;

	/**
	 * The state dirty flag, which flags that the state needs saving.
	 */
	stateDirty: boolean;

	/**
	 * The default types to use when components don't have custom types.
	 */
	defaultTypes: { [type: string]: string };

	/**
	 * The components.
	 */
	componentInstances: { instanceType: string; component: IComponent }[];
}
