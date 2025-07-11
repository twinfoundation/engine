// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineCoreTypeBaseConfig } from "./IEngineCoreTypeBaseConfig";

/**
 * Configuration for the engine core type.
 */
export type IEngineCoreTypeConfig<T extends IEngineCoreTypeBaseConfig = { type: string }> = T & {
	[id: string]: unknown;
	overrideInstanceType?: string;
	isDefault?: boolean;
};
