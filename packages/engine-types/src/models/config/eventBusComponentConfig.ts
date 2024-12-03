// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { EventBusComponentType } from "../types/eventBusComponentType";

/**
 * Event bus storage component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type EventBusComponentConfig = {
	type: typeof EventBusComponentType.Service;
	options?: {
		eventBusConnectorType?: string;
	};
};
