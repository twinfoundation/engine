// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Wallet connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const WalletConnectorType = {
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
 * Wallet connector types.
 */
export type WalletConnectorType = (typeof WalletConnectorType)[keyof typeof WalletConnectorType];
