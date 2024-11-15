// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuditableItemGraphServiceConfig } from "@twin.org/auditable-item-graph-service";
import type { AuditableItemGraphComponentType } from "../../types/auditableItemGraphComponentType";

/**
 * Auditable item graph component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AuditableItemGraphComponentConfig = {
	type: typeof AuditableItemGraphComponentType.Service;
	options?: {
		immutableProofComponentType?: string;
		vertexEntityStorageType?: string;
		changesetEntityStorageType?: string;
		config?: IAuditableItemGraphServiceConfig;
	};
};
