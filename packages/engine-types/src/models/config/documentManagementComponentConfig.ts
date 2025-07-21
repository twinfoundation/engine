// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IDocumentManagementServiceConstructorOptions } from "@twin.org/document-management-service";
import type { DocumentManagementComponentType } from "../types/documentManagementComponentType";

/**
 * Document management component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type DocumentManagementComponentConfig =
	| {
			type: typeof DocumentManagementComponentType.Service;
			options?: IDocumentManagementServiceConstructorOptions;
	  }
	| {
			type: typeof DocumentManagementComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
