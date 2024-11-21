// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { mkdir, rmdir } from "node:fs/promises";
import { ComponentFactory, I18n } from "@twin.org/core";
import {
	AttestationComponentType,
	AttestationConnectorType,
	AuditableItemGraphComponentType,
	AuditableItemStreamComponentType,
	BackgroundTaskConnectorType,
	BlobStorageComponentType,
	BlobStorageConnectorType,
	EntityStorageComponentType,
	EntityStorageConnectorType,
	FaucetConnectorType,
	IdentityComponentType,
	IdentityConnectorType,
	IdentityProfileComponentType,
	IdentityProfileConnectorType,
	ImmutableProofComponentType,
	ImmutableStorageConnectorType,
	LoggingComponentType,
	LoggingConnectorType,
	NftComponentType,
	NftConnectorType,
	TelemetryComponentType,
	TelemetryConnectorType,
	VaultConnectorType,
	WalletConnectorType
} from "@twin.org/engine-models";
import { entity, EntitySchemaFactory, EntitySchemaHelper, property } from "@twin.org/entity";
import type { IEntityStorageComponent } from "@twin.org/entity-storage-models";
import { nameof } from "@twin.org/nameof";
import { EngineCore } from "../src/engineCore";
import { MemoryStateStorage } from "../src/storage/memoryStateStorage";

/**
 * Class representing information for a test entity.
 */
@entity()
export class TestEntity {
	/**
	 * The id for the entity.
	 */
	@property({ type: "string", isPrimary: true })
	public id!: string;
}

