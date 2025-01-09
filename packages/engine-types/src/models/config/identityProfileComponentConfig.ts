// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IIdentityProfileServiceConstructorOptions } from "@twin.org/identity-service";
import type { IdentityComponentType } from "../types/identityComponentType";

/**
 * Identity profile component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type IdentityProfileComponentConfig = {
	type: typeof IdentityComponentType.Service;
	options?: IIdentityProfileServiceConstructorOptions;
};
