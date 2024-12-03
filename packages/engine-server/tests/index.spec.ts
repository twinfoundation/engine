// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { ComponentFactory, I18n, ObjectHelper } from "@twin.org/core";
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
	EntityStorageComponentType,
	EntityStorageConnectorType,
	EventBusComponentType,
	EventBusConnectorType,
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
} from "@twin.org/engine-types";
import { entity, EntitySchemaFactory, EntitySchemaHelper, property } from "@twin.org/entity";
import type { IEntityStorageComponent } from "@twin.org/entity-storage-models";
import { nameof } from "@twin.org/nameof";
import packageLocales from "../locales/en.json";
import { EngineServer } from "../src/engineServer";

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
		ComponentFactory.clear();
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
				auditableItemStreamComponent: [{ type: AuditableItemStreamComponentType.Service }],
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
		await engineServer.start();

		const res = await fetch("http://localhost:3000/info");
		expect(await res.json()).toEqual({
			name: "foo",
			version: "1"
		});

		await engineServer.stop();
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
		await engineServer.start();

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

		await engineServer.start();

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

		await engineServer.start();

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
