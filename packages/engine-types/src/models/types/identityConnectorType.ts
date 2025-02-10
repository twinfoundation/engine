// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Identity connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const IdentityConnectorType = {
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
 * Identity connector types.
 */
export type IdentityConnectorType =
	(typeof IdentityConnectorType)[keyof typeof IdentityConnectorType];
