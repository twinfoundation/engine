// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { MimeTypeProcessorType } from "../types/mimeTypeProcessorType";

/**
 * Mime type processor config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MimeTypeProcessorConfig = {
	type: typeof MimeTypeProcessorType.Jwt;
	options?: never;
};
