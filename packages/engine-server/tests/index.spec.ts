// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { ComponentFactory, Factory, I18n, ObjectHelper } from "@twin.org/core";
import { Engine } from "@twin.org/engine";
import engineLocales from "@twin.org/engine-core/locales/en.json";
import type { IEngineCoreTypeConfig } from "@twin.org/engine-models";
import {
	InformationComponentType,
	RestRouteProcessorType,
	SocketRouteProcessorType,
	type IEngineServerConfig
} from "@twin.org/engine-server-types";
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
	IdentityComponentType,
	IdentityConnectorType,
	IdentityProfileComponentType,
	IdentityProfileConnectorType,
	IdentityResolverComponentType,
	IdentityResolverConnectorType,
	ImmutableProofComponentType,
	VerifiableStorageComponentType,
	VerifiableStorageConnectorType,
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
	WalletConnectorType,
	FederatedCatalogueComponentType,
	RightsManagementComponentType,
	RightsManagementPapComponentType,
	TaskSchedulerComponentType
} from "@twin.org/engine-types";
import { entity, EntitySchemaFactory, EntitySchemaHelper, property } from "@twin.org/entity";
import type { IEntityStorageComponent } from "@twin.org/entity-storage-models";
import { nameof } from "@twin.org/nameof";
import packageLocales from "../locales/en.json";
import { EngineServer } from "../src/engineServer";
import { addDefaultRestPaths } from "../src/utils/engineServerEnvBuilder";

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

