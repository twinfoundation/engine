// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageIdentityResolverConnectorConstructorOptions } from "@twin.org/identity-connector-entity-storage";
import type {
	IIotaIdentityResolverConnectorConstructorOptions,
	IIotaUniversalResolverConnectorConstructorOptions
} from "@twin.org/identity-connector-iota";
import type { IIotaStardustIdentityResolverConnectorConstructorOptions } from "@twin.org/identity-connector-iota-stardust";
import type { IdentityResolverConnectorType } from "../types/identityResolverConnectorType";

/**
 * Identity resolver config connector types.
 */
export type IdentityResolverConnectorConfig =
	| {
			type: typeof IdentityResolverConnectorType.EntityStorage;
			options?: IEntityStorageIdentityResolverConnectorConstructorOptions;
	  }
	| {
			type: typeof IdentityResolverConnectorType.Iota;
			options: IIotaIdentityResolverConnectorConstructorOptions;
	  }
	| {
			type: typeof IdentityResolverConnectorType.IotaStardust;
			options: IIotaStardustIdentityResolverConnectorConstructorOptions;
	  }
	| {
			type: typeof IdentityResolverConnectorType.IotaUniversal;
			options: IIotaUniversalResolverConnectorConstructorOptions;
	  };
