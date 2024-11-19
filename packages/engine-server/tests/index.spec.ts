// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable max-classes-per-file */
import { ComponentFactory, I18n, ObjectHelper, type IComponent } from "@twin.org/core";
import { EngineCore } from "@twin.org/engine-core";
import engineLocales from "@twin.org/engine-core/locales/en.json" assert { type: "json" };
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
	type IEngineCoreTypeBaseConfig,
	type IEngineCoreTypeConfig,
	ImmutableProofComponentType,
	ImmutableStorageConnectorType,
	InformationComponentType,
	LoggingComponentType,
	LoggingConnectorType,
	NftComponentType,
	NftConnectorType,
	RestRouteProcessorType,
	TelemetryComponentType,
	TelemetryConnectorType,
	VaultConnectorType,
	WalletConnectorType
} from "@twin.org/engine-models";
import { entity, EntitySchemaFactory, EntitySchemaHelper, property } from "@twin.org/entity";
import type { IEntityStorageComponent } from "@twin.org/entity-storage-models";
import { nameof } from "@twin.org/nameof";
import packageLocales from "../locales/en.json";
import { EngineServer } from "../src/engineServer";

/**
 * Test component.
 */
class TestComponent implements IComponent {
	public readonly CLASS_NAME = "TestComponent";

	public value: number;

	/**
	 * Create a new instance of TestComponent.
	 * @param options The options for the component.
	 * @param options.value The value.
	 */
	constructor(options: { value: number }) {
		this.value = options.value;
	}
}

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
		const engineCore = new EngineCore();
		const engineServer = new EngineServer({ engineCore });
		await engineServer.start();
		await engineServer.stop();
		expect(engineServer).toBeDefined();
	});

	test("Can start engine server with config", async () => {
		const engineCore = new EngineCore({
			config: {
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
			}
		});
		const engineServer = new EngineServer({
			engineCore,
			server: {
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
				]
			}
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
		const engineCore = new EngineCore({
			config: { silent: true }
		});
		const engineServer = new EngineServer({
			engineCore,
			server: {
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

		const engineCore = new EngineCore();

		engineCore.addTypeInitialiser(
			"test-type",
			customTypeConfig,
			(
				core,
				context,
				instanceConfig: IEngineCoreTypeBaseConfig<{ value: number }>,
				overrideInstanceType?: string
			) => {
				ComponentFactory.register(
					"test-component",
					() => new TestComponent(instanceConfig.options ?? { value: 4567 })
				);
				return overrideInstanceType ?? "test-component";
			}
		);

		const engineServer = new EngineServer({
			engineCore
		});

		engineServer.addRestRouteGenerator(
			"test-type",
			customTypeConfig,
			(baseRouteName: string, componentName: string) => [
				{
					operationId: "test-op",
					summary: "value endpoint",
					tag: "bar",
					method: "GET",
					path: `${baseRouteName}/value`,
					handler: async (httpRequestContext, request) => {
						const component = ComponentFactory.get<TestComponent>(componentName);
						return {
							body: {
								value: component.value
							}
						};
					}
				}
			]
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

		const engineCore = new EngineCore({
			config: {
				debug: true,
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
		});
		const engineServer = new EngineServer({
			engineCore
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
