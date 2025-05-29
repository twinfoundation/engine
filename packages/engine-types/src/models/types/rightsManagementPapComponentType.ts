// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management PAP component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementPapComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Rights management PAP component types.
 */
export type RightsManagementPapComponentType =
	(typeof RightsManagementPapComponentType)[keyof typeof RightsManagementPapComponentType];
