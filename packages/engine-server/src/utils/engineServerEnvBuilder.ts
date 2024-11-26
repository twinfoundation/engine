// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IServerInfo, IWebServerOptions } from "@twin.org/api-models";
import { Coerce, Is } from "@twin.org/core";
import type { IEngineCoreConfig } from "@twin.org/engine-models";
import {
	AuthenticationComponentType,
	InformationComponentType,
	RestRouteProcessorType,
	SocketRouteProcessorType,
	type IEngineServerConfig
} from "@twin.org/engine-server-types";
import type { HttpMethod } from "@twin.org/web";
import type { IEngineServerEnvironmentVariables } from "../models/IEngineServerEnvironmentVariables";

/**
 * Handles the configuration of the server.
 * @param envVars The environment variables.
 * @param coreEngineConfig The core engine config.
 * @param serverInfo The server information.
 * @returns The the config for the core and the server.
 */
export function buildEngineServerConfiguration(
	envVars: IEngineServerEnvironmentVariables,
	coreEngineConfig: IEngineCoreConfig,
	serverInfo: IServerInfo
): IEngineServerConfig {
	envVars.authSigningKeyId ??= "auth-signing";

	const webServerOptions: IWebServerOptions = {
		port: Coerce.number(envVars.port),
		host: Coerce.string(envVars.host),
		methods: Is.stringValue(envVars.httpMethods)
			? (envVars.httpMethods.split(",") as HttpMethod[])
			: undefined,
		allowedHeaders: Is.stringValue(envVars.httpAllowedHeaders)
			? envVars.httpAllowedHeaders.split(",")
			: undefined,
		exposedHeaders: Is.stringValue(envVars.httpExposedHeaders)
			? envVars.httpExposedHeaders.split(",")
			: undefined,
		corsOrigins: Is.stringValue(envVars.corsOrigins) ? envVars.corsOrigins.split(",") : undefined
	};

	const authProcessorType = envVars.authProcessorType;

	const serverConfig: IEngineServerConfig = {
		...coreEngineConfig,
		web: webServerOptions,
		types: {
			...coreEngineConfig.types,
			informationComponent: [
				{
					type: InformationComponentType.Service,
					options: {
						config: {
							serverInfo
						}
					}
				}
			],
			restRouteProcessor: []
		}
	};

	serverConfig.types.restRouteProcessor ??= [];
	serverConfig.types.socketRouteProcessor ??= [];

	serverConfig.types.restRouteProcessor.push({
		type: RestRouteProcessorType.NodeIdentity
	});
	serverConfig.types.socketRouteProcessor.push({
		type: SocketRouteProcessorType.NodeIdentity
	});

	if (!coreEngineConfig.silent) {
		serverConfig.types.restRouteProcessor.push({
			type: RestRouteProcessorType.Logging,
			options: {
				config: {
					includeBody: coreEngineConfig.debug
				}
			}
		});
		serverConfig.types.socketRouteProcessor.push({
			type: SocketRouteProcessorType.Logging,
			options: {
				config: {
					includeBody: coreEngineConfig.debug
				}
			}
		});
	}
	serverConfig.types.restRouteProcessor.push({
		type: RestRouteProcessorType.RestRoute,
		options: {
			config: {
				includeErrorStack: coreEngineConfig.debug
			}
		}
	});
	serverConfig.types.socketRouteProcessor.push({
		type: SocketRouteProcessorType.SocketRoute,
		options: {
			config: {
				includeErrorStack: coreEngineConfig.debug
			}
		}
	});

	if (authProcessorType === AuthenticationComponentType.EntityStorage) {
		serverConfig.types.authenticationComponent ??= [];
		serverConfig.types.authenticationComponent.push({
			type: AuthenticationComponentType.EntityStorage,
			options: {
				config: {
					signingKeyName: envVars.authSigningKeyId
				}
			}
		});
		serverConfig.types.restRouteProcessor.push({
			type: RestRouteProcessorType.AuthHeader,
			options: {
				config: {
					signingKeyName: envVars.authSigningKeyId
				}
			}
		});
		serverConfig.types.socketRouteProcessor.push({
			type: SocketRouteProcessorType.AuthHeader,
			options: {
				config: {
					signingKeyName: envVars.authSigningKeyId
				}
			}
		});
	}

	addRestPaths(coreEngineConfig, serverConfig);

	return serverConfig;
}

/**
 * Adds the rest paths to the server config.
 * @param coreEngineConfig The core engine config.
 * @param serverConfig The server config.
 */
function addRestPaths(
	coreEngineConfig: IEngineServerConfig,
	serverConfig: IEngineServerConfig
): void {
	if (Is.arrayValue(serverConfig.types.informationComponent)) {
		serverConfig.types.informationComponent[0].restPath = "";
	}

	if (Is.arrayValue(serverConfig.types.authenticationComponent)) {
		serverConfig.types.authenticationComponent[0].restPath = "authentication";
	}

	if (Is.arrayValue(coreEngineConfig.types.blobStorageComponent)) {
		coreEngineConfig.types.blobStorageComponent[0].restPath = "blob";
	}

	if (Is.arrayValue(coreEngineConfig.types.loggingComponent)) {
		coreEngineConfig.types.loggingComponent[0].restPath = "logging";
	}

	if (Is.arrayValue(coreEngineConfig.types.telemetryComponent)) {
		coreEngineConfig.types.telemetryComponent[0].restPath = "telemetry";
	}

	if (Is.arrayValue(coreEngineConfig.types.identityComponent)) {
		coreEngineConfig.types.identityComponent[0].restPath = "identity";
	}

	if (Is.arrayValue(coreEngineConfig.types.identityProfileComponent)) {
		coreEngineConfig.types.identityProfileComponent[0].restPath = "identity/profile";
	}

	if (Is.arrayValue(coreEngineConfig.types.nftComponent)) {
		coreEngineConfig.types.nftComponent[0].restPath = "nft";
	}

	if (Is.arrayValue(coreEngineConfig.types.attestationComponent)) {
		coreEngineConfig.types.attestationComponent[0].restPath = "attestation";
	}

	if (Is.arrayValue(coreEngineConfig.types.auditableItemGraphComponent)) {
		coreEngineConfig.types.auditableItemGraphComponent[0].restPath = "aig";
	}

	if (Is.arrayValue(coreEngineConfig.types.auditableItemStreamComponent)) {
		coreEngineConfig.types.auditableItemStreamComponent[0].restPath = "ais";
	}
}
