// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IIotaFaucetConnectorConfig } from "@twin.org/wallet-connector-iota";
import type { FaucetConnectorType } from "../types/faucetConnectorType";

/**
 * Faucet config types.
 */
export type FaucetConnectorConfig =
	| {
			type: typeof FaucetConnectorType.EntityStorage;
			options?: {
				walletAddressEntityStorageType?: string;
			};
	  }
	| {
			type: typeof FaucetConnectorType.Iota;
			options: {
				vaultConnectorType?: string;
				faucetConnectorType?: string;
				config: IIotaFaucetConnectorConfig;
			};
	  };
