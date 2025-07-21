// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Auditable item stream component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuditableItemStreamComponentType = {
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
 * Auditable item stream component types.
 */
export type AuditableItemStreamComponentType =
	(typeof AuditableItemStreamComponentType)[keyof typeof AuditableItemStreamComponentType];
