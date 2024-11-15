// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { EntityStorageAttestationConnector } from "@twin.org/attestation-connector-entity-storage";
import { IotaAttestationConnector } from "@twin.org/attestation-connector-iota";
import {
	AttestationConnectorFactory,
	type IAttestationComponent,
	type IAttestationConnector
} from "@twin.org/attestation-models";
import { AttestationService } from "@twin.org/attestation-service";
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import {
	AttestationComponentType,
	AttestationConnectorType,
	type IEngineCoreContext,
	type AttestationComponentConfig,
	type AttestationConnectorConfig,
	type IEngineCore
} from "@twin.org/engine-models";

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
	engineCore: IEngineCore,
	context: IEngineCoreContext,
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
	if (type === AttestationConnectorType.Iota) {
		connector = new IotaAttestationConnector({
			identityConnectorType: context.defaultTypes.identityConnector,
			nftConnectorType: context.defaultTypes.nftConnector,
			...instanceConfig.options
		});
		instanceType = IotaAttestationConnector.NAMESPACE;
	} else if (type === AttestationConnectorType.EntityStorage) {
		connector = new EntityStorageAttestationConnector({
			identityConnectorType: context.defaultTypes.identityConnector,
			nftConnectorType: context.defaultTypes.nftConnector,
			...instanceConfig.options
		});
		instanceType = EntityStorageAttestationConnector.NAMESPACE;
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
	engineCore: IEngineCore,
	context: IEngineCoreContext,
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
