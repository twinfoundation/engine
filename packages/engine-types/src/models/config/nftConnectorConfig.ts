// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IIotaNftConnectorConfig } from "@twin.org/nft-connector-iota";
import type { NftConnectorType } from "../types/nftConnectorType";

/**
 * NFT connector config types.
 */
export type NftConnectorConfig =
	| {
			type: typeof NftConnectorType.EntityStorage;
			options?: {
				nftEntityStorageType?: string;
			};
	  }
	| {
			type: typeof NftConnectorType.Iota;
			options: {
				vaultConnectorType?: string;
				config: IIotaNftConnectorConfig;
			};
	  };
