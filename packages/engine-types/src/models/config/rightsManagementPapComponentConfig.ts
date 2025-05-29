// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IPolicyAdministrationPointServiceOptions } from "@twin.org/rights-management-pap-service";
import type { RightsManagementPapComponentType } from "../types/rightsManagementPapComponentType";

/**
 * Rights management PAP component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementPapComponentConfig = {
	type: typeof RightsManagementPapComponentType.Service;
	options?: IPolicyAdministrationPointServiceOptions;
};
