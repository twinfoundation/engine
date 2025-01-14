// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Attestation connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AttestationConnectorType = {
	/**
	 * NFT.
	 */
	Nft: "nft"
} as const;

/**
 * Attestation connector types.
 */
export type AttestationConnectorType =
	(typeof AttestationConnectorType)[keyof typeof AttestationConnectorType];
