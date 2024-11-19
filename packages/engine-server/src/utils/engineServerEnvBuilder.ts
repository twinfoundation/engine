// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IServerInfo, IWebServerOptions } from "@twin.org/api-models";
import { Coerce, Is } from "@twin.org/core";
import {
	AuthenticationComponentType,
	InformationComponentType,
	RestRouteProcessorType,
	SocketRouteProcessorType,
	type IEngineCore,
	type IEngineServerConfig
} from "@twin.org/engine-models";
import type { HttpMethod } from "@twin.org/web";
import type { IEngineServerEnvironmentVariables } from "../models/IEngineServerEnvironmentVariables";

/**
 * Handles the configuration of the server.
 * @param coreEngine The core engine.
 * @param envVars The environment variables.
 * @param serverInfo The server information.
 * @returns The the config for the core and the server.
 */
export function buildEngineServerConfiguration(
	coreEngine: IEngineCore,
	envVars: IEngineServerEnvironmentVariables,
	serverInfo: IServerInfo
): IEngineServerConfig {
	envVars.adminUsername ??= "admin@node";
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

	const coreConfig = coreEngine.getConfig();

	const authProcessorType = envVars.authProcessorType;

	const serverConfig: IEngineServerConfig = {
		web: webServerOptions,
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
	};

	serverConfig.restRouteProcessor ??= [];
	serverConfig.socketRouteProcessor ??= [];

	if (!coreConfig.silent) {
		serverConfig.restRouteProcessor.push({
			type: RestRouteProcessorType.Logging,
			options: {
				config: {
					includeBody: coreConfig.debug
				}
			}
		});
		serverConfig.socketRouteProcessor.push({
			type: SocketRouteProcessorType.Logging,
			options: {
				config: {
					includeBody: coreConfig.debug
				}
			}
		});
	}
	serverConfig.restRouteProcessor.push({
		type: RestRouteProcessorType.NodeIdentity
	});
	serverConfig.socketRouteProcessor.push({
		type: SocketRouteProcessorType.NodeIdentity
	});
	serverConfig.restRouteProcessor.push({
		type: RestRouteProcessorType.RestRoute,
		options: {
			config: {
				includeErrorStack: coreConfig.debug
			}
		}
	});
	serverConfig.socketRouteProcessor.push({
		type: SocketRouteProcessorType.SocketRoute,
		options: {
			config: {
				includeErrorStack: coreConfig.debug
			}
		}
	});

	if (authProcessorType === AuthenticationComponentType.EntityStorage) {
		serverConfig.authenticationComponent ??= [];
		serverConfig.authenticationComponent.push({
			type: AuthenticationComponentType.EntityStorage,
			options: {
				config: {
					signingKeyName: envVars.authSigningKeyId
				}
			}
		});
		serverConfig.restRouteProcessor.push({
			type: RestRouteProcessorType.AuthHeader,
			options: {
				config: {
					signingKeyName: envVars.authSigningKeyId
				}
			}
		});
		serverConfig.socketRouteProcessor.push({
			type: SocketRouteProcessorType.AuthHeader,
			options: {
				config: {
					signingKeyName: envVars.authSigningKeyId
				}
			}
		});
	}

	return serverConfig;
}
