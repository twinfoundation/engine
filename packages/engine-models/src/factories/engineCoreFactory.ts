// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Factory } from "@twin.org/core";
import type { IEngineCore } from "../models/IEngineCore";

/**
 * Factory for creating engine cores.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EngineCoreFactory = Factory.createFactory<IEngineCore>("engine-core");
