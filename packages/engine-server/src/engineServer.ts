// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRoute, ISocketRoute, IWebServer } from "@twin.org/api-models";
import {
	MimeTypeProcessorFactory,
	RestRouteProcessorFactory,
	SocketRouteProcessorFactory
} from "@twin.org/api-models";
import { FastifyWebServer } from "@twin.org/api-server-fastify";
import { Guards, Is, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreTypeConfig, IEngineServer } from "@twin.org/engine-models";
import {
	RestRouteProcessorType,
	SocketRouteProcessorType,
	type IEngineServerConfig
} from "@twin.org/engine-server-types";
import { ModuleHelper } from "@twin.org/modules";
import { nameof } from "@twin.org/nameof";

/**
 * Server for the engine.
 */
export class EngineServer<T extends IEngineServerConfig = IEngineServerConfig>
	implements IEngineServer
{
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<EngineServer>();

	/**
	 * The engine.
	 * @internal
	 */
	private readonly _engineCore: IEngineCore<T>;

	/**
	 * The REST route generators.
	 * @internal
	 */
	private readonly _restRouteGenerators: {
		type: string;
		typeConfig: IEngineCoreTypeConfig[];
		module: string;
		method: string;
	}[];

	/**
	 * The socket route generators.
	 * @internal
	 */
	private readonly _socketRouteGenerators: {
		type: string;
		typeConfig: IEngineCoreTypeConfig[];
		module: string;
		method: string;
	}[];

	/**
	 * The web server.
	 * @internal
	 */
	private _webServer?: IWebServer<unknown>;

	/**
	 * The logging component type.
	 * @internal
	 */
	private _loggingComponentType?: string;

	/**
	 * The REST routes for the application.
	 * @internal
	 */
	private _restRoutes: IRestRoute[];

	/**
	 * The Socket routes for the application.
	 * @internal
	 */
	private _socketRoutes: ISocketRoute[];

	/**
	 * Create a new instance of EngineServer.
	 * @param options The options for the engine.
	 * @param options.engineCore The engine core to serve from.
	 */
	constructor(options: { engineCore: IEngineCore<T> }) {
		Guards.object(this.CLASS_NAME, nameof(options), options);
		Guards.object(this.CLASS_NAME, nameof(options.engineCore), options.engineCore);

		this._engineCore = options.engineCore;
		this._restRouteGenerators = [];
		this._socketRouteGenerators = [];
		this._restRoutes = [];
		this._socketRoutes = [];

		const coreConfig = this._engineCore.getConfig();

		if (!Is.arrayValue(coreConfig.types.restRouteProcessor)) {
			coreConfig.types.restRouteProcessor = [];

			if (!coreConfig.silent) {
				coreConfig.types.restRouteProcessor.push({
					type: RestRouteProcessorType.Logging,
					options: {
						config: {
							includeBody: coreConfig.debug
						}
					}
				});
			}
			coreConfig.types.restRouteProcessor.push({
				type: RestRouteProcessorType.RestRoute,
				options: {
					config: {
						includeErrorStack: coreConfig.debug
					}
				}
			});
		}

		if (!Is.arrayValue(coreConfig.types.socketRouteProcessor)) {
			coreConfig.types.socketRouteProcessor = [];

			if (!coreConfig.silent) {
				coreConfig.types.socketRouteProcessor.push({
					type: SocketRouteProcessorType.Logging,
					options: {
						config: {
							includeBody: coreConfig.debug
						}
					}
				});
			}
			coreConfig.types.socketRouteProcessor.push({
				type: SocketRouteProcessorType.SocketRoute,
				options: {
					config: {
						includeErrorStack: coreConfig.debug
					}
				}
			});
		}

		this.addServerTypeInitialisers();
		this.addServerRestRouteGenerators();
		this.addServerSocketRouteGenerators();
	}

	/**
	 * Add a REST route generator.
	 * @param type The type to add the generator for.
	 * @param typeConfig The type config.
	 * @param module The module containing the generator.
	 * @param method The method to call on the module.
	 */
	public addRestRouteGenerator(
		type: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		module: string,
		method: string
	): void {
		if (!Is.empty(typeConfig)) {
			this._restRouteGenerators.push({
				type,
				typeConfig,
				module,
				method
			});
		}
	}

	/**
	 * Add a socket route generator.
	 * @param type The type to add the generator for.
	 * @param typeConfig The type config.
	 * @param module The module containing the generator.
	 * @param method The method to call on the module.
	 */
	public addSocketRouteGenerator(
		type: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		module: string,
		method: string
	): void {
		if (!Is.empty(typeConfig)) {
			this._socketRouteGenerators.push({
				type,
				typeConfig,
				module,
				method
			});
		}
	}

	/**
	 * Get the built REST routes.
	 * @returns The REST routes.
	 */
	public getRestRoutes(): IRestRoute[] {
		return this._restRoutes;
	}

	/**
	 * Get the built socket routes.
	 * @returns The socket routes.
	 */
	public getSocketRoutes(): ISocketRoute[] {
		return this._socketRoutes;
	}

	/**
	 * Start the engine server.
	 * @returns True if the start was successful.
	 */
	public async start(): Promise<boolean> {
		const canContinue = await this._engineCore.start();

		if (canContinue) {
			await this.startWebServer();
		}

		return canContinue;
	}

	/**
	 * Stop the engine server.
	 * @returns Nothing.
	 */
	public async stop(): Promise<void> {
		if (this._webServer) {
			await this._webServer.stop();
			this._webServer = undefined;
		}

		await this._engineCore.stop();
	}

	/**
	 * Starts the web server.
	 * @internal
	 */
	private async startWebServer(): Promise<void> {
		this._restRoutes = await this.buildRestRoutes();
		this._socketRoutes = await this.buildSocketRoutes();
		const restRouteProcessors = RestRouteProcessorFactory.names().map(n =>
			RestRouteProcessorFactory.get(n)
		);
		const socketRouteProcessors = SocketRouteProcessorFactory.names().map(n =>
			SocketRouteProcessorFactory.get(n)
		);
		const mimeTypeProcessors = MimeTypeProcessorFactory.names().map(n =>
			MimeTypeProcessorFactory.get(n)
		);

		const coreConfig = this._engineCore.getConfig();
		const defaults = this._engineCore.getDefaultTypes();
		this._loggingComponentType = coreConfig.silent ? undefined : defaults.loggingComponent;

		this._webServer = new FastifyWebServer({
			loggingComponentType: this._loggingComponentType,
			mimeTypeProcessors
		});

		await this._webServer.build(
			restRouteProcessors,
			this._restRoutes,
			socketRouteProcessors,
			this._socketRoutes,
			coreConfig.web
		);
		await this._webServer.start();
	}

	/**
	 * The REST routes for the application.
	 * @returns The REST routes for the application.
	 * @internal
	 */
	private async buildRestRoutes(): Promise<IRestRoute[]> {
		const routes: IRestRoute[] = [];

		for (const { type, typeConfig, module, method } of this._restRouteGenerators) {
			await this.initialiseRestTypeRoute(routes, type, typeConfig, module, method);
		}

		return routes;
	}

	/**
	 * The socket routes for the application.
	 * @returns The socket routes for the application.
	 * @internal
	 */
	private async buildSocketRoutes(): Promise<ISocketRoute[]> {
		const routes: ISocketRoute[] = [];

		for (const { type, typeConfig, module, method } of this._socketRouteGenerators) {
			await this.initialiseSocketTypeRoute(routes, type, typeConfig, module, method);
		}

		return routes;
	}

	/**
	 * Initialise the rest routes from connector.
	 * @param routes The routes to add to.
	 * @param typeKey The key for the default types.
	 * @param typeConfig The type config.
	 * @param generateRoutes The function to generate the routes.
	 * @internal
	 */
	private async initialiseRestTypeRoute(
		routes: IRestRoute[],
		typeKey: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		module: string,
		method: string
	): Promise<void> {
		if (Is.arrayValue(typeConfig)) {
			const defaultEngineTypes = this._engineCore.getDefaultTypes();

			const generateRoutes = await ModuleHelper.getModuleEntry<
				(baseRouteName: string, componentName: string) => IRestRoute[]
			>(module, method);

			for (let i = 0; i < typeConfig.length; i++) {
				const restPath = typeConfig[i].restPath;

				if (Is.string(restPath)) {
					const serviceType = typeConfig[i].overrideInstanceType ?? defaultEngineTypes[typeKey];
					if (Is.stringValue(serviceType)) {
						const generatedRoutes = generateRoutes(restPath, serviceType);
						for (const route of generatedRoutes) {
							// Don't strip trailing slashes from the root path.
							if (Is.stringValue(route.path) && route.path.length > 1) {
								route.path = StringHelper.trimTrailingSlashes(route.path);
							}
						}
						routes.push(...generatedRoutes);
					}
				}
			}
		}
	}

	/**
	 * Initialise the socket routes from connector.
	 * @param routes The routes to add to.
	 * @param typeKey The key for the default types.
	 * @param typeConfig The type config.
	 * @param module The module containing the generator.
	 * @param method The method to call on the module.
	 * @internal
	 */
	private async initialiseSocketTypeRoute(
		routes: ISocketRoute[],
		typeKey: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		module: string,
		method: string
	): Promise<void> {
		if (Is.arrayValue(typeConfig)) {
			const defaultEngineTypes = this._engineCore.getDefaultTypes();

			const generateRoutes = await ModuleHelper.getModuleEntry<
				(baseRouteName: string, componentName: string) => ISocketRoute[]
			>(module, method);

			for (let i = 0; i < typeConfig.length; i++) {
				const socketPath = typeConfig[i].socketPath;
				if (Is.string(socketPath)) {
					const serviceType = typeConfig[i].overrideInstanceType ?? defaultEngineTypes[typeKey];
					if (Is.stringValue(serviceType)) {
						routes.push(...generateRoutes(socketPath, serviceType));
					}
				}
			}
		}
	}

	/**
	 * Add the server type initializers.
	 * @internal
	 */
	private addServerTypeInitialisers(): void {
		const coreConfig = this._engineCore.getConfig();

		this._engineCore.addTypeInitialiser(
			"authenticationAdminComponent",
			coreConfig.types.authenticationAdminComponent,
			"@twin.org/engine-server-types",
			"initialiseAuthenticationAdminComponent"
		);
		this._engineCore.addTypeInitialiser(
			"authenticationComponent",
			coreConfig.types.authenticationComponent,
			"@twin.org/engine-server-types",
			"initialiseAuthenticationComponent"
		);
		this._engineCore.addTypeInitialiser(
			"informationComponent",
			coreConfig.types.informationComponent,
			"@twin.org/engine-server-types",
			"initialiseInformationComponent"
		);
		this._engineCore.addTypeInitialiser(
			"restRouteProcessor",
			coreConfig.types.restRouteProcessor,
			"@twin.org/engine-server-types",
			"initialiseRestRouteProcessorComponent"
		);
		this._engineCore.addTypeInitialiser(
			"socketRouteProcessor",
			coreConfig.types.socketRouteProcessor,
			"@twin.org/engine-server-types",
			"initialiseSocketRouteProcessorComponent"
		);
		this._engineCore.addTypeInitialiser(
			"mimeTypeProcessor",
			coreConfig.types.mimeTypeProcessor,
			"@twin.org/engine-server-types",
			"initialiseMimeTypeProcessorComponent"
		);
	}

	/**
	 * Add the server REST route generators.
	 * @internal
	 */
	private addServerRestRouteGenerators(): void {
		const coreConfig = this._engineCore.getConfig();

		this.addRestRouteGenerator(
			"informationComponent",
			coreConfig.types.informationComponent,
			"@twin.org/api-service",
			"generateRestRoutesInformation"
		);

		this.addRestRouteGenerator(
			"authenticationComponent",
			coreConfig.types.authenticationComponent,
			"@twin.org/api-auth-entity-storage-service",
			"generateRestRoutesAuthentication"
		);

		this.addRestRouteGenerator(
			"loggingComponent",
			coreConfig.types.loggingComponent,
			"@twin.org/logging-service",
			"generateRestRoutesLogging"
		);
		this.addRestRouteGenerator(
			"telemetryComponent",
			coreConfig.types.telemetryComponent,
			"@twin.org/telemetry-service",
			"generateRestRoutesTelemetry"
		);
		this.addRestRouteGenerator(
			"blobStorageComponent",
			coreConfig.types.blobStorageComponent,
			"@twin.org/blob-storage-service",
			"generateRestRoutesBlobStorage"
		);
		this.addRestRouteGenerator(
			"identityComponent",
			coreConfig.types.identityComponent,
			"@twin.org/identity-service",
			"generateRestRoutesIdentity"
		);
		this.addRestRouteGenerator(
			"identityResolverComponent",
			coreConfig.types.identityResolverComponent,
			"@twin.org/identity-service",
			"generateRestRoutesIdentityResolver"
		);
		this.addRestRouteGenerator(
			"identityProfileComponent",
			coreConfig.types.identityProfileComponent,
			"@twin.org/identity-service",
			"generateRestRoutesIdentityProfile"
		);
		this.addRestRouteGenerator(
			"nftComponent",
			coreConfig.types.nftComponent,
			"@twin.org/nft-service",
			"generateRestRoutesNft"
		);
		this.addRestRouteGenerator(
			"verifiableStorageComponent",
			coreConfig.types.verifiableStorageComponent,
			"@twin.org/verifiable-storage-service",
			"generateRestRoutesVerifiableStorage"
		);
		this.addRestRouteGenerator(
			"attestationComponent",
			coreConfig.types.attestationComponent,
			"@twin.org/attestation-service",
			"generateRestRoutesAttestation"
		);
		this.addRestRouteGenerator(
			"immutableProofComponent",
			coreConfig.types.immutableProofComponent,
			"@twin.org/immutable-proof-service",
			"generateRestRoutesImmutableProof"
		);
		this.addRestRouteGenerator(
			"auditableItemGraphComponent",
			coreConfig.types.auditableItemGraphComponent,
			"@twin.org/auditable-item-graph-service",
			"generateRestRoutesAuditableItemGraph"
		);
		this.addRestRouteGenerator(
			"auditableItemStreamComponent",
			coreConfig.types.auditableItemStreamComponent,
			"@twin.org/auditable-item-stream-service",
			"generateRestRoutesAuditableItemStream"
		);
		this.addRestRouteGenerator(
			"entityStorageComponent",
			coreConfig.types.entityStorageComponent,
			"@twin.org/entity-storage-service",
			"generateRestRoutesEntityStorage"
		);
		this.addRestRouteGenerator(
			"dataProcessingComponent",
			coreConfig.types.dataProcessingComponent,
			"@twin.org/data-processing-service",
			"generateRestRoutesDataProcessing"
		);
		this.addRestRouteGenerator(
			"documentManagementComponent",
			coreConfig.types.documentManagementComponent,
			"@twin.org/document-management-service",
			"generateRestRoutesDocumentManagement"
		);
		this.addRestRouteGenerator(
			"federatedCatalogueComponent",
			coreConfig.types.federatedCatalogueComponent,
			"@twin.org/federated-catalogue-service",
			"generateRestRoutesFederatedCatalogue"
		);
		this.addRestRouteGenerator(
			"rightsManagementComponent",
			coreConfig.types.rightsManagementComponent,
			"@twin.org/rights-management-service",
			"generateRestRoutesRightsManagement"
		);
	}

	/**
	 * Add the server socket route generators.
	 * @internal
	 */
	private addServerSocketRouteGenerators(): void {
		const coreConfig = this._engineCore.getConfig();

		this.addSocketRouteGenerator(
			"eventBusComponent",
			coreConfig.types.eventBusComponent,
			"@twin.org/event-bus-service",
			"generateSocketRoutesEventBus"
		);
	}
}
