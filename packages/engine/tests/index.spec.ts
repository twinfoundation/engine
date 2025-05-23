// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { mkdir, rm } from "node:fs/promises";
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
	DataConverterConnectorType,
	DataExtractorConnectorType,
	DataProcessingComponentType,
	DocumentManagementComponentType,
	EntityStorageComponentType,
	EntityStorageConnectorType,
	EventBusComponentType,
	EventBusConnectorType,
	FaucetConnectorType,
	FederatedCatalogueComponentType,
	IdentityComponentType,
	IdentityConnectorType,
	IdentityProfileComponentType,
	IdentityProfileConnectorType,
	IdentityResolverComponentType,
	IdentityResolverConnectorType,
	type IEngineConfig,
	ImmutableProofComponentType,
	LoggingComponentType,
	LoggingConnectorType,
	MessagingComponentType,
	MessagingEmailConnectorType,
	MessagingPushNotificationConnectorType,
	MessagingSmsConnectorType,
	NftComponentType,
	NftConnectorType,
	TelemetryComponentType,
	TelemetryConnectorType,
	VaultConnectorType,
	VerifiableStorageComponentType,
	VerifiableStorageConnectorType,
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
		Factory.clearFactories();
		await mkdir("tests/.tmp", { recursive: true });
	});

	afterEach(async () => {
		await rm("tests/.tmp", { recursive: true });
	});

	test("Can start engine with no config", async () => {
		const engine = new Engine();
		const canContinue = await engine.start();
		await engine.stop();

		expect(canContinue).toEqual(true);
		expect(engine).toBeDefined();
	});

	test("Can start engine with empty config", async () => {
		const engine = new Engine({ config: { types: {} } });
		const canContinue = await engine.start();
		await engine.stop();

		expect(engine).toBeDefined();
		expect(canContinue).toEqual(true);
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
					messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
					messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
					messagingPushNotificationConnector: [
						{ type: MessagingPushNotificationConnectorType.EntityStorage }
					],
					messagingComponent: [{ type: MessagingComponentType.Service }],
					vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
					verifiableStorageConnector: [{ type: VerifiableStorageConnectorType.EntityStorage }],
					verifiableStorageComponent: [{ type: VerifiableStorageComponentType.Service }],
					immutableProofComponent: [{ type: ImmutableProofComponentType.Service }],
					walletConnector: [{ type: WalletConnectorType.EntityStorage }],
					faucetConnector: [{ type: FaucetConnectorType.EntityStorage }],
					identityConnector: [{ type: IdentityConnectorType.EntityStorage }],
					identityResolverConnector: [{ type: IdentityResolverConnectorType.EntityStorage }],
					identityProfileConnector: [{ type: IdentityProfileConnectorType.EntityStorage }],
					identityComponent: [{ type: IdentityComponentType.Service }],
					identityResolverComponent: [{ type: IdentityResolverComponentType.Service }],
					identityProfileComponent: [{ type: IdentityProfileComponentType.Service }],
					nftConnector: [{ type: NftConnectorType.EntityStorage }],
					nftComponent: [{ type: NftComponentType.Service }],
					attestationConnector: [{ type: AttestationConnectorType.Nft }],
					attestationComponent: [{ type: AttestationComponentType.Service }],
					auditableItemGraphComponent: [{ type: AuditableItemGraphComponentType.Service }],
					auditableItemStreamComponent: [{ type: AuditableItemStreamComponentType.Service }],
					dataConverterConnector: [
						{ type: DataConverterConnectorType.Json },
						{ type: DataConverterConnectorType.Xml }
					],
					dataExtractorConnector: [{ type: DataExtractorConnectorType.JsonPath }],
					dataProcessingComponent: [{ type: DataProcessingComponentType.Service }],
					documentManagementComponent: [{ type: DocumentManagementComponentType.Service }],
					federatedCatalogueComponent: [
						{
							type: FederatedCatalogueComponentType.Service,
							options: { config: { clearingHouseApproverList: [] } }
						}
					]
				}
			},
			stateStorage: new MemoryStateStorage(),
			customBootstrap: async () => {
				calledCustomBootstrap = true;
			}
		});

		const canContinue = await engine.start();
		await engine.stop();

		expect(ComponentFactory.names()).toEqual([
			"logging",
			"event-bus",
			"telemetry",
			"messaging",
			"blob",
			"verifiable",
			"identity",
			"identity-resolver",
			"identity-profile",
			"nft",
			"immutable-proof",
			"attestation",
			"aig",
			"ais",
			"data-processing",
			"documents",
			"fedcat"
		]);

		expect(EntitySchemaFactory.names()).toEqual([
			"BackgroundTask",
			"TelemetryMetric",
			"TelemetryMetricValue",
			"EmailEntry",
			"SmsEntry",
			"PushNotificationDeviceEntry",
			"PushNotificationMessageEntry",
			"TemplateEntry",
			"VaultKey",
			"VaultSecret",
			"BlobStorageEntry",
			"VerifiableItem",
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
			"ExtractionRuleGroup",
			"ExtractionRule",
			"ParticipantEntry",
			"DataResourceEntry",
			"ServiceOfferingEntry",
			"DataSpaceConnectorEntry"
		]);

		expect(engine).toBeDefined();
		expect(canContinue).toEqual(true);
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

		const canContinue = await engine.start();
		await engine.stop();

		expect(canContinue).toEqual(true);
		expect(ComponentFactory.names()).toEqual(["test-entity"]);
		expect(EntitySchemaFactory.names()).toEqual(["TestEntity"]);
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
		const canContinue = await engine.start();
		await engine.stop();

		expect(canContinue).toEqual(true);
		expect(ComponentFactory.names()).toEqual(["test-entity"]);
		expect(EntitySchemaFactory.names()).toEqual(["TestEntity"]);

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
					messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
					messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
					messagingPushNotificationConnector: [
						{ type: MessagingPushNotificationConnectorType.EntityStorage }
					],
					messagingComponent: [{ type: MessagingComponentType.Service }],
					vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
					verifiableStorageConnector: [{ type: VerifiableStorageConnectorType.EntityStorage }],
					verifiableStorageComponent: [{ type: VerifiableStorageComponentType.Service }],
					immutableProofComponent: [{ type: ImmutableProofComponentType.Service }],
					walletConnector: [{ type: WalletConnectorType.EntityStorage }],
					faucetConnector: [{ type: FaucetConnectorType.EntityStorage }],
					identityConnector: [{ type: IdentityConnectorType.EntityStorage }],
					identityResolverConnector: [{ type: IdentityResolverConnectorType.EntityStorage }],
					identityProfileConnector: [{ type: IdentityProfileConnectorType.EntityStorage }],
					identityComponent: [{ type: IdentityComponentType.Service }],
					identityResolverComponent: [{ type: IdentityResolverComponentType.Service }],
					identityProfileComponent: [{ type: IdentityProfileComponentType.Service }],
					nftConnector: [{ type: NftConnectorType.EntityStorage }],
					nftComponent: [{ type: NftComponentType.Service }],
					attestationConnector: [{ type: AttestationConnectorType.Nft }],
					attestationComponent: [{ type: AttestationComponentType.Service }],
					auditableItemGraphComponent: [{ type: AuditableItemGraphComponentType.Service }],
					auditableItemStreamComponent: [{ type: AuditableItemStreamComponentType.Service }],
					dataConverterConnector: [
						{ type: DataConverterConnectorType.Json },
						{ type: DataConverterConnectorType.Xml }
					],
					dataExtractorConnector: [{ type: DataExtractorConnectorType.JsonPath }],
					dataProcessingComponent: [{ type: DataProcessingComponentType.Service }],
					documentManagementComponent: [{ type: DocumentManagementComponentType.Service }],
					federatedCatalogueComponent: [
						{
							type: FederatedCatalogueComponentType.Service,
							options: { config: { clearingHouseApproverList: [] } }
						}
					]
				}
			},
			stateStorage: new MemoryStateStorage()
		});

		const canContinue = await engine.start();
		await engine.stop();

		Factory.clearFactories();

		const cloneData = engine.getCloneData();
		const clone = new Engine();
		clone.populateClone(cloneData);
		const canContinue2 = await clone.start();

		expect(canContinue).toEqual(true);
		expect(canContinue2).toEqual(true);
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
				messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
				messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
				messagingPushNotificationConnector: [
					{ type: MessagingPushNotificationConnectorType.EntityStorage }
				],
				messagingComponent: [{ type: MessagingComponentType.Service }],
				vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
				verifiableStorageConnector: [{ type: VerifiableStorageConnectorType.EntityStorage }],
				verifiableStorageComponent: [{ type: VerifiableStorageComponentType.Service }],
				immutableProofComponent: [{ type: ImmutableProofComponentType.Service }],
				walletConnector: [{ type: WalletConnectorType.EntityStorage }],
				faucetConnector: [{ type: FaucetConnectorType.EntityStorage }],
				identityConnector: [{ type: IdentityConnectorType.EntityStorage }],
				identityResolverConnector: [{ type: IdentityResolverConnectorType.EntityStorage }],
				identityProfileConnector: [{ type: IdentityProfileConnectorType.EntityStorage }],
				identityComponent: [{ type: IdentityComponentType.Service }],
				identityResolverComponent: [{ type: IdentityResolverComponentType.Service }],
				identityProfileComponent: [{ type: IdentityProfileComponentType.Service }],
				nftConnector: [{ type: NftConnectorType.EntityStorage }],
				nftComponent: [{ type: NftComponentType.Service }],
				attestationConnector: [{ type: AttestationConnectorType.Nft }],
				attestationComponent: [{ type: AttestationComponentType.Service }],
				auditableItemGraphComponent: [{ type: AuditableItemGraphComponentType.Service }],
				auditableItemStreamComponent: [{ type: AuditableItemStreamComponentType.Service }],
				dataConverterConnector: [
					{ type: DataConverterConnectorType.Json },
					{ type: DataConverterConnectorType.Xml }
				],
				dataExtractorConnector: [{ type: DataExtractorConnectorType.JsonPath }],
				dataProcessingComponent: [{ type: DataProcessingComponentType.Service }],
				documentManagementComponent: [{ type: DocumentManagementComponentType.Service }],
				federatedCatalogueComponent: [
					{
						type: FederatedCatalogueComponentType.Service,
						options: { config: { clearingHouseApproverList: [] } }
					}
				]
			}
		};
		const engine = new Engine({
			config,
			stateStorage: new MemoryStateStorage()
		});

		const canContinue = await engine.start();
		await engine.stop();

		Factory.clearFactories();

		const cloneData = engine.getCloneData();
		const clone = new Engine();
		clone.populateClone(cloneData, true);
		const canContinue2 = await clone.start();

		expect(canContinue).toEqual(true);
		expect(canContinue2).toEqual(true);
		expect(clone.getConfig()).toEqual(engine.getConfig());
		expect(clone.getState()).toEqual(engine.getState());
		expect(clone.getDefaultTypes()).toEqual(engine.getDefaultTypes());
	});
});
