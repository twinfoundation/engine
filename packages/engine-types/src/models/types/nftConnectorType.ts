// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * NFT connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const NftConnectorType = {
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
 * NFT connector types.
 */
export type NftConnectorType = (typeof NftConnectorType)[keyof typeof NftConnectorType];
