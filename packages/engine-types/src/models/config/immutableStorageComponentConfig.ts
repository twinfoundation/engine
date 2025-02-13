// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IImmutableStorageServiceConstructorOptions } from "@twin.org/immutable-storage-service";
import type { ImmutableStorageComponentType } from "../types/immutableStorageComponentType";

/**
 * Immutable storage component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ImmutableStorageComponentConfig = {
	type: typeof ImmutableStorageComponentType.Service;
	options?: IImmutableStorageServiceConstructorOptions;
};
