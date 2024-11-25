// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Vault connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const VaultConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * Hashicorp.
	 */
	Hashicorp: "hashicorp"
} as const;

/**
 * Vault connector types.
 */
export type VaultConnectorType = (typeof VaultConnectorType)[keyof typeof VaultConnectorType];
