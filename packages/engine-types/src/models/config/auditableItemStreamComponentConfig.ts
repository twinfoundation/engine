// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuditableItemStreamServiceConstructorOptions } from "@twin.org/auditable-item-stream-service";
import type { AuditableItemStreamComponentType } from "../types/auditableItemStreamComponentType";

/**
 * Auditable item stream component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AuditableItemStreamComponentConfig = {
	type: typeof AuditableItemStreamComponentType.Service;
	options?: IAuditableItemStreamServiceConstructorOptions;
};
