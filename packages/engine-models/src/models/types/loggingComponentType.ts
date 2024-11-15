// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Logging component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const LoggingComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Logging component types.
 */
export type LoggingComponentType = (typeof LoggingComponentType)[keyof typeof LoggingComponentType];
