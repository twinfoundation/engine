// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IVerifiableStorageServiceConstructorOptions } from "@twin.org/verifiable-storage-service";
import type { VerifiableStorageComponentType } from "../types/verifiableStorageComponentType";

/**
 * Verifiable storage component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type VerifiableStorageComponentConfig = {
	type: typeof VerifiableStorageComponentType.Service;
	options?: IVerifiableStorageServiceConstructorOptions;
};
