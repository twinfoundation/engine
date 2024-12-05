// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Messaging email connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MessagingEmailConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * AWS.
	 */
	Aws: "aws"
} as const;

/**
 * Messaging email connector types.
 */
export type MessagingEmailConnectorType =
	(typeof MessagingEmailConnectorType)[keyof typeof MessagingEmailConnectorType];
