// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IIdentityResolverServiceConstructorOptions } from "@twin.org/identity-service";
import type { IdentityComponentType } from "../types/identityComponentType";

/**
 * Identity resolver component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type IdentityResolverComponentConfig = {
	type: typeof IdentityComponentType.Service;
	options?: IIdentityResolverServiceConstructorOptions;
};
