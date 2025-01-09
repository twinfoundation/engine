// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuthHeaderProcessorConstructorOptions } from "@twin.org/api-auth-entity-storage-service";
import type {
	ILoggingProcessorConstructorOptions,
	ISocketRouteProcessorConstructorOptions,
	IStaticUserIdentityProcessorConstructorOptions
} from "@twin.org/api-processors";
import type { SocketRouteProcessorType } from "../types/socketRouteProcessorType";

/**
 * Socket route processor config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SocketRouteProcessorConfig =
	| {
			type: typeof SocketRouteProcessorType.AuthHeader;
			options?: IAuthHeaderProcessorConstructorOptions;
	  }
	| {
			type: typeof SocketRouteProcessorType.Logging;
			options?: ILoggingProcessorConstructorOptions;
	  }
	| {
			type: typeof SocketRouteProcessorType.NodeIdentity;
			options?: never;
	  }
	| {
			type: typeof SocketRouteProcessorType.StaticUserIdentity;
			options: IStaticUserIdentityProcessorConstructorOptions;
	  }
	| {
			type: typeof SocketRouteProcessorType.SocketRoute;
			options?: ISocketRouteProcessorConstructorOptions;
	  };
