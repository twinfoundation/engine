// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IDocumentManagementServiceConstructorOptions } from "@twin.org/document-management-service";
import type { DocumentManagementComponentType } from "../types/documentManagementComponentType";

/**
 * Data processing component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type DocumentManagementComponentConfig = {
	type: typeof DocumentManagementComponentType.Service;
	options?: IDocumentManagementServiceConstructorOptions;
};
