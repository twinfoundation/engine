// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { DltConfigType } from "@twin.org/engine-types";

/**
 * Mock configuration helpers for Gas Station testing
 * This module provides mock data and configuration helpers for testing
 * Gas Station configuration without requiring actual service connectivity.
 */

// Test configuration constants
export const TEST_NODE_ENDPOINT = "https://api.testnet.iota.cafe";
export const TEST_NETWORK = "testnet";
export const TEST_COIN_TYPE = "4218";

// Mock Gas Station configuration for testing
export const MOCK_GAS_STATION_CONFIG = {
	GAS_STATION_URL: "http://localhost:9527",
	GAS_STATION_AUTH_TOKEN: "dGVzdEF1dGhUb2tlbjEyMw==",
	GAS_STATION_ENABLED: "true",
	GAS_STATION_TIMEOUT_MS: "10000"
};

// Alternative mock configurations for different test scenarios
export const MOCK_GAS_STATION_DISABLED_CONFIG = {
	...MOCK_GAS_STATION_CONFIG,
	GAS_STATION_ENABLED: "false"
};

export const MOCK_GAS_STATION_CUSTOM_TIMEOUT_CONFIG = {
	...MOCK_GAS_STATION_CONFIG,
	GAS_STATION_TIMEOUT_MS: "5000"
};

/**
 * Creates a mock environment variables object for testing Gas Station configuration.
 * @param overrides - Environment variable overrides
 * @returns Mock environment variables object
 */
export function createMockEnvVars(overrides: { [key: string]: string } = {}): {
	[key: string]: string;
	iotaNodeEndpoint: string;
	iotaNetwork: string;
	iotaCoinType: string;
	iotaGasStationEndpoint: string;
	iotaGasStationAuthToken: string;
	iotaGasStationEnabled: string;
	iotaGasStationTimeoutMs: string;
} {
	return {
		iotaNodeEndpoint: TEST_NODE_ENDPOINT,
		iotaNetwork: TEST_NETWORK,
		iotaCoinType: TEST_COIN_TYPE,
		iotaGasStationEndpoint: MOCK_GAS_STATION_CONFIG.GAS_STATION_URL,
		iotaGasStationAuthToken: MOCK_GAS_STATION_CONFIG.GAS_STATION_AUTH_TOKEN,
		iotaGasStationEnabled: MOCK_GAS_STATION_CONFIG.GAS_STATION_ENABLED,
		iotaGasStationTimeoutMs: MOCK_GAS_STATION_CONFIG.GAS_STATION_TIMEOUT_MS,
		...overrides
	};
}

/**
 * Expected Gas Station configuration structure for validation
 */
export const EXPECTED_GAS_STATION_CONFIG = {
	gasStationUrl: MOCK_GAS_STATION_CONFIG.GAS_STATION_URL,
	gasStationAuthToken: MOCK_GAS_STATION_CONFIG.GAS_STATION_AUTH_TOKEN,
	enabled: true,
	timeoutMs: 10000
};

/**
 * Creates a mock Gas Station configuration object.
 * @param overrides - Partial configuration to override defaults
 * @returns Mock Gas Station configuration object
 */
export function mockGasStationConfig(
	overrides: Partial<typeof EXPECTED_GAS_STATION_CONFIG> = {}
): typeof EXPECTED_GAS_STATION_CONFIG {
	return {
		...EXPECTED_GAS_STATION_CONFIG,
		...overrides
	};
}

/**
 * Creates a mock IOTA configuration object.
 * @param overrides - Configuration overrides
 * @returns Mock IOTA configuration object
 */
export function mockIotaConfig(overrides: { [key: string]: unknown } = {}): {
	[key: string]: unknown;
	clientOptions: { url: string };
	network: string;
	coinType: number;
	gasStation: typeof EXPECTED_GAS_STATION_CONFIG;
} {
	return {
		clientOptions: {
			url: TEST_NODE_ENDPOINT
		},
		network: TEST_NETWORK,
		coinType: Number.parseInt(TEST_COIN_TYPE, 10),
		gasStation: mockGasStationConfig(),
		...overrides
	};
}

/**
 * Creates a mock DLT configuration object.
 * @param overrides - Configuration overrides
 * @returns Mock DLT configuration object
 */
export function mockDltConfig(overrides: { [key: string]: unknown } = {}): {
	[key: string]: unknown;
	type: string;
	isDefault: boolean;
	options: { config: ReturnType<typeof mockIotaConfig> };
} {
	return {
		type: DltConfigType.Iota,
		isDefault: true,
		options: {
			config: mockIotaConfig()
		},
		...overrides
	};
}

/**
 * Sets up mock environment variables for testing.
 * @param overrides - Environment variable overrides
 * @returns Mock environment variables object
 */
export function mockEngineEnvVars(
	overrides: { [key: string]: string } = {}
): ReturnType<typeof createMockEnvVars> {
	const mockEnvVars = createMockEnvVars(overrides);

	// Mock process.env for testing
	for (const [key, value] of Object.entries(mockEnvVars)) {
		process.env[key] = value;
	}

	return mockEnvVars;
}

/**
 * Validates the structure of a configuration object.
 * @param config - Configuration object to validate
 * @returns True if configuration structure is valid
 */
export function validateConfigStructure(config: unknown): boolean {
	try {
		return Boolean(
			config &&
				typeof config === "object" &&
				"type" in config &&
				"isDefault" in config &&
				"options" in config &&
				typeof (config as { options: unknown }).options === "object" &&
				(config as { options: { config: unknown } }).options &&
				"config" in (config as { options: { config: unknown } }).options
		);
	} catch {
		return false;
	}
}
