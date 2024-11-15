// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Socket route processor types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SocketRouteProcessorType = {
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
	 * Socket Route.
	 */
	SocketRoute: "socket-route"
} as const;

/**
 * Socket route processor types.
 */
export type SocketRouteProcessorType =
	(typeof SocketRouteProcessorType)[keyof typeof SocketRouteProcessorType];
