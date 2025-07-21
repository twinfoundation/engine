// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Auditable item graph component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuditableItemGraphComponentType = {
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
 * Auditable item graph component types.
 */
export type AuditableItemGraphComponentType =
	(typeof AuditableItemGraphComponentType)[keyof typeof AuditableItemGraphComponentType];
