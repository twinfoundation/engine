// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IS3BlobStorageConnectorConfig } from "@twin.org/blob-storage-connector-aws-s3";
import type { IAzureBlobStorageConnectorConfig } from "@twin.org/blob-storage-connector-azure";
import type { IFileBlobStorageConnectorConfig } from "@twin.org/blob-storage-connector-file";
import type { IGcpBlobStorageConnectorConfig } from "@twin.org/blob-storage-connector-gcp";
import type { IIpfsBlobStorageConnectorConfig } from "@twin.org/blob-storage-connector-ipfs";
import type { BlobStorageConnectorType } from "../../types/blobStorageConnectorType";

/**
 * Blob storage connector config types.
 */
export type BlobStorageConnectorConfig =
	| {
			type: typeof BlobStorageConnectorType.File;
			options: {
				config: IFileBlobStorageConnectorConfig;
				storagePrefix?: string;
			};
	  }
	| {
			type: typeof BlobStorageConnectorType.Memory;
			options?: never;
	  }
	| {
			type: typeof BlobStorageConnectorType.AwsS3;
			options: {
				config: IS3BlobStorageConnectorConfig;
				storagePrefix?: string;
			};
	  }
	| {
			type: typeof BlobStorageConnectorType.AzureStorage;
			options: {
				config: IAzureBlobStorageConnectorConfig;
				storagePrefix?: string;
			};
	  }
	| {
			type: typeof BlobStorageConnectorType.GcpStorage;
			options: {
				config: IGcpBlobStorageConnectorConfig;
				storagePrefix?: string;
			};
	  }
	| {
			type: typeof BlobStorageConnectorType.Ipfs;
			options: {
				config: IIpfsBlobStorageConnectorConfig;
			};
	  };
