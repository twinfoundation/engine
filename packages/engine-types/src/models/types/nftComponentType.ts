// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * NFT component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const NftComponentType = {
	/**
	 * Service.
	 */
	Service: "service",

	/**
	 * REST client.
	 */
	RestClient: "rest-client"
} as const;

/**
 * NFT component types.
 */
export type NftComponentType = (typeof NftComponentType)[keyof typeof NftComponentType];
