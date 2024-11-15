// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { TelemetryConnectorType } from "../../types/telemetryConnectorType";

/**
 * Telemetry connector config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TelemetryConnectorConfig = {
	type: typeof TelemetryConnectorType.EntityStorage;
	options?: {
		telemetryMetricStorageConnectorType?: string;
		telemetryMetricValueStorageConnectorType?: string;
		loggingConnectorType?: string;
	};
};
