// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { mkdir, rmdir } from "node:fs/promises";
import { ComponentFactory, Factory, I18n } from "@twin.org/core";
import { MemoryStateStorage } from "@twin.org/engine-core";
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
	type IEngineConfig,
	ImmutableProofComponentType,
	ImmutableStorageConnectorType,
	EventBusComponentType,
	EventBusConnectorType,
	LoggingComponentType,
	LoggingConnectorType,
	NftComponentType,
	NftConnectorType,
	TelemetryComponentType,
	TelemetryConnectorType,
	VaultConnectorType,
	WalletConnectorType
} from "@twin.org/engine-types";
import { entity, EntitySchemaFactory, EntitySchemaHelper, property } from "@twin.org/entity";
import type { IEntityStorageComponent } from "@twin.org/entity-storage-models";
import { nameof } from "@twin.org/nameof";
import { Engine } from "../src/engine";

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

describe("engine", () => {
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

	test("Can start engine with no config", async () => {
		const engine = new Engine();
		await engine.start();
		await engine.stop();

		expect(engine).toBeDefined();
	});

	test("Can start engine with empty config", async () => {
		const engine = new Engine({ config: { types: {} } });
		await engine.start();
		await engine.stop();

		expect(engine).toBeDefined();
	});

	test("Can start engine with config", async () => {
		let calledCustomBootstrap = false;

		const engine = new Engine({
			config: {
				debug: true,
				types: {
					loggingConnector: [{ type: LoggingConnectorType.Console }],
					loggingComponent: [{ type: LoggingComponentType.Service }],
					entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
					blobStorageConnector: [{ type: BlobStorageConnectorType.Memory }],
					blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
					backgroundTaskConnector: [{ type: BackgroundTaskConnectorType.EntityStorage }],
					eventBusConnector: [{ type: EventBusConnectorType.Local }],
					eventBusComponent: [{ type: EventBusComponentType.Service }],
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
				}
			},
			stateStorage: new MemoryStateStorage(),
			customBootstrap: async () => {
				calledCustomBootstrap = true;
			}
		});
		await engine.start();
		await engine.stop();

		expect(ComponentFactory.names()).toEqual([
			"logging",
			"event-bus",
			"telemetry",
			"blob",
			"did",
			"identity-profile",
			"nft",
			"immutable-proof",
			"attestation",
			"aig",
			"ais"
		]);

		expect(EntitySchemaFactory.names()).toEqual([
			"BackgroundTask",
			"TelemetryMetric",
			"TelemetryMetricValue",
			"VaultKey",
			"VaultSecret",
			"BlobStorageEntry",
			"ImmutableItem",
			"WalletAddress",
			"IdentityDocument",
			"IdentityProfile",
			"Nft",
			"ImmutableProof",
			"AuditableItemGraphVertex",
			"AuditableItemGraphAlias",
			"AuditableItemGraphResource",
			"AuditableItemGraphEdge",
			"AuditableItemGraphChangeset",
			"AuditableItemGraphPatch",
			"AuditableItemStream",
			"AuditableItemStreamEntry"
		]);

		expect(engine).toBeDefined();
		expect(calledCustomBootstrap).toBeDefined();
	});

	test("Can start engine with custom entity storage", async () => {
		EntitySchemaFactory.register(nameof<TestEntity>(), () =>
			EntitySchemaHelper.getSchema(TestEntity)
		);

		const engine = new Engine({
			config: {
				types: {
					entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
					entityStorageComponent: [
						{
							type: EntityStorageComponentType.Service,
							options: { entityStorageType: nameof<TestEntity>() }
						}
					]
				}
			}
		});
		await engine.start();
		await engine.stop();
		expect(ComponentFactory.names()).toEqual(["test-entity"]);
		expect(EntitySchemaFactory.names()).toEqual([
			"BackgroundTask",
			"TelemetryMetric",
			"TelemetryMetricValue",
			"VaultKey",
			"VaultSecret",
			"BlobStorageEntry",
			"ImmutableItem",
			"WalletAddress",
			"IdentityDocument",
			"IdentityProfile",
			"Nft",
			"ImmutableProof",
			"AuditableItemGraphVertex",
			"AuditableItemGraphAlias",
			"AuditableItemGraphResource",
			"AuditableItemGraphEdge",
			"AuditableItemGraphChangeset",
			"AuditableItemGraphPatch",
			"AuditableItemStream",
			"AuditableItemStreamEntry",
			"TestEntity"
		]);
	});

	test("Can start engine with custom entity storage and custom store", async () => {
		EntitySchemaFactory.register(nameof<TestEntity>(), () =>
			EntitySchemaHelper.getSchema(TestEntity)
		);

		const engine = new Engine({
			config: {
				silent: true,
				types: {
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
			}
		});
		await engine.start();
		await engine.stop();

		expect(ComponentFactory.names()).toEqual(["test-entity"]);
		expect(EntitySchemaFactory.names()).toEqual([
			"BackgroundTask",
			"TelemetryMetric",
			"TelemetryMetricValue",
			"VaultKey",
			"VaultSecret",
			"BlobStorageEntry",
			"ImmutableItem",
			"WalletAddress",
			"IdentityDocument",
			"IdentityProfile",
			"Nft",
			"ImmutableProof",
			"AuditableItemGraphVertex",
			"AuditableItemGraphAlias",
			"AuditableItemGraphResource",
			"AuditableItemGraphEdge",
			"AuditableItemGraphChangeset",
			"AuditableItemGraphPatch",
			"AuditableItemStream",
			"AuditableItemStreamEntry",
			"TestEntity"
		]);

		const service = ComponentFactory.get<IEntityStorageComponent<TestEntity>>("test-entity");
		await service.set({ id: "test" });

		const item = await service.get("test");
		expect(item?.id).toEqual("test");
	});

	test("Can clone the engine", async () => {
		const engine = new Engine({
			config: {
				debug: true,
				types: {
					loggingConnector: [{ type: LoggingConnectorType.Console }],
					loggingComponent: [{ type: LoggingComponentType.Service }],
					entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
					blobStorageConnector: [{ type: BlobStorageConnectorType.Memory }],
					blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
					backgroundTaskConnector: [{ type: BackgroundTaskConnectorType.EntityStorage }],
					eventBusConnector: [{ type: EventBusConnectorType.Local }],
					eventBusComponent: [{ type: EventBusComponentType.Service }],
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
				}
			},
			stateStorage: new MemoryStateStorage()
		});

		await engine.start();
		await engine.stop();

		Factory.clearFactories();

		const cloneData = engine.getCloneData();
		const clone = new Engine();
		clone.populateClone(cloneData);
		await clone.start();

		expect(clone.getConfig()).toEqual(engine.getConfig());
		expect(clone.getState()).toEqual(engine.getState());
		expect(clone.getDefaultTypes()).toEqual(engine.getDefaultTypes());
	});

	test("Can clone the engine and silence it", async () => {
		const config: IEngineConfig = {
			debug: true,
			silent: false,
			types: {
				loggingConnector: [{ type: LoggingConnectorType.Console }],
				loggingComponent: [{ type: LoggingComponentType.Service }],
				entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
				blobStorageConnector: [{ type: BlobStorageConnectorType.Memory }],
				blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
				backgroundTaskConnector: [{ type: BackgroundTaskConnectorType.EntityStorage }],
				eventBusConnector: [{ type: EventBusConnectorType.Local }],
				eventBusComponent: [{ type: EventBusComponentType.Service }],
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
			}
		};
		const engine = new Engine({
			config,
			stateStorage: new MemoryStateStorage()
		});

		await engine.start();
		await engine.stop();

		Factory.clearFactories();

		const cloneData = engine.getCloneData();
		const clone = new Engine();
		clone.populateClone(cloneData, true);
		await clone.start();

		expect(clone.getConfig()).toEqual(engine.getConfig());
		expect(clone.getState()).toEqual(engine.getState());
		expect(clone.getDefaultTypes()).toEqual(engine.getDefaultTypes());
	});
});
