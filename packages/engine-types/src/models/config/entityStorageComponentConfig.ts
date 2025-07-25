// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IEntityStorageServiceConstructorOptions } from "@twin.org/entity-storage-service";
import type { EntityStorageComponentType } from "../types/entityStorageComponentType";

/**
 * Entity storage component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type EntityStorageComponentConfig =
	| {
			type: typeof EntityStorageComponentType.Service;
			options: IEntityStorageServiceConstructorOptions;
	  }
	| {
			type: typeof EntityStorageComponentType.RestClient;
			options: IBaseRestClientConfig & {
				/**
				 * The type of the entity storage.
				 */
				entityStorageType: string;
			};
	  };
