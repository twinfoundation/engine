// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import path from "node:path";
import { GeneralError } from "@twin.org/core";
import dotenv from "dotenv";

console.debug("Setting up engine test environment from .env and .env.dev files");

dotenv.config({ path: [path.join(__dirname, ".env"), path.join(__dirname, ".env.dev")] });

// IOTA Node configuration
export const TEST_NODE_ENDPOINT = process.env.iotaNodeEndpoint ?? "https://api.testnet.iota.cafe";
export const TEST_FAUCET_ENDPOINT =
	process.env.iotaFaucetEndpoint ?? "https://faucet.testnet.iota.cafe";
export const TEST_NETWORK = process.env.iotaNetwork ?? "testnet";
export const TEST_COIN_TYPE = process.env.iotaCoinType ?? "4218";
export const TEST_EXPLORER_URL = process.env.iotaExplorerEndpoint ?? "https://explorer.iota.org/";

// Gas Station configuration
export const GAS_STATION_URL = process.env.iotaGasStationEndpoint ?? "http://localhost:9527";
export const GAS_STATION_AUTH_TOKEN =
	process.env.iotaGasStationAuthToken ?? "qEyCL6d9BKKFl/tfDGAKeGFkhUlf7FkqiGV7Xw4JUsI=";
export const GAS_STATION_ENABLED = process.env.iotaGasStationEnabled ?? "true";
export const GAS_STATION_TIMEOUT_MS = process.env.iotaGasStationTimeoutMs ?? "10000";

console.debug("Test environment configuration:");
console.debug(`- Node Endpoint: ${TEST_NODE_ENDPOINT}`);
console.debug(`- Network: ${TEST_NETWORK}`);
console.debug(`- Gas Station URL: ${GAS_STATION_URL}`);
console.debug(`- Gas Station Enabled: ${GAS_STATION_ENABLED}`);

/**
 * Validates that the Gas Station is accessible.
 * @returns Promise that resolves if Gas Station is available, rejects otherwise.
 */
export async function validateGasStationConnectivity(): Promise<void> {
	const timeoutMs = Number.parseInt(GAS_STATION_TIMEOUT_MS, 10);

	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

		const response = await fetch(GAS_STATION_URL, {
			method: "GET",
			signal: controller.signal
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			throw new GeneralError("GasStationConnectivity", "gasStationNotAvailable", undefined, {
				status: response.status,
				statusText: response.statusText
			});
		}

		console.debug("✅ Gas Station connectivity validated");
	} catch (error) {
		console.error("❌ Gas Station connectivity failed:", error);
		if (error instanceof GeneralError) {
			throw error;
		}
		throw new GeneralError("GasStationConnectivity", "gasStationConnectionFailed", undefined, {
			url: GAS_STATION_URL,
			error: (error as Error).message
		});
	}
}

/**
 * Setup function to be called before integration tests.
 */
export async function setupTestEnv(): Promise<void> {
	console.debug("Setting up test environment...");

	// Validate Gas Station connectivity for integration tests
	await validateGasStationConnectivity();

	console.debug("✅ Test environment setup complete");
}
