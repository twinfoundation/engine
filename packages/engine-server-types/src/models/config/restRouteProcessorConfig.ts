// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuthHeaderProcessorConfig } from "@twin.org/api-auth-entity-storage-service";
import type {
	ILoggingProcessorConfig,
	IRouteProcessorConfig,
	IStaticUserIdentityProcessorConfig
} from "@twin.org/api-processors";
import type { RestRouteProcessorType } from "../types/restRouteProcessorType";

/**
 * REST route processor config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RestRouteProcessorConfig =
	| {
			type: typeof RestRouteProcessorType.AuthHeader;
			options?: {
				vaultConnectorType?: string;
				config?: IAuthHeaderProcessorConfig;
			};
	  }
	| {
			type: typeof RestRouteProcessorType.Logging;
			options?: {
				loggingConnectorType?: string;
				config?: ILoggingProcessorConfig;
			};
	  }
	| {
			type: typeof RestRouteProcessorType.NodeIdentity;
			options?: never;
	  }
	| {
			type: typeof RestRouteProcessorType.StaticUserIdentity;
			options: {
				config: IStaticUserIdentityProcessorConfig;
			};
	  }
	| {
			type: typeof RestRouteProcessorType.RestRoute;
			options?: {
				config?: IRouteProcessorConfig;
			};
	  };
