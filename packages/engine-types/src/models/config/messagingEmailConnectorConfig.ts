// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAwsMessagingEmailConnectorConstructorOptions } from "@twin.org/messaging-connector-aws";
import type { IEntityStorageMessagingEmailConnectorConstructorOptions } from "@twin.org/messaging-connector-entity-storage";
import type { MessagingEmailConnectorType } from "../types/messagingEmailConnectorType";

/**
 * Messaging email connector config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MessagingEmailConnectorConfig =
	| {
			type: typeof MessagingEmailConnectorType.EntityStorage;
			options?: IEntityStorageMessagingEmailConnectorConstructorOptions;
	  }
	| {
			type: typeof MessagingEmailConnectorType.Aws;
			options: IAwsMessagingEmailConnectorConstructorOptions;
	  };
