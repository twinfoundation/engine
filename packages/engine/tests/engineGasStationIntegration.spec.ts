// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { DltConfigType } from "@twin.org/engine-types";
import {
	setupTestEnv,
	validateGasStationConnectivity,
	GAS_STATION_URL,
	GAS_STATION_AUTH_TOKEN,
	GAS_STATION_ENABLED,
	GAS_STATION_TIMEOUT_MS,
	TEST_NODE_ENDPOINT,
	TEST_NETWORK,
	TEST_COIN_TYPE
} from "./setupTestEnv";
import type { IEngineEnvironmentVariables } from "../src/models/IEngineEnvironmentVariables";
import { buildEngineConfiguration } from "../src/utils/engineEnvBuilder";

describe("Engine Gas Station Integration", () => {
	beforeAll(async () => {
		// Setup test environment and validate Gas Station connectivity
		await setupTestEnv();
	}, 30000);

	describe("Gas Station Connectivity", () => {
		test("should successfully connect to Gas Station", async () => {
			await expect(validateGasStationConnectivity()).resolves.not.toThrow();
		}, 10000);

		test("should have valid Gas Station configuration", () => {
			expect(GAS_STATION_URL).toBeDefined();
			expect(GAS_STATION_AUTH_TOKEN).toBeDefined();
			expect(GAS_STATION_ENABLED).toBe("true");
			expect(Number.parseInt(GAS_STATION_TIMEOUT_MS, 10)).toBeGreaterThan(0);
		});
	});

	describe("IOTA DLT Configuration Integration", () => {
		test("should create IOTA DLT configuration with live Gas Station", async () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: TEST_NODE_ENDPOINT,
				iotaNetwork: TEST_NETWORK,
				iotaCoinType: TEST_COIN_TYPE,
				iotaGasStationEndpoint: GAS_STATION_URL,
				iotaGasStationAuthToken: GAS_STATION_AUTH_TOKEN,
				iotaGasStationEnabled: GAS_STATION_ENABLED,
				iotaGasStationTimeoutMs: GAS_STATION_TIMEOUT_MS
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);

			expect(config.types.dltConfig).toBeDefined();
			expect(config.types.dltConfig).toHaveLength(1);

			const iotaConfig = config.types.dltConfig?.[0];
			expect(iotaConfig?.type).toBe(DltConfigType.Iota);
			expect(iotaConfig?.isDefault).toBe(true);
			expect(iotaConfig?.options?.config?.gasStation).toBeDefined();
			expect(iotaConfig?.options?.config?.gasStation?.gasStationUrl).toBe(GAS_STATION_URL);
			expect(iotaConfig?.options?.config?.gasStation?.gasStationAuthToken).toBe(
				GAS_STATION_AUTH_TOKEN
			);

			// Verify the Gas Station URL is actually accessible
			const gasStationUrl = iotaConfig?.options?.config?.gasStation?.gasStationUrl;
			expect(gasStationUrl).toBeDefined();
			const response = await fetch(gasStationUrl as string, {
				method: "GET"
			});
			expect(response.ok).toBe(true);
		}, 15000);

		test("should handle Gas Station configuration with different timeout values", async () => {
			const customTimeout = "5000";
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: TEST_NODE_ENDPOINT,
				iotaNetwork: TEST_NETWORK,
				iotaGasStationEndpoint: GAS_STATION_URL,
				iotaGasStationAuthToken: GAS_STATION_AUTH_TOKEN,
				iotaGasStationEnabled: "true",
				iotaGasStationTimeoutMs: customTimeout
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);
			const iotaConfig = config.types.dltConfig?.[0];

			expect(
				(iotaConfig?.options?.config?.gasStation as unknown as { timeoutMs: number })?.timeoutMs
			).toBe(5000);

			// Verify the Gas Station responds within the configured timeout
			const startTime = Date.now();
			const response = await fetch(GAS_STATION_URL, {
				method: "GET",
				signal: AbortSignal.timeout(5000)
			});
			const elapsed = Date.now() - startTime;

			expect(response.ok).toBe(true);
			expect(elapsed).toBeLessThan(5000);
		}, 10000);

		test("should create IOTA DLT configuration with Gas Station disabled", async () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: TEST_NODE_ENDPOINT,
				iotaNetwork: TEST_NETWORK,
				iotaGasStationEndpoint: GAS_STATION_URL,
				iotaGasStationAuthToken: GAS_STATION_AUTH_TOKEN,
				iotaGasStationEnabled: "false"
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);
			const iotaConfig = config.types.dltConfig?.[0];

			expect(iotaConfig?.options?.config?.gasStation).toBeDefined();
			expect(
				(iotaConfig?.options?.config?.gasStation as unknown as { enabled: boolean })?.enabled
			).toBe(false);

			// Even when disabled, the URL should still be accessible for validation
			const response = await fetch(GAS_STATION_URL, { method: "GET" });
			expect(response.ok).toBe(true);
		}, 10000);
	});

	describe("Centralized Configuration Validation", () => {
		test("should extract IOTA config from centralized DLT config with live Gas Station", async () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: TEST_NODE_ENDPOINT,
				iotaNetwork: TEST_NETWORK,
				iotaCoinType: TEST_COIN_TYPE,
				iotaGasStationEndpoint: GAS_STATION_URL,
				iotaGasStationAuthToken: GAS_STATION_AUTH_TOKEN,
				iotaGasStationEnabled: GAS_STATION_ENABLED,
				iotaGasStationTimeoutMs: GAS_STATION_TIMEOUT_MS
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);

			// Test that the helper extracts the config correctly
			const dltConfig = config.types.dltConfig?.find(
				dltItem => dltItem.type === DltConfigType.Iota && dltItem.isDefault
			);
			const iotaConfig = dltConfig?.options?.config;

			expect(iotaConfig).toBeDefined();
			expect(iotaConfig?.clientOptions?.url).toBe(TEST_NODE_ENDPOINT);
			expect(iotaConfig?.network).toBe(TEST_NETWORK);
			expect(iotaConfig?.coinType).toBe(Number.parseInt(TEST_COIN_TYPE, 10));
			expect(iotaConfig?.gasStation?.gasStationUrl).toBe(GAS_STATION_URL);
			expect(iotaConfig?.gasStation?.gasStationAuthToken).toBe(GAS_STATION_AUTH_TOKEN);

			// Verify the extracted configuration works with the real Gas Station
			const gasStationUrl = iotaConfig?.gasStation?.gasStationUrl;
			expect(gasStationUrl).toBeDefined();
			const response = await fetch(gasStationUrl as string, {
				method: "GET"
			});
			expect(response.ok).toBe(true);
		}, 10000);

		test("should use centralized IOTA config for all IOTA-related connectors", async () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: TEST_NODE_ENDPOINT,
				iotaNetwork: TEST_NETWORK,
				iotaCoinType: TEST_COIN_TYPE,
				iotaGasStationEndpoint: GAS_STATION_URL,
				iotaGasStationAuthToken: GAS_STATION_AUTH_TOKEN,
				iotaGasStationEnabled: GAS_STATION_ENABLED,
				iotaGasStationTimeoutMs: GAS_STATION_TIMEOUT_MS
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);

			// Verify we have exactly one IOTA DLT config that serves as the centralized source
			const iotaConfigs = config.types.dltConfig?.filter(
				dltItem => dltItem.type === DltConfigType.Iota
			);
			expect(iotaConfigs).toHaveLength(1);
			expect(iotaConfigs?.[0]?.isDefault).toBe(true);

			// Verify the centralized config has all required properties
			const centralizedConfig = iotaConfigs?.[0]?.options?.config;
			expect(centralizedConfig?.clientOptions?.url).toBeTruthy();
			expect(centralizedConfig?.network).toBeTruthy();
			expect(centralizedConfig?.gasStation?.gasStationUrl).toBeTruthy();
			expect(centralizedConfig?.gasStation?.gasStationAuthToken).toBeTruthy();

			// Validate that the Gas Station URL from centralized config is accessible
			const gasStationUrl = centralizedConfig?.gasStation?.gasStationUrl;
			expect(gasStationUrl).toBeDefined();
			const response = await fetch(gasStationUrl as string, {
				method: "GET"
			});
			expect(response.ok).toBe(true);
		}, 10000);
	});
});
