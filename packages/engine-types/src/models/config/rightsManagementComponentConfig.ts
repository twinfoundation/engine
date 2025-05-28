// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRightsManagementServiceConstructorOptions } from "@twin.org/rights-management-service";
import type { RightsManagementComponentType } from "../types/rightsManagementComponentType";

/**
 * Rights management component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementComponentConfig = {
	type: typeof RightsManagementComponentType.Service;
	options?: IRightsManagementServiceConstructorOptions;
};
