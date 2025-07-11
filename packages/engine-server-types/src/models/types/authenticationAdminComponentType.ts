// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Authentication admin component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthenticationAdminComponentType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage"
} as const;

/**
 * Authentication admin component types.
 */
export type AuthenticationAdminComponentType =
	(typeof AuthenticationAdminComponentType)[keyof typeof AuthenticationAdminComponentType];
