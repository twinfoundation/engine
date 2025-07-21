// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IFederatedCatalogueServiceConstructorOptions } from "@twin.org/federated-catalogue-service";
import type { FederatedCatalogueComponentType } from "../types/federatedCatalogueComponentType";

/**
 * Federated catalog component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type FederatedCatalogueComponentConfig =
	| {
			type: typeof FederatedCatalogueComponentType.Service;
			options: IFederatedCatalogueServiceConstructorOptions;
	  }
	| {
			type: typeof FederatedCatalogueComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
