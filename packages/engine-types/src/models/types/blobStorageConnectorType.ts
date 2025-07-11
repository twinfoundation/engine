// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Blob storage connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BlobStorageConnectorType = {
	/**
	 * File storage.
	 */
	File: "file",

	/**
	 * Memory.
	 */
	Memory: "memory",

	/**
	 * IPFS.
	 */
	Ipfs: "ipfs",

	/**
	 * AWS S3.
	 */
	AwsS3: "aws-s3",

	/**
	 * Azure Storage.
	 */
	AzureStorage: "azure-storage",

	/**
	 * GCP Storage.
	 */
	GcpStorage: "gcp-storage"
} as const;

/**
 * Blob storage connector types.
 */
export type BlobStorageConnectorType =
	(typeof BlobStorageConnectorType)[keyof typeof BlobStorageConnectorType];
