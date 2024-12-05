// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { MessagingComponentType } from "../types/messagingComponentType";

/**
 * Messaging component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MessagingComponentConfig = {
	type: typeof MessagingComponentType.Service;
	options?: {
		messagingEmailConnectorType?: string;
		messagingPushNotificationConnectorType?: string;
		messagingSmsConnectorType?: string;
		templateEntryStorageConnectorType?: string;
	};
};
