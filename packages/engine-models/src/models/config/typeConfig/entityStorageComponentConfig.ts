// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageConfig } from "@twin.org/entity-storage-service";
import type { EntityStorageComponentType } from "../../types/entityStorageComponentType";

/**
 * Entity storage component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type EntityStorageComponentConfig = {
	type: typeof EntityStorageComponentType.Service;
	options: {
		entityStorageType: string;
		config?: IEntityStorageConfig;
	};
};
