// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageAuthenticationServiceConstructorOptions } from "@twin.org/api-auth-entity-storage-service";
import type { AuthenticationComponentType } from "../types/authenticationComponentType";

/**
 * Authentication component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AuthenticationComponentConfig = {
	type: typeof AuthenticationComponentType.EntityStorage;
	options?: IEntityStorageAuthenticationServiceConstructorOptions;
};
