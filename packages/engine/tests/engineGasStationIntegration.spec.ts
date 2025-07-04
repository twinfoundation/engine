// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { DltConfigType } from "@twin.org/engine-types";
import {
	mockGasStationConfig,
	mockEngineEnvVars,
	mockDltConfig,
	validateConfigStructure
} from "./setupTestEnv";
import type { IEngineEnvironmentVariables } from "../src/models/IEngineEnvironmentVariables";
import { buildEngineConfiguration } from "../src/utils/engineEnvBuilder";

describe("Engine Gas Station Configuration", () => {
	beforeAll(() => {
		// Setup test environment with mock configurations
		mockEngineEnvVars();
	});

	describe("Gas Station Configuration Validation", () => {
		test("should validate Gas Station configuration structure", () => {
			const gasStationConfig = mockGasStationConfig();

			expect(gasStationConfig.gasStationUrl).toBeDefined();
			expect(gasStationConfig.gasStationAuthToken).toBeDefined();
			expect(gasStationConfig.enabled).toBe(true);
			expect(gasStationConfig.timeoutMs).toBeGreaterThan(0);
		});

		test("should validate required Gas Station configuration fields", () => {
			const gasStationConfig = mockGasStationConfig();

			expect(gasStationConfig.gasStationUrl).toMatch(/^https?:\/\/.+/);
			expect(gasStationConfig.gasStationAuthToken).toMatch(/^[\d+/=A-Za-z]+$/);
			expect(typeof gasStationConfig.enabled).toBe("boolean");
			expect(typeof gasStationConfig.timeoutMs).toBe("number");
		});
	});

	describe("IOTA DLT Configuration Integration", () => {
		test("should create IOTA DLT configuration with Gas Station enabled", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: "https://api.testnet.iota.org",
				iotaNetwork: "testnet",
				iotaCoinType: "4218",
				iotaGasStationEndpoint: "https://gasstation.testnet.iota.org",
				iotaGasStationAuthToken: "dGVzdC1hdXRoLXRva2Vu",
				iotaGasStationEnabled: "true",
				iotaGasStationTimeoutMs: "10000"
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);

			expect(config.types.dltConfig).toBeDefined();
			expect(config.types.dltConfig).toHaveLength(1);

			const iotaConfig = config.types.dltConfig?.[0];
			expect(iotaConfig?.type).toBe(DltConfigType.Iota);
			expect(iotaConfig?.isDefault).toBe(true);
			expect(iotaConfig?.options?.config?.gasStation).toBeDefined();
			expect(iotaConfig?.options?.config?.gasStation?.gasStationUrl).toBe(
				"https://gasstation.testnet.iota.org"
			);
			expect(iotaConfig?.options?.config?.gasStation?.gasStationAuthToken).toBe(
				"dGVzdC1hdXRoLXRva2Vu"
			);
		});

		test("should handle Gas Station configuration with different timeout values", () => {
			const customTimeout = "5000";
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: "https://api.testnet.iota.org",
				iotaNetwork: "testnet",
				iotaGasStationEndpoint: "https://gasstation.testnet.iota.org",
				iotaGasStationAuthToken: "dGVzdC1hdXRoLXRva2Vu",
				iotaGasStationEnabled: "true",
				iotaGasStationTimeoutMs: customTimeout
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);
			const iotaConfig = config.types.dltConfig?.[0];

			expect(
				(iotaConfig?.options?.config?.gasStation as unknown as { timeoutMs: number })?.timeoutMs
			).toBe(5000);
		});

		test("should create IOTA DLT configuration with Gas Station disabled", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: "https://api.testnet.iota.org",
				iotaNetwork: "testnet",
				iotaGasStationEndpoint: "https://gasstation.testnet.iota.org",
				iotaGasStationAuthToken: "dGVzdC1hdXRoLXRva2Vu",
				iotaGasStationEnabled: "false"
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);
			const iotaConfig = config.types.dltConfig?.[0];

			expect(iotaConfig?.options?.config?.gasStation).toBeDefined();
			expect(
				(iotaConfig?.options?.config?.gasStation as unknown as { enabled: boolean })?.enabled
			).toBe(false);
		});
	});

	describe("Centralized Configuration Validation", () => {
		test("should extract IOTA config from centralized DLT config", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: "https://api.testnet.iota.org",
				iotaNetwork: "testnet",
				iotaCoinType: "4218",
				iotaGasStationEndpoint: "https://gasstation.testnet.iota.org",
				iotaGasStationAuthToken: "dGVzdC1hdXRoLXRva2Vu",
				iotaGasStationEnabled: "true",
				iotaGasStationTimeoutMs: "10000"
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);

			// Test that the helper extracts the config correctly
			const dltConfig = config.types.dltConfig?.find(
				dltItem => dltItem.type === DltConfigType.Iota && dltItem.isDefault
			);
			const iotaConfig = dltConfig?.options?.config;

			expect(iotaConfig).toBeDefined();
			expect(iotaConfig?.clientOptions?.url).toBe("https://api.testnet.iota.org");
			expect(iotaConfig?.network).toBe("testnet");
			expect(iotaConfig?.coinType).toBe(4218);
			expect(iotaConfig?.gasStation?.gasStationUrl).toBe("https://gasstation.testnet.iota.org");
			expect(iotaConfig?.gasStation?.gasStationAuthToken).toBe("dGVzdC1hdXRoLXRva2Vu");
		});

		test("should use centralized IOTA config for all IOTA-related connectors", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: "https://api.testnet.iota.org",
				iotaNetwork: "testnet",
				iotaCoinType: "4218",
				iotaGasStationEndpoint: "https://gasstation.testnet.iota.org",
				iotaGasStationAuthToken: "dGVzdC1hdXRoLXRva2Vu",
				iotaGasStationEnabled: "true",
				iotaGasStationTimeoutMs: "10000"
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
		});

		test("should validate configuration structure with mock helpers", () => {
			const mockConfig = mockDltConfig();

			expect(validateConfigStructure(mockConfig)).toBe(true);
			expect(mockConfig.type).toBe(DltConfigType.Iota);
			expect(mockConfig.isDefault).toBe(true);
			expect(mockConfig.options?.config?.gasStation).toBeDefined();
		});
	});
});
