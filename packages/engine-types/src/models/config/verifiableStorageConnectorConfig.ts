// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageVerifiableStorageConnectorConstructorOptions } from "@twin.org/verifiable-storage-connector-entity-storage";
import type { IIotaVerifiableStorageConnectorConstructorOptions } from "@twin.org/verifiable-storage-connector-iota";
import type { IIotaStardustVerifiableStorageConnectorConstructorOptions } from "@twin.org/verifiable-storage-connector-iota-stardust";
import type { VerifiableStorageConnectorType } from "../types/verifiableStorageConnectorType";

/**
 * Verifiable storage connector config types.
 */
export type VerifiableStorageConnectorConfig =
	| {
			type: typeof VerifiableStorageConnectorType.EntityStorage;
			options?: IEntityStorageVerifiableStorageConnectorConstructorOptions;
	  }
	| {
			type: typeof VerifiableStorageConnectorType.Iota;
			options: IIotaVerifiableStorageConnectorConstructorOptions;
	  }
	| {
			type: typeof VerifiableStorageConnectorType.IotaStardust;
			options: IIotaStardustVerifiableStorageConnectorConstructorOptions;
	  };
