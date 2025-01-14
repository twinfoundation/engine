// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { INftAttestationConnectorConstructorOptions } from "@twin.org/attestation-connector-nft";
import type { AttestationConnectorType } from "../types/attestationConnectorType";

/**
 * Attestation config connector types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AttestationConnectorConfig = {
	type: typeof AttestationConnectorType.Nft;
	options?: INftAttestationConnectorConstructorOptions;
};
