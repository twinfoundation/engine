// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageIdentityConnectorConstructorOptions } from "@twin.org/identity-connector-entity-storage";
import type { IIotaIdentityConnectorConstructorOptions } from "@twin.org/identity-connector-iota";
import type { IIotaStardustIdentityConnectorConstructorOptions } from "@twin.org/identity-connector-iota-stardust";
import type { IdentityConnectorType } from "../types/identityConnectorType";

/**
 * Identity config connector types.
 */
export type IdentityConnectorConfig =
	| {
			type: typeof IdentityConnectorType.EntityStorage;
			options?: IEntityStorageIdentityConnectorConstructorOptions;
	  }
	| {
			type: typeof IdentityConnectorType.Iota;
			options: IIotaIdentityConnectorConstructorOptions;
	  }
	| {
			type: typeof IdentityConnectorType.IotaStardust;
			options: IIotaStardustIdentityConnectorConstructorOptions;
	  };