describe("engine-server", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", ObjectHelper.merge(engineLocales, packageLocales));
	});

	beforeEach(async () => {
		Factory.clearFactories();
	});

	test("Can start engine server with no config", async () => {
		const engine = new Engine();
		const engineServer = new EngineServer({ engineCore: engine });
		await engineServer.start();
		await engineServer.stop();
		expect(engineServer).toBeDefined();
	});

	test("Can start engine server with config", async () => {
		const config: IEngineServerConfig = {
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
				],
				rightsManagementComponent: [
					{
						type: RightsManagementComponentType.Service
					}
				],
				rightsManagementPapComponent: [
					{
						type: RightsManagementPapComponentType.Service
					}
				],
				taskSchedulerComponent: [
					{
						type: TaskSchedulerComponentType.Default
					}
				],
				informationComponent: [
					{
						type: InformationComponentType.Service,
						options: {
							config: {
								serverInfo: {
									name: "foo",
									version: "1"
								}
							}
						},
						restPath: ""
					}
				],
				restRouteProcessor: [
					{
						type: RestRouteProcessorType.RestRoute
					}
				],
				socketRouteProcessor: [
					{
						type: SocketRouteProcessorType.SocketRoute
					}
				]
			}
		};
		const engine = new Engine({
			config
		});
		const engineServer = new EngineServer({
			engineCore: engine
		});

		addDefaultRestPaths(config);
		const canContinue = await engineServer.start();

		const buildRestRoutes = engineServer.getRestRoutes();
		expect(buildRestRoutes.map(r => r.path)).toEqual([
			"/",
			"/info",
			"/health",
			"/spec",
			"logging/",
			"logging/",
			"telemetry/metric",
			"telemetry/metric/:id",
			"telemetry/metric/:id",
			"telemetry/metric/:id/value",
			"telemetry/metric/:id",
			"telemetry/metric",
			"telemetry/metric/:id/value",
			"blob/",
			"blob/:id",
			"blob/:id/content",
			"blob/:id",
			"blob/:id",
			"blob/",
			"identity/",
			"identity/:identity/verification-method",
			"identity/:identity/verification-method/:verificationMethodId",
			"identity/:identity/service",
			"identity/:identity/service/:serviceId",
			"identity/:identity/verifiable-credential",
			"identity/verifiable-credential/verify",
			"identity/:identity/verifiable-credential/revoke/:revocationIndex",
			"identity/:identity/verifiable-credential/unrevoke/:revocationIndex",
			"identity/:identity/verifiable-presentation",
			"identity/verifiable-presentation/verify",
			"identity/:identity/proof",
			"identity/proof/verify",
			"identity/:identity",
			"identity/profile/",
			"identity/profile/",
			"identity/profile/:identity/public",
			"identity/profile/",
			"identity/profile/",
			"identity/profile/query/",
			"nft/",
			"nft/:id",
			"nft/:id",
			"nft/:id/transfer",
			"nft/:id",
			"verifiable/",
			"verifiable/:id",
			"verifiable/:id",
			"verifiable/:id",
			"attestation/",
			"attestation/:id",
			"attestation/:id/transfer",
			"attestation/:id",
			"immutable-proof/",
			"immutable-proof/:id",
			"immutable-proof/:id/verify",
			"aig/",
			"aig/:id",
			"aig/:id",
			"aig/",
			"ais/",
			"ais/:id",
			"ais/:id",
			"ais/:id",
			"ais/",
			"ais/:id",
			"ais/:id/:entryId",
			"ais/:id/:entryId/object",
			"ais/:id/:entryId",
			"ais/:id/:entryId",
			"ais/:id/entries",
			"ais/:id/entries/objects",
			"data-processing/rule-group/:id",
			"data-processing/rule-group/:id",
			"data-processing/rule-group/:id",
			"data-processing/extract",
			"data-processing/convert",
			"data-processing/rule-group",
			"documents/",
			"documents/:auditableItemGraphDocumentId",
			"documents/:auditableItemGraphDocumentId",
			"documents/:auditableItemGraphDocumentId/:revision",
			"documents/:auditableItemGraphDocumentId/:revision",
			"documents/",
			"federated-catalogue/participant-credentials",
			"federated-catalogue/service-offering-credentials",
			"federated-catalogue/data-resource-credentials",
			"federated-catalogue/data-space-connector-credentials",
			"federated-catalogue/participants",
			"federated-catalogue/participants/:id",
			"federated-catalogue/service-offerings",
			"federated-catalogue/service-offerings/:id",
			"federated-catalogue/data-resources",
			"federated-catalogue/data-resources/:id",
			"federated-catalogue/data-space-connectors",
			"federated-catalogue/data-space-connectors/:id",
			"rights-management/pap/",
			"rights-management/pap/:id",
			"rights-management/pap/:id",
			"rights-management/pap/:id",
			"rights-management/pap/query"
		]);

		const res = await fetch("http://localhost:3000/info");
		expect(await res.json()).toEqual({
			name: "foo",
			version: "1"
		});

		await engineServer.stop();
		expect(canContinue).toEqual(true);
		expect(engineServer).toBeDefined();
	});

	test("Can start engine server with custom rest path", async () => {
		const engine = new Engine({
			config: {
				silent: true,
				types: {
					informationComponent: [
						{
							type: InformationComponentType.Service,
							options: {
								config: {
									serverInfo: {
										name: "foo",
										version: "1"
									}
								}
							},
							restPath: "/foo"
						}
					]
				}
			}
		});
		const engineServer = new EngineServer({
			engineCore: engine
		});
		const canContinue = await engineServer.start();
		expect(canContinue).toEqual(true);

		const res = await fetch("http://localhost:3000/foo/info");
		expect(await res.json()).toEqual({
			name: "foo",
			version: "1"
		});

		await engineServer.stop();
		expect(engineServer).toBeDefined();
	});

	test("Can start engine server with custom component and rest path", async () => {
		const customTypeConfig: IEngineCoreTypeConfig[] = [
			{ type: "test-type", restPath: "test", options: { value: 1234 } }
		];

		const engine = new Engine();

		engine.addTypeInitialiser(
			"test-type",
			customTypeConfig,
			`file://${path.join(__dirname, "testComponent.js")}`,
			"testTypeInitialiser"
		);

		const engineServer = new EngineServer({
			engineCore: engine
		});

		engineServer.addRestRouteGenerator(
			"test-type",
			customTypeConfig,
			`file://${path.join(__dirname, "testComponent.js")}`,
			"generateRestRoutes"
		);

		const canContinue = await engineServer.start();
		expect(canContinue).toEqual(true);

		const res = await fetch("http://localhost:3000/test/value");
		expect(await res.json()).toEqual({
			value: 1234
		});

		await engineServer.stop();
		expect(engineServer).toBeDefined();
	});

	test("Can start server with custom entity storage, custom store and REST endpoint", async () => {
		EntitySchemaFactory.register(nameof<TestEntity>(), () =>
			EntitySchemaHelper.getSchema(TestEntity)
		);

		const engine = new Engine({
			config: {
				debug: true,
				types: {
					entityStorageConnector: [
						{
							type: EntityStorageConnectorType.Memory,
							overrideInstanceType: "test-entity"
						}
					],
					entityStorageComponent: [
						{
							type: EntityStorageComponentType.Service,
							options: {
								entityStorageType: nameof<TestEntity>(),
								config: { includeNodeIdentity: false, includeUserIdentity: false }
							},
							restPath: "foo"
						}
					]
				}
			}
		});

		const engineServer = new EngineServer({
			engineCore: engine
		});

		const canContinue = await engineServer.start();
		expect(canContinue).toEqual(true);

		const service = ComponentFactory.get<IEntityStorageComponent<TestEntity>>("test-entity");
		await service.set({ id: "test1234" });

		const res = await fetch("http://localhost:3000/foo/test1234");
		expect(await res.json()).toEqual({
			id: "test1234"
		});

		const item = await service.get("test1234");
		expect(item?.id).toEqual("test1234");

		await engineServer.stop();
	});
});
