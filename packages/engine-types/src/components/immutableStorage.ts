// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, I18n } from "@twin.org/core";
import type { IEngineCoreContext, IEngineCore } from "@twin.org/engine-models";
import {
	EntityStorageImmutableStorageConnector,
	initSchema as initSchemaImmutableStorageStorage,
	type ImmutableItem
} from "@twin.org/immutable-storage-connector-entity-storage";
import { IotaImmutableStorageConnector } from "@twin.org/immutable-storage-connector-iota";
import { IotaRebasedImmutableStorageConnector } from "@twin.org/immutable-storage-connector-iota-rebased";
import {
	ImmutableStorageConnectorFactory,
	type IImmutableStorageConnector
} from "@twin.org/immutable-storage-models";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { ImmutableStorageConnectorConfig } from "../models/config/immutableStorageConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { ImmutableStorageConnectorType } from "../models/types/immutableStorageConnectorType";

/**
 * Initialise the immutable storage connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseImmutableStorageConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: ImmutableStorageConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Immutable Storage Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IImmutableStorageConnector;
	let instanceType: string;
	if (type === ImmutableStorageConnectorType.Iota) {
		const dltConfig = context.config.types.dltConfig?.find(
			dlt => dlt.type === context.defaultTypes.dltConfig
		);
		connector = new IotaImmutableStorageConnector({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaImmutableStorageConnector.NAMESPACE;
	} else if (type === ImmutableStorageConnectorType.IotaRebased) {
		const dltConfig = context.config.types.dltConfig?.find(
			dlt => dlt.type === context.defaultTypes.dltConfig
		);
		connector = new IotaRebasedImmutableStorageConnector({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaRebasedImmutableStorageConnector.NAMESPACE;
	} else if (type === ImmutableStorageConnectorType.EntityStorage) {
		initSchemaImmutableStorageStorage();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.immutableStorageEntityStorageType,
			nameof<ImmutableItem>()
		);
		connector = new EntityStorageImmutableStorageConnector(instanceConfig.options);
		instanceType = EntityStorageImmutableStorageConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "immutableStorageConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component: connector
	});
	ImmutableStorageConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}
