// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineCoreConfig } from "../src/models/config/IEngineCoreConfig";
import type { IEngineServerConfig } from "../src/models/config/IEngineServerConfig";
import { BlobStorageConnectorType } from "../src/models/types/blobStorageConnectorType";
import { EntityStorageConnectorType } from "../src/models/types/entityStorageConnectorType";
import { RestRouteProcessorType } from "../src/models/types/restRouteProcessorType";

describe("engine-models", () => {
	test("Can construct an engine core config", async () => {
		const coreConfig: IEngineCoreConfig = {
			entityStorageConnector: [
				{
					type: EntityStorageConnectorType.File,
					options: {
						config: {
							directory: "./data"
						}
					}
				}
			],
			blobStorageConnector: [
				{
					type: BlobStorageConnectorType.File,
					options: {
						config: {
							directory: "./data"
						}
					}
				}
			]
		};
		expect(coreConfig).toBeDefined();
	});

	test("Can construct an engine server config", async () => {
		const serverConfig: IEngineServerConfig = {
			restRouteProcessor: [
				{
					type: RestRouteProcessorType.AuthHeader,
					options: {}
				}
			]
		};
		expect(serverConfig).toBeDefined();
	});
});
