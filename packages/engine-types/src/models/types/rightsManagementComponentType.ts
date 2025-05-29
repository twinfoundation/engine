// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Rights management component types.
 */
export type RightsManagementComponentType =
	(typeof RightsManagementComponentType)[keyof typeof RightsManagementComponentType];
