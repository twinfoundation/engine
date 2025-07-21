// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Data processing component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DataProcessingComponentType = {
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
 * Data processing component types.
 */
export type DataProcessingComponentType =
	(typeof DataProcessingComponentType)[keyof typeof DataProcessingComponentType];
