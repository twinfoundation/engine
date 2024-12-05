// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Messaging push notification connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MessagingPushNotificationConnectorType = {
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
 * Messaging push notification connector types.
 */
export type MessagingPushNotificationConnectorType =
	(typeof MessagingPushNotificationConnectorType)[keyof typeof MessagingPushNotificationConnectorType];
