// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Data converter connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DataConverterConnectorType = {
	/**
	 * JSON.
	 */
	Json: "json",

	/**
	 * Xml.
	 */
	Xml: "xml"
} as const;

/**
 * Data converter connector types.
 */
export type DataConverterConnectorType =
	(typeof DataConverterConnectorType)[keyof typeof DataConverterConnectorType];
