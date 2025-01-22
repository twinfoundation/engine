// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageIdentityResolverConnectorConstructorOptions } from "@twin.org/identity-connector-entity-storage";
import type { IIotaIdentityResolverConnectorConstructorOptions } from "@twin.org/identity-connector-iota";
import type { IIotaRebasedIdentityResolverConnectorConstructorOptions } from "@twin.org/identity-connector-iota-rebased";
import type { IdentityConnectorType } from "../types/identityConnectorType";

/**
 * Identity resolver config connector types.
 */
export type IdentityResolverConnectorConfig =
	| {
			type: typeof IdentityConnectorType.EntityStorage;
			options?: IEntityStorageIdentityResolverConnectorConstructorOptions;
	  }
	| {
			type: typeof IdentityConnectorType.Iota;
			options: IIotaIdentityResolverConnectorConstructorOptions;
	  }
	| {
			type: typeof IdentityConnectorType.IotaRebased;
			options: IIotaRebasedIdentityResolverConnectorConstructorOptions;
	  };
