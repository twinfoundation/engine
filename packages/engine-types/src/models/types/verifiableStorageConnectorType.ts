// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Verifiable storage connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const VerifiableStorageConnectorType = {
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
 * Verifiable storage connector types.
 */
export type VerifiableStorageConnectorType =
	(typeof VerifiableStorageConnectorType)[keyof typeof VerifiableStorageConnectorType];
