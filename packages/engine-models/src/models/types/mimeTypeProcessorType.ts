// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Mime type route processor types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MimeTypeProcessorType = {
	/**
	 * Jwt.
	 */
	Jwt: "jwt"
} as const;

/**
 * Mime type processor types.
 */
export type MimeTypeProcessorType =
	(typeof MimeTypeProcessorType)[keyof typeof MimeTypeProcessorType];
