// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IDataProcessingServiceConstructorOptions } from "@twin.org/data-processing-service";
import type { DataProcessingComponentType } from "../types/dataProcessingComponentType";

/**
 * Data processing component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type DataProcessingComponentConfig = {
	type: typeof DataProcessingComponentType.Service;
	options?: IDataProcessingServiceConstructorOptions;
};
