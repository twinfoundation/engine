// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageWalletConnectorConstructorOptions } from "@twin.org/wallet-connector-entity-storage";
import type { IIotaWalletConnectorConstructorOptions } from "@twin.org/wallet-connector-iota";
import type { IIotaRebasedWalletConnectorConstructorOptions } from "@twin.org/wallet-connector-iota-rebased";
import type { WalletConnectorType } from "../types/walletConnectorType";

/**
 * Wallet connector config types.
 */
export type WalletConnectorConfig =
	| {
			type: typeof WalletConnectorType.EntityStorage;
			options?: IEntityStorageWalletConnectorConstructorOptions;
	  }
	| {
			type: typeof WalletConnectorType.Iota;
			options: IIotaWalletConnectorConstructorOptions;
	  }
	| {
			type: typeof WalletConnectorType.IotaRebased;
			options: IIotaRebasedWalletConnectorConstructorOptions;
	  };
