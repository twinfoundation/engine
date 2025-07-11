// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageAuthenticationAdminServiceConstructorOptions } from "@twin.org/api-auth-entity-storage-service";
import type { AuthenticationAdminComponentType } from "../types/authenticationAdminComponentType";

/**
 * Authentication admin component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AuthenticationAdminComponentConfig = {
	type: typeof AuthenticationAdminComponentType.EntityStorage;
	options?: IEntityStorageAuthenticationAdminServiceConstructorOptions;
};
