// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "@twin.org/core";
import type { IEngineServerConfig } from "@twin.org/engine-server-types";

/**
 * Adds the rest paths to the server config.
 * @param serverConfig The server config.
 */
export function addDefaultRestPaths(serverConfig: IEngineServerConfig): void {
	if (Is.arrayValue(serverConfig.types.informationComponent)) {
		serverConfig.types.informationComponent[0].restPath = "";
	}

	if (
		Is.arrayValue(serverConfig.types.authenticationComponent) &&
		!Is.stringValue(serverConfig.types.authenticationComponent[0].restPath)
	) {
		serverConfig.types.authenticationComponent[0].restPath = "/authentication";
	}

	if (
		Is.arrayValue(serverConfig.types.blobStorageComponent) &&
		!Is.stringValue(serverConfig.types.blobStorageComponent[0].restPath)
	) {
		serverConfig.types.blobStorageComponent[0].restPath = "/blob";
	}

	if (
		Is.arrayValue(serverConfig.types.loggingComponent) &&
		!Is.stringValue(serverConfig.types.loggingComponent[0].restPath)
	) {
		serverConfig.types.loggingComponent[0].restPath = "/logging";
	}

	if (
		Is.arrayValue(serverConfig.types.telemetryComponent) &&
		!Is.stringValue(serverConfig.types.telemetryComponent[0].restPath)
	) {
		serverConfig.types.telemetryComponent[0].restPath = "/telemetry";
	}

	if (
		Is.arrayValue(serverConfig.types.identityComponent) &&
		!Is.stringValue(serverConfig.types.identityComponent[0].restPath)
	) {
		serverConfig.types.identityComponent[0].restPath = "/identity";
	}

	if (
		Is.arrayValue(serverConfig.types.identityResolverComponent) &&
		!Is.stringValue(serverConfig.types.identityResolverComponent[0].restPath)
	) {
		serverConfig.types.identityResolverComponent[0].restPath = "/identity";
	}

	if (
		Is.arrayValue(serverConfig.types.identityProfileComponent) &&
		!Is.stringValue(serverConfig.types.identityProfileComponent[0].restPath)
	) {
		serverConfig.types.identityProfileComponent[0].restPath = "/identity/profile";
	}

	if (
		Is.arrayValue(serverConfig.types.nftComponent) &&
		!Is.stringValue(serverConfig.types.nftComponent[0].restPath)
	) {
		serverConfig.types.nftComponent[0].restPath = "/nft";
	}

	if (
		Is.arrayValue(serverConfig.types.verifiableStorageComponent) &&
		!Is.stringValue(serverConfig.types.verifiableStorageComponent[0].restPath)
	) {
		serverConfig.types.verifiableStorageComponent[0].restPath = "/verifiable";
	}

	if (
		Is.arrayValue(serverConfig.types.immutableProofComponent) &&
		!Is.stringValue(serverConfig.types.immutableProofComponent[0].restPath)
	) {
		serverConfig.types.immutableProofComponent[0].restPath = "/immutable-proof";
	}

	if (
		Is.arrayValue(serverConfig.types.attestationComponent) &&
		!Is.stringValue(serverConfig.types.attestationComponent[0].restPath)
	) {
		serverConfig.types.attestationComponent[0].restPath = "/attestation";
	}

	if (
		Is.arrayValue(serverConfig.types.auditableItemGraphComponent) &&
		!Is.stringValue(serverConfig.types.auditableItemGraphComponent[0].restPath)
	) {
		serverConfig.types.auditableItemGraphComponent[0].restPath = "/aig";
	}

	if (
		Is.arrayValue(serverConfig.types.auditableItemStreamComponent) &&
		!Is.stringValue(serverConfig.types.auditableItemStreamComponent[0].restPath)
	) {
		serverConfig.types.auditableItemStreamComponent[0].restPath = "/ais";
	}

	if (
		Is.arrayValue(serverConfig.types.dataProcessingComponent) &&
		!Is.stringValue(serverConfig.types.dataProcessingComponent[0].restPath)
	) {
		serverConfig.types.dataProcessingComponent[0].restPath = "/data-processing";
	}

	if (
		Is.arrayValue(serverConfig.types.documentManagementComponent) &&
		!Is.stringValue(serverConfig.types.documentManagementComponent[0].restPath)
	) {
		serverConfig.types.documentManagementComponent[0].restPath = "/documents";
	}

	if (
		Is.arrayValue(serverConfig.types.federatedCatalogueComponent) &&
		!Is.stringValue(serverConfig.types.federatedCatalogueComponent[0].restPath)
	) {
		serverConfig.types.federatedCatalogueComponent[0].restPath = "/federated-catalogue";
	}

	if (
		Is.arrayValue(serverConfig.types.rightsManagementComponent) &&
		!Is.stringValue(serverConfig.types.rightsManagementComponent[0].restPath)
	) {
		serverConfig.types.rightsManagementComponent[0].restPath = "/rights-management";
	}
}

/**
 * Adds the socket paths to the server config.
 * @param serverConfig The server config.
 */
export function addDefaultSocketPaths(serverConfig: IEngineServerConfig): void {
	if (
		Is.arrayValue(serverConfig.types.eventBusComponent) &&
		!Is.stringValue(serverConfig.types.eventBusComponent[0].socketPath)
	) {
		serverConfig.types.eventBusComponent[0].socketPath = "event-bus";
	}
}
