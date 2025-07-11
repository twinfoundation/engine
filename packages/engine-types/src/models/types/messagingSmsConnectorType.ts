// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Messaging sms connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MessagingSmsConnectorType = {
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
 * Messaging ems connector types.
 */
export type MessagingSmsConnectorType =
	(typeof MessagingSmsConnectorType)[keyof typeof MessagingSmsConnectorType];
