// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Configuration for the engine core type base.
 */
export interface IEngineCoreTypeBaseConfig<T = unknown> {
	/**
	 * The type of the instance.
	 */
	type: string;

	/**
	 * The options for the instance.
	 */
	options?: T;
}
