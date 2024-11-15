// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRoute } from "@twin.org/api-models";

/**
 * Method definition for the REST route creation.
 */
export type RestRouteGenerator = (baseRouteName: string, componentName: string) => IRestRoute[];
