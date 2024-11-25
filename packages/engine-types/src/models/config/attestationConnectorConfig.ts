// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageAttestationConnectorConfig } from "@twin.org/attestation-connector-entity-storage";
import type { IIotaAttestationConnectorConfig } from "@twin.org/attestation-connector-iota";
import type { AttestationConnectorType } from "../types/attestationConnectorType";

/**
 * Attestation config connector types.
 */
export type AttestationConnectorConfig =
	| {
			type: typeof AttestationConnectorType.EntityStorage;
			options?: {
				identityConnectorType?: string;
				nftConnectorType?: string;
				config?: IEntityStorageAttestationConnectorConfig;
			};
	  }
	| {
			type: typeof AttestationConnectorType.Iota;
			options?: {
				identityConnectorType?: string;
				nftConnectorType?: string;
				config?: IIotaAttestationConnectorConfig;
			};
	  };
