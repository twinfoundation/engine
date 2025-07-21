// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { ITelemetryServiceConstructorOptions } from "@twin.org/telemetry-service";
import type { TelemetryComponentType } from "../types/telemetryComponentType";

/**
 * Telemetry component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TelemetryComponentConfig =
	| {
			type: typeof TelemetryComponentType.Service;
			options?: ITelemetryServiceConstructorOptions;
	  }
	| {
			type: typeof TelemetryComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
