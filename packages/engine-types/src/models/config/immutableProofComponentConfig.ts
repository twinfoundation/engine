// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IImmutableProofServiceConfig } from "@twin.org/immutable-proof-service";
import type { ImmutableProofComponentType } from "../types/immutableProofComponentType";

/**
 * Immutable proof component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ImmutableProofComponentConfig = {
	type: typeof ImmutableProofComponentType.Service;
	options?: {
		vaultConnectorType?: string;
		immutableProofEntityStorageType?: string;
		immutableStorageType?: string;
		identityConnectorType?: string;
		backgroundTaskConnectorType?: string;
		eventBusComponentType?: string;
		config?: IImmutableProofServiceConfig;
	};
};
