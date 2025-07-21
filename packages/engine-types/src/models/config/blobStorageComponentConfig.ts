// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IBlobStorageServiceConstructorOptions } from "@twin.org/blob-storage-service";
import type { BlobStorageComponentType } from "../types/blobStorageComponentType";

/**
 * Blob storage component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type BlobStorageComponentConfig =
	| {
			type: typeof BlobStorageComponentType.Service;
			options?: IBlobStorageServiceConstructorOptions;
	  }
	| {
			type: typeof BlobStorageComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
