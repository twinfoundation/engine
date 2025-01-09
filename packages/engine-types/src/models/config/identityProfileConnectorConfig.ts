// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageIdentityProfileConnectorConstructorOptions } from "@twin.org/identity-connector-entity-storage";
import type { IdentityProfileConnectorType } from "../types/identityProfileConnectorType";

/**
 * Identity profile connector config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type IdentityProfileConnectorConfig = {
	type: typeof IdentityProfileConnectorType.EntityStorage;
	options?: IEntityStorageIdentityProfileConnectorConstructorOptions;
};
