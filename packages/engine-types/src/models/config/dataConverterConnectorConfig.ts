// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { DataConverterConnectorType } from "../types/dataConverterConnectorType";

/**
 * Data converter connector config types.
 */
export type DataConverterConnectorConfig =
	| {
			type: typeof DataConverterConnectorType.Json;
			options?: never;
	  }
	| {
			type: typeof DataConverterConnectorType.Xml;
			options?: never;
	  };
