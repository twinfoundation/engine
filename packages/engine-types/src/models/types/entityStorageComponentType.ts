// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Entity storage component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntityStorageComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Entity storage component types.
 */
export type EntityStorageComponentType =
	(typeof EntityStorageComponentType)[keyof typeof EntityStorageComponentType];
