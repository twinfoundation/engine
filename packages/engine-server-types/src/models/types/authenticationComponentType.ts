// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Authentication component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthenticationComponentType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage"
} as const;

/**
 * Authentication component types.
 */
export type AuthenticationComponentType =
	(typeof AuthenticationComponentType)[keyof typeof AuthenticationComponentType];
