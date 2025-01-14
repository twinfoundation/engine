// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Faucet connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const FaucetConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * IOTA.
	 */
	Iota: "iota",

	/**
	 * IOTA Rebased.
	 */
	IotaRebased: "iota-rebased"
} as const;

/**
 * Faucet connector types.
 */
export type FaucetConnectorType = (typeof FaucetConnectorType)[keyof typeof FaucetConnectorType];
