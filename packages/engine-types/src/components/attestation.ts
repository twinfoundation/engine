// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { NftAttestationConnector } from "@twin.org/attestation-connector-nft";
import {
	AttestationConnectorFactory,
	type IAttestationComponent,
	type IAttestationConnector
} from "@twin.org/attestation-models";
import { AttestationService } from "@twin.org/attestation-service";
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import type { AttestationComponentConfig } from "../models/config/attestationComponentConfig";
import type { AttestationConnectorConfig } from "../models/config/attestationConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { AttestationComponentType } from "../models/types/attestationComponentType";
import { AttestationConnectorType } from "../models/types/attestationConnectorType";

/**
 * Initialise the attestation connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseAttestationConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AttestationConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Attestation Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IAttestationConnector;
	let instanceType: string;
	if (type === AttestationConnectorType.Nft) {
		connector = new NftAttestationConnector({
			identityConnectorType: context.defaultTypes.identityConnector,
			nftConnectorType: context.defaultTypes.nftConnector,
			...instanceConfig.options
		});
		instanceType = NftAttestationConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "attestationConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component: connector
	});
	AttestationConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the attestation component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseAttestationComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AttestationComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Attestation Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IAttestationComponent;
	let instanceType: string;

	if (type === AttestationComponentType.Service) {
		component = new AttestationService({
			walletConnectorType: context.defaultTypes.walletConnector,
			...instanceConfig.options
		});
		instanceType = AttestationService.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "attestationComponent"
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
