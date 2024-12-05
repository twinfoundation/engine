// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAwsPushNotificationConnectorConfig } from "@twin.org/messaging-connector-aws";
import type { MessagingPushNotificationConnectorType } from "../types/messagingPushNotificationConnectorType";

/**
 * Messaging push notification connector config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MessagingPushNotificationConnectorConfig =
	| {
			type: typeof MessagingPushNotificationConnectorType.EntityStorage;
			options?: {
				loggingConnectorType?: string;
				messagingDeviceEntryStorageConnectorType?: string;
				messagingMessageEntryStorageConnectorType?: string;
			};
	  }
	| {
			type: typeof MessagingPushNotificationConnectorType.Aws;
			options: {
				loggingConnectorType?: string;
				config: IAwsPushNotificationConnectorConfig;
			};
	  };
