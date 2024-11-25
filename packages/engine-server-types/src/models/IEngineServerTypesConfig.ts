// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IWebServerOptions } from "@twin.org/api-models";
import type { IEngineCoreTypeConfig } from "@twin.org/engine-models";
import type { IEngineCoreTypesConfig } from "@twin.org/engine-types";
import type { AuthenticationComponentConfig } from "./config/authenticationComponentConfig";
import type { InformationComponentConfig } from "./config/informationComponentConfig";
import type { MimeTypeProcessorConfig } from "./config/mimeTypeProcessorConfig";
import type { RestRouteProcessorConfig } from "./config/restRouteProcessorConfig";
import type { SocketRouteProcessorConfig } from "./config/socketRouteProcessorConfig";

/**
 * Extended engine server config with known types.
 */
export interface IEngineServerTypesConfig extends IEngineCoreTypesConfig {
	/**
	 * Configuration for the web server.
	 */
	web?: IWebServerOptions;

	/**
	 * The types to initialise in the engine.
	 */
	types: IEngineCoreTypesConfig["types"] & {
		[type: string]: IEngineCoreTypeConfig[] | undefined;

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
	};
}
