// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHashicorpVaultConnectorConfig } from "@twin.org/vault-connector-hashicorp";
import type { VaultConnectorType } from "../types/vaultConnectorType";

/**
 * Vault connector config types.
 */
export type VaultConnectorConfig =
	| {
			type: typeof VaultConnectorType.EntityStorage;
			options?: {
				vaultKeyEntityStorageType?: string;
				vaultSecretEntityStorageType?: string;
			};
	  }
	| {
			type: typeof VaultConnectorType.Hashicorp;
			options: {
				config: IHashicorpVaultConnectorConfig;
			};
	  };
