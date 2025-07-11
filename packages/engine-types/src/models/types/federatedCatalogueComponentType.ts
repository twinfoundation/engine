// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Federated catalogue component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const FederatedCatalogueComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Federated catalogue component types.
 */
export type FederatedCatalogueComponentType =
	(typeof FederatedCatalogueComponentType)[keyof typeof FederatedCatalogueComponentType];
