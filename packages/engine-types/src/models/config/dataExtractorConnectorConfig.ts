// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { DataExtractorConnectorType } from "../types/dataExtractorConnectorType";

/**
 * Data extractor connector config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type DataExtractorConnectorConfig = {
	type: typeof DataExtractorConnectorType.JsonPath;
	options?: never;
};
