// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Event bus component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EventBusComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Event bus component types.
 */
export type EventBusComponentType =
	(typeof EventBusComponentType)[keyof typeof EventBusComponentType];
