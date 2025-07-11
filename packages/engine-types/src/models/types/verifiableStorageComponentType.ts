// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Verifiable storage component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const VerifiableStorageComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Verifiable storage component types.
 */
export type IVerifiableStorageComponentType =
	(typeof VerifiableStorageComponentType)[keyof typeof VerifiableStorageComponentType];
