// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Immutable storage connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ImmutableStorageConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * IOTA.
	 */
	Iota: "iota"
} as const;

/**
 * Immutable storage connector types.
 */
export type ImmutableStorageConnectorType =
	(typeof ImmutableStorageConnectorType)[keyof typeof ImmutableStorageConnectorType];
