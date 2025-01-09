// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ILoggingServiceConstructorOptions } from "@twin.org/logging-service";
import type { LoggingComponentType } from "../types/loggingComponentType";

/**
 * Logging component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type LoggingComponentConfig = {
	type: typeof LoggingComponentType.Service;
	options?: ILoggingServiceConstructorOptions;
};
