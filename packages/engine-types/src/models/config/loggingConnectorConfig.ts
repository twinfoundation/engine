// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IConsoleLoggingConnectorConfig } from "@twin.org/logging-connector-console";
import type { IEntityStorageLoggingConnectorConfig } from "@twin.org/logging-connector-entity-storage";
import type { ILoggingLevelsConfig } from "@twin.org/logging-models";
import type { LoggingConnectorType } from "../types/loggingConnectorType";

/**
 * Logging config connector types.
 */
export type LoggingConnectorConfig =
	| {
			type: typeof LoggingConnectorType.EntityStorage;
			options?: {
				logEntryStorageConnectorType?: string;
				config?: IEntityStorageLoggingConnectorConfig;
			};
	  }
	| {
			type: typeof LoggingConnectorType.Console;
			options?: {
				config?: IConsoleLoggingConnectorConfig;
			};
	  }
	| {
			type: typeof LoggingConnectorType.Multi;
			options: {
				loggingConnectorTypes: string[];
				config?: ILoggingLevelsConfig;
			};
	  };
