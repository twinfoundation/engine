// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Guards, Is, StringHelper } from "@twin.org/core";
import { EntityStorageComponentType, type IEngineConfig } from "@twin.org/engine-types";
import { EntitySchemaFactory, type IEntitySchema } from "@twin.org/entity";
import { nameof } from "@twin.org/nameof";

/**
 * Helper methods for engine config.
 */
export class EngineConfigHelper {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<EngineConfigHelper>();

	/**
	 * Add a custom entity storage to the engine configuration.
	 * @param engineConfig The engine configuration.
	 * @param entityTypeName The entity type name.
	 * @param entitySchema The entity schema.
	 * @param restPath The rest path to serve the entity storage from, leave undefined for no endpoints.
	 * @param options Additional options.
	 * @param options.partitionPerUser Whether to partition the user identity in the data, defaults to false.
	 */
	public static addCustomEntityStorage<T>(
		engineConfig: IEngineConfig,
		entityTypeName: string,
		entitySchema: IEntitySchema<T>,
		restPath?: string,
		options?: {
			partitionPerUser?: boolean;
		}
	): void {
		Guards.object<IEngineConfig>(EngineConfigHelper.CLASS_NAME, nameof(engineConfig), engineConfig);
		Guards.stringValue(EngineConfigHelper.CLASS_NAME, nameof(entityTypeName), entityTypeName);
		Guards.object<IEntitySchema<unknown>>(
			EngineConfigHelper.CLASS_NAME,
			nameof(entitySchema),
			entitySchema
		);

		engineConfig.types.entityStorageComponent ??= [];

		EntitySchemaFactory.register(entityTypeName, () => entitySchema);

		engineConfig.types.entityStorageComponent.push({
			type: EntityStorageComponentType.Service,
			options: {
				entityStorageType: entityTypeName,
				config: {
					partitionPerUser: options?.partitionPerUser
				}
			},
			overrideInstanceType: StringHelper.kebabCase(entityTypeName),
			restPath: Is.stringValue(restPath) ? restPath : undefined
		});
	}
}
