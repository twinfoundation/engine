// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Background task connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BackgroundTaskConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage"
} as const;

/**
 * Background task connector types.
 */
export type BackgroundTaskConnectorType =
	(typeof BackgroundTaskConnectorType)[keyof typeof BackgroundTaskConnectorType];
