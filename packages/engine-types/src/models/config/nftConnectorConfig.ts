// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageNftConnectorConstructorOptions } from "@twin.org/nft-connector-entity-storage";
import type { IIotaNftConnectorConstructorOptions } from "@twin.org/nft-connector-iota";
import type { NftConnectorType } from "../types/nftConnectorType";

/**
 * NFT connector config types.
 */
export type NftConnectorConfig =
	| {
			type: typeof NftConnectorType.EntityStorage;
			options?: IEntityStorageNftConnectorConstructorOptions;
	  }
	| {
			type: typeof NftConnectorType.Iota;
			options: IIotaNftConnectorConstructorOptions;
	  };
