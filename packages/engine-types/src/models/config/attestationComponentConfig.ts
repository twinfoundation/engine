// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAttestationServiceConstructorOptions } from "@twin.org/attestation-service";
import type { AttestationComponentType } from "../types/attestationComponentType";

/**
 * Attestation component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AttestationComponentConfig = {
	type: typeof AttestationComponentType.Service;
	options?: IAttestationServiceConstructorOptions;
};
