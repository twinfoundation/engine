// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Identity profile component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const IdentityProfileComponentType = {
	/**
	 * Service.
	 */
	Service: "service",

	/**
	 * REST client.
	 */
	RestClient: "rest-client"
} as const;

/**
 * Identity profile component types.
 */
export type IdentityProfileComponentType =
	(typeof IdentityProfileComponentType)[keyof typeof IdentityProfileComponentType];
