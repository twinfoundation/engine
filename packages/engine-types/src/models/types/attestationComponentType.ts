// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Attestation component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AttestationComponentType = {
	/**
	 * Service.
	 */
	Service: "service",

	/**
	 * REST client.
	 */
	RestClient: "rest-client"
} as const;

/**
 * Attestation component types.
 */
export type AttestationComponentType =
	(typeof AttestationComponentType)[keyof typeof AttestationComponentType];
