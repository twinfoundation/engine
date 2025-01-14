// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * DLT config types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DltConfigType = {
	/**
	 * IOTA.
	 */
	Iota: "iota",

	/**
	 * IOTA Rebased.
	 */
	IotaRebased: "iota-rebased"
} as const;

/**
 * DLT config types.
 */
export type DltConfigType = (typeof DltConfigType)[keyof typeof DltConfigType];
