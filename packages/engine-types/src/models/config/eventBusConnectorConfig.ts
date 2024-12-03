// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { EventBusConnectorType } from "../types/eventBusConnectorType";

/**
 * Event bus connector config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type EventBusConnectorConfig = {
	type: typeof EventBusConnectorType.Local;
	options?: {
		loggingConnectorType?: string;
	};
};
