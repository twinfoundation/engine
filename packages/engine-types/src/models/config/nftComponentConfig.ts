// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { INftServiceConstructorOptions } from "@twin.org/nft-service";
import type { NftComponentType } from "../types/nftComponentType";

/**
 * NFT component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type NftComponentConfig = {
	type: typeof NftComponentType.Service;
	options?: INftServiceConstructorOptions;
};
