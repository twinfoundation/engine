// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IWebServerOptions } from "@twin.org/api-models";
import type { IEngineCoreTypeConfig } from "./IEngineCoreTypeConfig";
import type { AuthenticationComponentConfig } from "./typeConfig/authenticationComponentConfig";
import type { InformationComponentConfig } from "./typeConfig/informationComponentConfig";
import type { MimeTypeProcessorConfig } from "./typeConfig/mimeTypeProcessorConfig";
import type { RestRouteProcessorConfig } from "./typeConfig/restRouteProcessorConfig";
import type { SocketRouteProcessorConfig } from "./typeConfig/socketRouteProcessorConfig";

/**
 * Configuration for the engine server.
 */
export interface IEngineServerConfig {
	/**
	 * Configuration for the web server.
	 */
	web?: IWebServerOptions;

	/**
	 * Information component options which can be overridden by individual components by specifying types other than default..
	 */
	informationComponent?: IEngineCoreTypeConfig<InformationComponentConfig>[];

	/**
	 * REST route processors options which can be overridden by individual components by specifying types other than default..
	 */
	restRouteProcessor?: IEngineCoreTypeConfig<RestRouteProcessorConfig>[];

	/**
	 * Socket route processors options which can be overridden by individual components by specifying types other than default..
	 */
	socketRouteProcessor?: IEngineCoreTypeConfig<SocketRouteProcessorConfig>[];

	/**
	 * Mime type processors options which can be overridden by individual components by specifying types other than default..
	 */
	mimeTypeProcessor?: IEngineCoreTypeConfig<MimeTypeProcessorConfig>[];

	/**
	 * Authentication component options which can be overridden by individual components by specifying types other than default..
	 */
	authenticationComponent?: IEngineCoreTypeConfig<AuthenticationComponentConfig>[];
}
