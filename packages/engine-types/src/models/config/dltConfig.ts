// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IIotaConfig } from "@twin.org/dlt-iota";
import type { IIotaRebasedConfig } from "@twin.org/dlt-iota-rebased";
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
			type: typeof DltConfigType.IotaRebased;
			options?: {
				config?: IIotaRebasedConfig;
			};
	  };
