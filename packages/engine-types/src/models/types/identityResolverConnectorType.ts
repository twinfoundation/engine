// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Identity resolver connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const IdentityResolverConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * IOTA.
	 */
	Iota: "iota",

	/**
	 * IOTA Stardust.
	 */
	IotaStardust: "iota-stardust"
} as const;

/**
 * Identity resolver connector types.
 */
export type IdentityResolverConnectorType =
	(typeof IdentityResolverConnectorType)[keyof typeof IdentityResolverConnectorType];
