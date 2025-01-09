// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageBackgroundTaskConnectorConstructorOptions } from "@twin.org/background-task-connector-entity-storage";
import type { BackgroundTaskConnectorType } from "../types/backgroundTaskConnectorType";

/**
 * Background task connector config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type BackgroundTaskConnectorConfig = {
	type: typeof BackgroundTaskConnectorType.EntityStorage;
	options?: IEntityStorageBackgroundTaskConnectorConstructorOptions;
};
