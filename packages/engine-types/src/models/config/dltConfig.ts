// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IIotaConfig } from "@twin.org/dlt-iota";
import type { IIotaStardustConfig } from "@twin.org/dlt-iota-stardust";
import type { DltConfigType } from "../types/dltConfigType";

/**
 * DLT config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type DltConfig =
	| {
			type: typeof DltConfigType.Iota;
			options?: {
				config?: IIotaConfig;
			};
	  }
	| {
			type: typeof DltConfigType.IotaStardust;
			options?: {
				config?: IIotaStardustConfig;
			};
	  };
