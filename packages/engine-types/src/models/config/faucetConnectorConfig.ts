// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageFaucetConnectorConstructorOptions } from "@twin.org/wallet-connector-entity-storage";
import type { IIotaFaucetConnectorConstructorOptions } from "@twin.org/wallet-connector-iota";
import type { FaucetConnectorType } from "../types/faucetConnectorType";

/**
 * Faucet config types.
 */
export type FaucetConnectorConfig =
	| {
			type: typeof FaucetConnectorType.EntityStorage;
			options?: IEntityStorageFaucetConnectorConstructorOptions;
	  }
	| {
			type: typeof FaucetConnectorType.Iota;
			options: IIotaFaucetConnectorConstructorOptions;
	  };
