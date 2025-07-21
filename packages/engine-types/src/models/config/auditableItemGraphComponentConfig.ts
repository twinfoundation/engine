// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IAuditableItemGraphServiceConstructorOptions } from "@twin.org/auditable-item-graph-service";
import type { AuditableItemGraphComponentType } from "../types/auditableItemGraphComponentType";

/**
 * Auditable item graph component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AuditableItemGraphComponentConfig =
	| {
			type: typeof AuditableItemGraphComponentType.Service;
			options?: IAuditableItemGraphServiceConstructorOptions;
	  }
	| {
			type: typeof AuditableItemGraphComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
