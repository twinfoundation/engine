// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageIdentityResolverConnectorConstructorOptions } from "@twin.org/identity-connector-entity-storage";
import type { IIotaIdentityResolverConnectorConstructorOptions } from "@twin.org/identity-connector-iota";
import type { IUniversalResolverConnectorConstructorOptions } from "@twin.org/identity-connector-universal";
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
			type: typeof IdentityResolverConnectorType.Universal;
			options: IUniversalResolverConnectorConstructorOptions;
	  };
