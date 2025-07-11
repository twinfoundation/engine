// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Telemetry connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TelemetryConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage"
} as const;

/**
 * Telemetry connector types.
 */
export type TelemetryConnectorType =
	(typeof TelemetryConnectorType)[keyof typeof TelemetryConnectorType];