describe("engine-core", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", await import("../locales/en.json"));
	});

	beforeEach(async () => {
		ComponentFactory.clear();
		await mkdir("tests/.tmp", { recursive: true });
	});

	afterEach(async () => {
		await rmdir("tests/.tmp", { recursive: true });
	});

	test("Can start engine core with no config", async () => {
		const engine = new EngineCore();
		await engine.start();
		await engine.stop();

		expect(engine).toBeDefined();
	});

	test("Can start engine core with config", async () => {
		let calledCustomBootstrap = false;

		const engine = new EngineCore({
			config: {
				debug: true,
				loggingConnector: [{ type: LoggingConnectorType.Console }],
				loggingComponent: [{ type: LoggingComponentType.Service }],
				entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
				blobStorageConnector: [{ type: BlobStorageConnectorType.Memory }],
				blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
				backgroundTaskConnector: [{ type: BackgroundTaskConnectorType.EntityStorage }],
				telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
				telemetryComponent: [{ type: TelemetryComponentType.Service }],
				vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
				immutableStorageConnector: [{ type: ImmutableStorageConnectorType.EntityStorage }],
				immutableProofComponent: [{ type: ImmutableProofComponentType.Service }],
				walletConnector: [{ type: WalletConnectorType.EntityStorage }],
				faucetConnector: [{ type: FaucetConnectorType.EntityStorage }],
				identityConnector: [{ type: IdentityConnectorType.EntityStorage }],
				identityProfileConnector: [{ type: IdentityProfileConnectorType.EntityStorage }],
				identityComponent: [{ type: IdentityComponentType.Service }],
				identityProfileComponent: [{ type: IdentityProfileComponentType.Service }],
				nftConnector: [{ type: NftConnectorType.EntityStorage }],
				nftComponent: [{ type: NftComponentType.Service }],
				attestationConnector: [{ type: AttestationConnectorType.EntityStorage }],
				attestationComponent: [{ type: AttestationComponentType.Service }],
				auditableItemGraphComponent: [{ type: AuditableItemGraphComponentType.Service }],
				auditableItemStreamComponent: [{ type: AuditableItemStreamComponentType.Service }]
			},
			stateStorage: new MemoryStateStorage(),
			customBootstrap: async () => {
				calledCustomBootstrap = true;
			}
		});
		await engine.start();
		await engine.stop();

		expect(engine).toBeDefined();
		expect(calledCustomBootstrap).toBeDefined();
	});

	test("Can start engine core with custom entity storage", async () => {
		EntitySchemaFactory.register(nameof<TestEntity>(), () =>
			EntitySchemaHelper.getSchema(TestEntity)
		);

		const engine = new EngineCore({
			config: {
				entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
				entityStorageComponent: [
					{
						type: EntityStorageComponentType.Service,
						options: { entityStorageType: nameof<TestEntity>() }
					}
				]
			}
		});
		await engine.start();
		await engine.stop();
		expect(engine).toBeDefined();
		const componentNames = ComponentFactory.names();
		expect(componentNames).toEqual(["test-entity"]);
	});

	test("Can start engine core with custom entity storage and custom store", async () => {
		EntitySchemaFactory.register(nameof<TestEntity>(), () =>
			EntitySchemaHelper.getSchema(TestEntity)
		);

		const engine = new EngineCore({
			config: {
				silent: true,
				entityStorageConnector: [
					{ type: EntityStorageConnectorType.Memory },
					{
						type: EntityStorageConnectorType.File,
						options: {
							config: {
								directory: "tests/.tmp"
							}
						},
						overrideInstanceType: "test-entity"
					}
				],
				entityStorageComponent: [
					{
						type: EntityStorageComponentType.Service,
						options: {
							entityStorageType: nameof<TestEntity>(),
							config: { includeNodeIdentity: false, includeUserIdentity: false }
						}
					}
				]
			}
		});
		await engine.start();
		await engine.stop();

		expect(engine).toBeDefined();
		const componentNames = ComponentFactory.names();
		expect(componentNames).toEqual(["test-entity"]);

		const service = ComponentFactory.get<IEntityStorageComponent<TestEntity>>("test-entity");
		await service.set({ id: "test" });

		const item = await service.get("test");
		expect(item?.id).toEqual("test");
	});

	test("Can clone the engine core", async () => {
		const engine = new EngineCore({
			config: {
				debug: true,
				loggingConnector: [{ type: LoggingConnectorType.Console }],
				loggingComponent: [{ type: LoggingComponentType.Service }],
				entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
				blobStorageConnector: [{ type: BlobStorageConnectorType.Memory }],
				blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
				backgroundTaskConnector: [{ type: BackgroundTaskConnectorType.EntityStorage }],
				telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
				telemetryComponent: [{ type: TelemetryComponentType.Service }],
				vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
				immutableStorageConnector: [{ type: ImmutableStorageConnectorType.EntityStorage }],
				immutableProofComponent: [{ type: ImmutableProofComponentType.Service }],
				walletConnector: [{ type: WalletConnectorType.EntityStorage }],
				faucetConnector: [{ type: FaucetConnectorType.EntityStorage }],
				identityConnector: [{ type: IdentityConnectorType.EntityStorage }],
				identityProfileConnector: [{ type: IdentityProfileConnectorType.EntityStorage }],
				identityComponent: [{ type: IdentityComponentType.Service }],
				identityProfileComponent: [{ type: IdentityProfileComponentType.Service }],
				nftConnector: [{ type: NftConnectorType.EntityStorage }],
				nftComponent: [{ type: NftComponentType.Service }],
				attestationConnector: [{ type: AttestationConnectorType.EntityStorage }],
				attestationComponent: [{ type: AttestationComponentType.Service }],
				auditableItemGraphComponent: [{ type: AuditableItemGraphComponentType.Service }],
				auditableItemStreamComponent: [{ type: AuditableItemStreamComponentType.Service }]
			},
			stateStorage: new MemoryStateStorage()
		});

		await engine.start();

		const cloneData = engine.getCloneData();
		const clone = new EngineCore();
		clone.populateClone(cloneData);
		await clone.start();

		expect(clone.getConfig()).toEqual(engine.getConfig());
		expect(clone.getState()).toEqual(engine.getState());
		expect(clone.getDefaultTypes()).toEqual(engine.getDefaultTypes());
	});
});
