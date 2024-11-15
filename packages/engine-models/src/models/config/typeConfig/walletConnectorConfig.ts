// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageWalletConnectorConfig } from "@twin.org/wallet-connector-entity-storage";
import type { IIotaWalletConnectorConfig } from "@twin.org/wallet-connector-iota";
import type { WalletConnectorType } from "../../types/walletConnectorType";

/**
 * Wallet connector config types.
 */
export type WalletConnectorConfig =
	| {
			type: typeof WalletConnectorType.EntityStorage;
			options?: {
				vaultConnectorType?: string;
				faucetConnectorType?: string;
				walletAddressEntityStorageType?: string;
				config?: IEntityStorageWalletConnectorConfig;
			};
	  }
	| {
			type: typeof WalletConnectorType.Iota;
			options: {
				vaultConnectorType?: string;
				faucetConnectorType?: string;
				config: IIotaWalletConnectorConfig;
			};
	  };
