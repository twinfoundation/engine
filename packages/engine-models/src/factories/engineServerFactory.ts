// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Factory } from "@twin.org/core";
import type { IEngineServer } from "../models/IEngineServer";

/**
 * Factory for creating engine servers.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EngineServerFactory = Factory.createFactory<IEngineServer>("engine-server");
