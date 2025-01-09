// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IS3BlobStorageConnectorConstructorOptions } from "@twin.org/blob-storage-connector-aws-s3";
import type { IAzureBlobStorageConnectorConstructorOptions } from "@twin.org/blob-storage-connector-azure";
import type { IFileBlobStorageConnectorConstructorOptions } from "@twin.org/blob-storage-connector-file";
import type { IGcpBlobStorageConnectorConstructorOptions } from "@twin.org/blob-storage-connector-gcp";
import type { IIpfsBlobStorageConnectorConstructorOptions } from "@twin.org/blob-storage-connector-ipfs";
import type { BlobStorageConnectorType } from "../types/blobStorageConnectorType";

/**
 * Blob storage connector config types.
 */
export type BlobStorageConnectorConfig =
	| {
			type: typeof BlobStorageConnectorType.File;
			options: IFileBlobStorageConnectorConstructorOptions & {
				storagePrefix?: string;
			};
	  }
	| {
			type: typeof BlobStorageConnectorType.Memory;
			options?: never;
	  }
	| {
			type: typeof BlobStorageConnectorType.AwsS3;
			options: IS3BlobStorageConnectorConstructorOptions & {
				storagePrefix?: string;
			};
	  }
	| {
			type: typeof BlobStorageConnectorType.AzureStorage;
			options: IAzureBlobStorageConnectorConstructorOptions & {
				storagePrefix?: string;
			};
	  }
	| {
			type: typeof BlobStorageConnectorType.GcpStorage;
			options: IGcpBlobStorageConnectorConstructorOptions & {
				storagePrefix?: string;
			};
	  }
	| {
			type: typeof BlobStorageConnectorType.Ipfs;
			options: IIpfsBlobStorageConnectorConstructorOptions;
	  };
