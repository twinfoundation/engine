// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { I18n } from "@twin.org/core";
import { EngineCore } from "../src/engineCore";
import { MemoryStateStorage } from "../src/storage/memoryStateStorage";

describe("engine-core", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", await import("../locales/en.json"));
	});

	test("Can start engine core with no config", async () => {
		const engine = new EngineCore();
		await engine.start();
		await engine.stop();

		expect(engine).toBeDefined();
	});

	test("Can start engine core with config and custom bootstrap", async () => {
		let calledCustomBootstrap = false;

		const engine = new EngineCore({
			config: {
				debug: true
			},
			stateStorage: new MemoryStateStorage(),
			customBootstrap: async () => {
				calledCustomBootstrap = true;
			}
		});
		await engine.start();
		await engine.stop();

		expect(engine).toBeDefined();
		expect(calledCustomBootstrap).toBeDefined();
	});
});
