// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageAttestationConnectorConstructorOptions } from "@twin.org/attestation-connector-entity-storage";
import type { IIotaAttestationConnectorConstructorOptions } from "@twin.org/attestation-connector-iota";
import type { AttestationConnectorType } from "../types/attestationConnectorType";

/**
 * Attestation config connector types.
 */
export type AttestationConnectorConfig =
	| {
			type: typeof AttestationConnectorType.EntityStorage;
			options?: IEntityStorageAttestationConnectorConstructorOptions;
	  }
	| {
			type: typeof AttestationConnectorType.Iota;
			options?: IIotaAttestationConnectorConstructorOptions;
	  };
