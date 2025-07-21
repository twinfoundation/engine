// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Task scheduler component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TaskSchedulerComponentType = {
	/**
	 * Task scheduler.
	 */
	Service: "service"
} as const;

/**
 * Task scheduler component types.
 */
export type TaskSchedulerComponentType =
	(typeof TaskSchedulerComponentType)[keyof typeof TaskSchedulerComponentType];
