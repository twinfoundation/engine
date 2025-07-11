// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineCoreTypeBaseConfig } from "./config/IEngineCoreTypeBaseConfig";
import type { IEngineCore } from "./IEngineCore";
import type { IEngineCoreContext } from "./IEngineCoreContext";

/**
 * Method definition for the engine type initialiser.
 */
export type EngineTypeInitialiser<T extends IEngineCoreTypeBaseConfig = IEngineCoreTypeBaseConfig> =
	(
		engineCore: IEngineCore,
		context: IEngineCoreContext,
		instanceConfig: T,
		overrideInstanceType?: string
	) => string | undefined;
