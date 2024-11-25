// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Telemetry component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TelemetryComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Telemetry component types.
 */
export type TelemetryComponentType =
	(typeof TelemetryComponentType)[keyof typeof TelemetryComponentType];
