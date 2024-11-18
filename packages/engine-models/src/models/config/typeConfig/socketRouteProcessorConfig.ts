// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuthHeaderProcessorConfig } from "@twin.org/api-auth-entity-storage-service";
import type {
	ILoggingProcessorConfig,
	IRouteProcessorConfig,
	IStaticUserIdentityProcessorConfig
} from "@twin.org/api-processors";
import type { SocketRouteProcessorType } from "../../types/socketRouteProcessorType";

/**
 * Socket route processor config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SocketRouteProcessorConfig =
	| {
			type: typeof SocketRouteProcessorType.AuthHeader;
			options?: {
				vaultConnectorType?: string;
				config?: IAuthHeaderProcessorConfig;
			};
	  }
	| {
			type: typeof SocketRouteProcessorType.Logging;
			options?: {
				loggingConnectorType?: string;
				config?: ILoggingProcessorConfig;
			};
	  }
	| {
			type: typeof SocketRouteProcessorType.NodeIdentity;
			options?: never;
	  }
	| {
			type: typeof SocketRouteProcessorType.StaticUserIdentity;
			options: {
				config: IStaticUserIdentityProcessorConfig;
			};
	  }
	| {
			type: typeof SocketRouteProcessorType.SocketRoute;
			options?: {
				config?: IRouteProcessorConfig;
			};
	  };
