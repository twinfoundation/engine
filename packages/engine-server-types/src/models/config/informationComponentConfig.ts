// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IInformationServiceConstructorOptions } from "@twin.org/api-service";
import type { InformationComponentType } from "../types/informationComponentType";

/**
 * Information component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type InformationComponentConfig =
	| {
			type: typeof InformationComponentType.Service;
			options: IInformationServiceConstructorOptions;
	  }
	| {
			type: typeof InformationComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
