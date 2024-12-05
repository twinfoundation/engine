// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Messaging component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MessagingComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Messaging component types.
 */
export type MessagingComponentType =
	(typeof MessagingComponentType)[keyof typeof MessagingComponentType];
