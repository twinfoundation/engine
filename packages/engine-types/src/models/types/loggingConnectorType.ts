// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Logging connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const LoggingConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * Console.
	 */
	Console: "console",

	/**
	 * Multi combines other loggers.
	 */
	Multi: "multi"
} as const;

/**
 * Logging connector types.
 */
export type LoggingConnectorType = (typeof LoggingConnectorType)[keyof typeof LoggingConnectorType];
