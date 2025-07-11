// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Identity resolver component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const IdentityResolverComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Identity resolver component types.
 */
export type IdentityResolverComponentType =
	(typeof IdentityResolverComponentType)[keyof typeof IdentityResolverComponentType];
