// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineCoreConfig } from "../src/models/config/IEngineCoreConfig";

describe("engine-models", () => {
	test("Can construct an engine core config", async () => {
		const coreConfig: IEngineCoreConfig = {
			types: {}
		};
		expect(coreConfig).toBeDefined();
	});
});
