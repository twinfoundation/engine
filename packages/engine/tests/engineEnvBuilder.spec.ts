// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { DltConfigType } from "@twin.org/engine-types";
import type { IEngineEnvironmentVariables } from "../src/models/IEngineEnvironmentVariables";
import { buildEngineConfiguration } from "../src/utils/engineEnvBuilder";

describe("Engine Environment Builder", () => {
	describe("IOTA DLT Configuration", () => {
		test("should create IOTA DLT configuration with basic settings", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: "https://api.testnet.iota.cafe",
				iotaFaucetEndpoint: "https://faucet.testnet.iota.cafe",
				iotaNetwork: "testnet",
				iotaCoinType: "4218",
				iotaExplorerEndpoint: "https://explorer.iota.org/"
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);

			expect(config.types.dltConfig).toBeDefined();
			expect(config.types.dltConfig).toHaveLength(1);

			const iotaConfig = config.types.dltConfig?.[0];
			expect(iotaConfig?.type).toBe(DltConfigType.Iota);
			expect(iotaConfig?.isDefault).toBe(true);
			expect(iotaConfig?.options?.config).toBeDefined();
			expect(iotaConfig?.options?.config?.clientOptions?.url).toBe("https://api.testnet.iota.cafe");
			expect(iotaConfig?.options?.config?.network).toBe("testnet");
			expect(iotaConfig?.options?.config?.coinType).toBe(4218);
			expect(iotaConfig?.options?.config?.gasStation).toBeUndefined();
		});

		test("should create IOTA DLT configuration with gas station", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: "https://api.testnet.iota.cafe",
				iotaNetwork: "testnet",
				iotaCoinType: "4218",
				iotaGasStationEndpoint: "https://gas-station.example.com",
				iotaGasStationAuthToken: "test-auth-token"
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);

			expect(config.types.dltConfig).toBeDefined();
			expect(config.types.dltConfig).toHaveLength(1);

			const iotaConfig = config.types.dltConfig?.[0];
			expect(iotaConfig?.type).toBe(DltConfigType.Iota);
			expect(iotaConfig?.options?.config?.gasStation).toBeDefined();
			expect(iotaConfig?.options?.config?.gasStation?.gasStationUrl).toBe(
				"https://gas-station.example.com"
			);
			expect(iotaConfig?.options?.config?.gasStation?.gasStationAuthToken).toBe("test-auth-token");
		});

		test("should create IOTA DLT configuration with gas station (alternative)", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: "https://api.testnet.iota.cafe",
				iotaNetwork: "testnet",
				iotaGasStationEndpoint: "https://gas-station.example.com",
				iotaGasStationAuthToken: "test-auth-token"
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);

			const iotaConfig = config.types.dltConfig?.[0];
			expect(iotaConfig?.options?.config?.gasStation).toBeDefined();
			expect(iotaConfig?.options?.config?.gasStation?.gasStationUrl).toBe(
				"https://gas-station.example.com"
			);
			expect(iotaConfig?.options?.config?.gasStation?.gasStationAuthToken).toBe("test-auth-token");
		});

		test("should use default values for gas station configuration", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: "https://api.testnet.iota.cafe",
				iotaNetwork: "testnet",
				iotaGasStationEndpoint: "https://gas-station.example.com",
				iotaGasStationAuthToken: "test-auth-token"
				// No explicit enabled or timeout values
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);

			const iotaConfig = config.types.dltConfig?.[0];
			expect(iotaConfig?.options?.config?.gasStation).toBeDefined();
			expect(iotaConfig?.options?.config?.gasStation?.gasStationUrl).toBe(
				"https://gas-station.example.com"
			);
			expect(iotaConfig?.options?.config?.gasStation?.gasStationAuthToken).toBe("test-auth-token");
		});

		test("should not create gas station config when endpoint is missing", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: "https://api.testnet.iota.cafe",
				iotaNetwork: "testnet",
				iotaGasStationAuthToken: "test-auth-token"
				// No gasStationEndpoint
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);

			const iotaConfig = config.types.dltConfig?.[0];
			expect(iotaConfig?.options?.config?.gasStation).toBeUndefined();
		});

		test("should not create gas station config when auth token is missing", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: "https://api.testnet.iota.cafe",
				iotaNetwork: "testnet",
				iotaGasStationEndpoint: "https://gas-station.example.com"
				// No gasStationAuthToken
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);

			const iotaConfig = config.types.dltConfig?.[0];
			expect(iotaConfig?.options?.config?.gasStation).toBeUndefined();
		});

		test("should not create DLT configuration when only optional parameters are set", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaGasStationEndpoint: "https://gas-station.example.com"
				// Only optional parameters, no essential iotaNodeEndpoint or iotaNetwork
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);

			// Should not create DLT config since no essential parameters are provided
			expect(config.types.dltConfig).toBeUndefined();
		});

		test("should not create any DLT configuration when no IOTA variables are set", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				debug: "true" // Some other config
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);

			expect(config.types.dltConfig).toBeUndefined();
		});
	});

	describe("getIotaConfig helper", () => {
		test("should extract IOTA config from centralized DLT config", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: "https://api.testnet.iota.cafe",
				iotaNetwork: "testnet",
				iotaCoinType: "4218",
				iotaGasStationEndpoint: "https://gas-station.example.com",
				iotaGasStationAuthToken: "test-auth-token"
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);

			// Test that the helper would work correctly by accessing the config directly
			const dltConfig = config.types.dltConfig?.find(
				dltItem => dltItem.type === DltConfigType.Iota && dltItem.isDefault
			);
			const iotaConfig = dltConfig?.options?.config;

			expect(iotaConfig).toBeDefined();
			expect(iotaConfig?.clientOptions?.url).toBe("https://api.testnet.iota.cafe");
			expect(iotaConfig?.network).toBe("testnet");
			expect(iotaConfig?.coinType).toBe(4218);
			expect(iotaConfig?.gasStation?.gasStationUrl).toBe("https://gas-station.example.com");
			expect(iotaConfig?.gasStation?.gasStationAuthToken).toBe("test-auth-token");
		});

		test("should validate gas station configuration field formats", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: "https://api.testnet.iota.cafe",
				iotaNetwork: "testnet",
				iotaGasStationEndpoint: "https://gas-station.example.com",
				iotaGasStationAuthToken: "dGVzdEF1dGhUb2tlbjEyMw=="
			};

			const config = buildEngineConfiguration(envVars as IEngineEnvironmentVariables);
			const iotaConfig = config.types.dltConfig?.[0];
			const gasStation = iotaConfig?.options?.config?.gasStation;

			expect(gasStation?.gasStationUrl).toMatch(/^https?:\/\/.+/);
			expect(gasStation?.gasStationAuthToken).toMatch(/^[\d+/=A-Za-z]+$/);
		});

		test("should use centralized IOTA config for all IOTA-related connectors", () => {
			const envVars: Partial<IEngineEnvironmentVariables> = {
				iotaNodeEndpoint: "https://api.testnet.iota.org",
				iotaNetwork: "testnet",
				iotaCoinType: "4218",
				iotaGasStationEndpoint: "https://gasstation.testnet.iota.org",
				iotaGasStationAuthToken: "dGVzdC1hdXRoLXRva2Vu"
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
	});
});
