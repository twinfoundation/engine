// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import {
	EntityStorageNftConnector,
	initSchema,
	type Nft
} from "@twin.org/nft-connector-entity-storage";
import { IotaNftConnector } from "@twin.org/nft-connector-iota";
import { NftConnectorFactory, type INftComponent, type INftConnector } from "@twin.org/nft-models";
import { NftService } from "@twin.org/nft-service";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { NftComponentConfig } from "../models/config/nftComponentConfig.js";
import type { NftConnectorConfig } from "../models/config/nftConnectorConfig.js";
import type { IEngineCoreTypesConfig } from "../models/IEngineCoreTypesConfig.js";
import { NftComponentType } from "../models/types/nftComponentType.js";
import { NftConnectorType } from "../models/types/nftConnectorType.js";

/**
 * Initialise the NFT connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseNftConnector(
	engineCore: IEngineCore<IEngineCoreTypesConfig>,
	context: IEngineCoreContext<IEngineCoreTypesConfig>,
	instanceConfig: NftConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `NFT Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: INftConnector;
	let instanceType: string;

	if (type === NftConnectorType.EntityStorage) {
		initSchema();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.nftEntityStorageType,
			nameof<Nft>()
		);
		connector = new EntityStorageNftConnector(instanceConfig.options);
		instanceType = EntityStorageNftConnector.NAMESPACE;
	} else if (type === NftConnectorType.Iota) {
		connector = new IotaNftConnector({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			...instanceConfig.options
		});
		instanceType = IotaNftConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "nftConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component: connector
	});
	NftConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the NFT component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseNftComponent(
	engineCore: IEngineCore<IEngineCoreTypesConfig>,
	context: IEngineCoreContext<IEngineCoreTypesConfig>,
	instanceConfig: NftComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Nft Storage Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: INftComponent;
	let instanceType: string;

	if (type === NftComponentType.Service) {
		component = new NftService(instanceConfig.options);
		instanceType = NftService.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "nftComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component
	});
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
