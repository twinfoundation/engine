// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import {
	EntityStorageVaultConnector,
	initSchema,
	type VaultKey,
	type VaultSecret
} from "@twin.org/vault-connector-entity-storage";
import { HashicorpVaultConnector } from "@twin.org/vault-connector-hashicorp";
import { VaultConnectorFactory, type IVaultConnector } from "@twin.org/vault-models";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { VaultConnectorConfig } from "../models/config/vaultConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { VaultConnectorType } from "../models/types/vaultConnectorType";

/**
 * Initialise the vault connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseVaultConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: VaultConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Vault Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IVaultConnector;
	let instanceType: string;

	if (type === VaultConnectorType.EntityStorage) {
		initSchema();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.vaultKeyEntityStorageType,
			nameof<VaultKey>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.vaultSecretEntityStorageType,
			nameof<VaultSecret>()
		);
		connector = new EntityStorageVaultConnector(instanceConfig.options);
		instanceType = EntityStorageVaultConnector.NAMESPACE;
	} else if (type === VaultConnectorType.Hashicorp) {
		connector = new HashicorpVaultConnector(instanceConfig.options);
		instanceType = HashicorpVaultConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "vaultConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component: connector });
	VaultConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}
