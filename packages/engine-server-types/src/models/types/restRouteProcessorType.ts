// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * REST route processor types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RestRouteProcessorType = {
	/**
	 * Auth header.
	 */
	AuthHeader: "auth-header",

	/**
	 * Logging.
	 */
	Logging: "logging",

	/**
	 * Node Identity.
	 */
	NodeIdentity: "node-identity",

	/**
	 * Static User Identity.
	 */
	StaticUserIdentity: "static-user-identity",

	/**
	 * REST Route.
	 */
	RestRoute: "rest-route"
} as const;

/**
 * REST route processor types.
 */
export type RestRouteProcessorType =
	(typeof RestRouteProcessorType)[keyof typeof RestRouteProcessorType];
