// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Document management component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocumentManagementComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Document management component types.
 */
export type DocumentManagementComponentType =
	(typeof DocumentManagementComponentType)[keyof typeof DocumentManagementComponentType];
