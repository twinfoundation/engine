// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Blob storage component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BlobStorageComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Blob storage component types.
 */
export type BlobStorageComponentType =
	(typeof BlobStorageComponentType)[keyof typeof BlobStorageComponentType];
