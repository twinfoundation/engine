// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IIotaIdentityConnectorConfig } from "@twin.org/identity-connector-iota";
import type { IdentityConnectorType } from "../../types/identityConnectorType";

/**
 * Identity config connector types.
 */
export type IdentityConnectorConfig =
	| {
			type: typeof IdentityConnectorType.EntityStorage;
			options?: {
				didDocumentEntityStorageType?: string;
				vaultConnectorType?: string;
			};
	  }
	| {
			type: typeof IdentityConnectorType.Iota;
			options: {
				vaultConnectorType?: string;
				config: IIotaIdentityConnectorConfig;
			};
	  };
