// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ISocketRoute } from "@twin.org/api-models";

/**
 * Method definition for the socket route creation.
 */
export type SocketRouteGenerator = (baseRouteName: string, componentName: string) => ISocketRoute[];
