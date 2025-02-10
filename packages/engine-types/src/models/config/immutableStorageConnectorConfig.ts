// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageImmutableStorageConnectorConstructorOptions } from "@twin.org/immutable-storage-connector-entity-storage";
import type { IIotaImmutableStorageConnectorConstructorOptions } from "@twin.org/immutable-storage-connector-iota";
import type { IIotaStardustImmutableStorageConnectorConstructorOptions } from "@twin.org/immutable-storage-connector-iota-stardust";
import type { ImmutableStorageConnectorType } from "../types/immutableStorageConnectorType";

/**
 * Immutable storage connector config types.
 */
export type ImmutableStorageConnectorConfig =
	| {
			type: typeof ImmutableStorageConnectorType.EntityStorage;
			options?: IEntityStorageImmutableStorageConnectorConstructorOptions;
	  }
	| {
			type: typeof ImmutableStorageConnectorType.Iota;
			options: IIotaImmutableStorageConnectorConstructorOptions;
	  }
	| {
			type: typeof ImmutableStorageConnectorType.IotaStardust;
			options: IIotaStardustImmutableStorageConnectorConstructorOptions;
	  };
