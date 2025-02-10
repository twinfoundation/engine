// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import {
	EntityStorageWalletConnector,
	initSchema as initSchemaWallet,
	type WalletAddress
} from "@twin.org/wallet-connector-entity-storage";
import { IotaWalletConnector } from "@twin.org/wallet-connector-iota";
import { IotaStardustWalletConnector } from "@twin.org/wallet-connector-iota-stardust";
import { WalletConnectorFactory, type IWalletConnector } from "@twin.org/wallet-models";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { WalletConnectorConfig } from "../models/config/walletConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { WalletConnectorType } from "../models/types/walletConnectorType";

/**
 * Initialise a wallet connector.
 * @param engineCore The engine core.
 * @param context The context for the node.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseWalletConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: WalletConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Wallet Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IWalletConnector;
	let instanceType: string;

	if (type === WalletConnectorType.IotaStardust) {
		const dltConfig = context.config.types.dltConfig?.find(
			dlt => dlt.type === context.defaultTypes.dltConfig
		);
		connector = new IotaStardustWalletConnector({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			faucetConnectorType: context.defaultTypes.faucetConnector,
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaStardustWalletConnector.NAMESPACE;
	} else if (type === WalletConnectorType.Iota) {
		const dltConfig = context.config.types.dltConfig?.find(
			dlt => dlt.type === context.defaultTypes.dltConfig
		);
		connector = new IotaWalletConnector({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			faucetConnectorType: context.defaultTypes.faucetConnector,
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaWalletConnector.NAMESPACE;
	} else if (type === WalletConnectorType.EntityStorage) {
		connector = new EntityStorageWalletConnector({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			faucetConnectorType: context.defaultTypes.faucetConnector,
			...instanceConfig.options
		});
		instanceType = EntityStorageWalletConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "walletConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component: connector
	});
	WalletConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the wallet storage.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns Nothing.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseWalletStorage(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: WalletConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	const type = instanceConfig.type;
	if (type === WalletConnectorType.Iota) {
		// No storage required for IOTA wallet connector.
	} else if (type === WalletConnectorType.EntityStorage) {
		initSchemaWallet();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.walletAddressEntityStorageType,
			nameof<WalletAddress>()
		);
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "walletConnector"
		});
	}
	return undefined;
}
