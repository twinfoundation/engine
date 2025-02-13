// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Immutable storage component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ImmutableStorageComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Immutable storage component types.
 */
export type IImmutableStorageComponentType =
	(typeof ImmutableStorageComponentType)[keyof typeof ImmutableStorageComponentType];
