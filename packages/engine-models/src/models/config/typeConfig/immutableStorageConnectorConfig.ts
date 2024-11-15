// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IIotaImmutableStorageConnectorConfig } from "@twin.org/immutable-storage-connector-iota";
import type { ImmutableStorageConnectorType } from "../../types/immutableStorageConnectorType";

/**
 * Immutable storage connector config types.
 */
export type ImmutableStorageConnectorConfig =
	| {
			type: typeof ImmutableStorageConnectorType.EntityStorage;
			options?: {
				immutableStorageEntityStorageType?: string;
			};
	  }
	| {
			type: typeof ImmutableStorageConnectorType.Iota;
			options: {
				vaultConnectorType?: string;
				config: IIotaImmutableStorageConnectorConfig;
			};
	  };
