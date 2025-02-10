// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { EntityStorageFaucetConnector } from "@twin.org/wallet-connector-entity-storage";
import { IotaFaucetConnector } from "@twin.org/wallet-connector-iota";
import { IotaStardustFaucetConnector } from "@twin.org/wallet-connector-iota-stardust";
import { FaucetConnectorFactory, type IFaucetConnector } from "@twin.org/wallet-models";
import type { FaucetConnectorConfig } from "../models/config/faucetConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { FaucetConnectorType } from "../models/types/faucetConnectorType";

/**
 * Initialise a faucet connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseFaucetConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: FaucetConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Faucet Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;

	let connector: IFaucetConnector;
	let instanceType: string;

	if (type === FaucetConnectorType.IotaStardust) {
		const dltConfig = context.config.types.dltConfig?.find(
			dlt => dlt.type === context.defaultTypes.dltConfig
		);
		connector = new IotaStardustFaucetConnector({
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaStardustFaucetConnector.NAMESPACE;
	} else if (type === FaucetConnectorType.Iota) {
		const dltConfig = context.config.types.dltConfig?.find(
			dlt => dlt.type === context.defaultTypes.dltConfig
		);
		connector = new IotaFaucetConnector({
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaFaucetConnector.NAMESPACE;
	} else if (type === FaucetConnectorType.EntityStorage) {
		connector = new EntityStorageFaucetConnector(instanceConfig.options);
		instanceType = EntityStorageFaucetConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "faucetConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component: connector
	});
	FaucetConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}
