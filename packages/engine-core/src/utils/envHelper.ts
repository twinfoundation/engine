// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, ObjectHelper, StringHelper } from "@twin.org/core";
import type { IEngineCoreEnvironmentVariables } from "../models/IEngineCoreEnvironmentVariables";

/**
 * Environment variable helper.
 */
export class EnvHelper {
	/**
	 * Get the environment variable as an object with camel cased names.
	 * @param envVars The environment variables.
	 * @param prefix The prefix of the environment variables.
	 * @returns The object with camel cased names.
	 */
	public static envToJson<T = IEngineCoreEnvironmentVariables>(
		envVars: { [id: string]: string | undefined },
		prefix: string
	): T {
		const result: { [id: string]: string | undefined } = {};

		for (const envVar in envVars) {
			if (envVar.startsWith(prefix) && Is.stringValue(process.env[envVar])) {
				const camelCaseName = StringHelper.camelCase(envVar.replace(prefix, "").toLowerCase());
				ObjectHelper.propertySet(result, camelCaseName, process.env[envVar]);
			}
		}
		return result as T;
	}
}
