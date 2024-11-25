// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Identity component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const IdentityComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Identity component types.
 */
export type IdentityComponentType =
	(typeof IdentityComponentType)[keyof typeof IdentityComponentType];
