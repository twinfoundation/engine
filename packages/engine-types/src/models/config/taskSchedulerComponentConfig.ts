// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ITaskSchedulerConstructorOptions } from "@twin.org/background-task-scheduler";
import type { TaskSchedulerComponentType } from "../types/taskSchedulerComponentType";

/**
 * Background task scheduled component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TaskSchedulerComponentConfig = {
	type: typeof TaskSchedulerComponentType.Service;
	options?: ITaskSchedulerConstructorOptions;
};
