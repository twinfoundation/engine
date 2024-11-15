// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The state of the engine.
 */
export interface IEngineState {
	/**
	 * The identity for the node.
	 */
	nodeIdentity?: string;

	/**
	 * The ids of the bootstrapped components.
	 */
	bootstrappedComponents: string[];
}
