// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEventBusServiceConstructorOptions } from "@twin.org/event-bus-service";
import type { IEventBusSocketClientConstructorOptions } from "@twin.org/event-bus-socket-client";
import type { EventBusComponentType } from "../types/eventBusComponentType";

/**
 * Event bus storage component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type EventBusComponentConfig =
	| {
			type: typeof EventBusComponentType.Service;
			options?: IEventBusServiceConstructorOptions;
	  }
	| {
			type: typeof EventBusComponentType.SocketClient;
			options: IEventBusSocketClientConstructorOptions;
	  };
