// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { generateRestRoutesAuthentication } from "@twin.org/api-auth-entity-storage-service";
import type { IRestRoute, ISocketRoute, IWebServer } from "@twin.org/api-models";
import {
	MimeTypeProcessorFactory,
	RestRouteProcessorFactory,
	SocketRouteProcessorFactory
} from "@twin.org/api-models";
import { FastifyWebServer } from "@twin.org/api-server-fastify";
import { generateRestRoutesInformation } from "@twin.org/api-service";
import { generateRestRoutesAttestation } from "@twin.org/attestation-service";
import { generateRestRoutesAuditableItemGraph } from "@twin.org/auditable-item-graph-service";
import { generateRestRoutesAuditableItemStream } from "@twin.org/auditable-item-stream-service";
import { generateRestRoutesBlobStorage } from "@twin.org/blob-storage-service";
import { Guards, Is } from "@twin.org/core";
import {
	type IEngineCore,
	type IEngineCoreTypeConfig,
	type IEngineServer,
	type IEngineServerConfig,
	type RestRouteGenerator,
	RestRouteProcessorType,
	type SocketRouteGenerator
} from "@twin.org/engine-models";
import { generateRestRoutesEntityStorage } from "@twin.org/entity-storage-service";
import {
	generateRestRoutesIdentity,
	generateRestRoutesIdentityProfile
} from "@twin.org/identity-service";
import { generateRestRoutesLogging } from "@twin.org/logging-service";
import { nameof } from "@twin.org/nameof";
import { generateRestRoutesNft } from "@twin.org/nft-service";
import { generateRestRoutesTelemetry } from "@twin.org/telemetry-service";
import { initialiseAuthenticationComponent } from "./components/authentication";
import { initialiseInformationComponent } from "./components/information";
import { initialiseMimeTypeProcessorComponent } from "./components/mimeTypeProcessor";
import { initialiseRestRouteProcessorComponent } from "./components/restRouteProcessor";
import { initialiseSocketRouteProcessorComponent } from "./components/socketRouteProcessor";

/**
 * Server for the engine.
 */
export class EngineServer implements IEngineServer {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<EngineServer>();

	/**
	 * The server config.
	 */
	protected readonly _config: IEngineServerConfig;

	/**
	 * The engine.
	 * @internal
	 */
	private readonly _engineCore: IEngineCore;

	/**
	 * The REST route generators.
	 * @internal
	 */
	private readonly _restRouteGenerators: {
		type: string;
		typeConfig: IEngineCoreTypeConfig[];
		generator: RestRouteGenerator;
	}[];

	/**
	 * The socket route generators.
	 * @internal
	 */
	private readonly _socketRouteGenerators: {
		type: string;
		typeConfig: IEngineCoreTypeConfig[];
		generator: SocketRouteGenerator;
	}[];

	/**
	 * The web server.
	 * @internal
	 */
	private _webServer?: IWebServer<unknown>;

	/**
	 * The logging connector type.
	 * @internal
	 */
	private _loggingConnectorType?: string;

	/**
	 * Create a new instance of EngineServer.
	 * @param options The options for the engine.
	 * @param options.server The server options for the engine.
	 * @param options.engineCore The engine core to serve from.
	 */
	constructor(options: { engineCore: IEngineCore; server?: IEngineServerConfig }) {
		Guards.object(this.CLASS_NAME, nameof(options), options);
		Guards.object(this.CLASS_NAME, nameof(options.engineCore), options.engineCore);

		this._config = options?.server ?? {};
		this._engineCore = options.engineCore;
		this._restRouteGenerators = [];
		this._socketRouteGenerators = [];

		const coreConfig = this._engineCore.getConfig();

		if (!Is.arrayValue(this._config.restRouteProcessor)) {
			this._config.restRouteProcessor = [];

			if (!coreConfig.silent) {
				this._config.restRouteProcessor.push({
					type: RestRouteProcessorType.Logging,
					options: {
						config: {
							includeBody: coreConfig.debug
						}
					}
				});
			}
			this._config.restRouteProcessor.push({
				type: RestRouteProcessorType.RestRoute,
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
	 * @param generator The generator to add.
	 */
	public addRestRouteGenerator(
		type: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		generator: RestRouteGenerator
	): void {
		if (!Is.empty(typeConfig)) {
			this._restRouteGenerators.push({
				type,
				typeConfig,
				generator
			});
		}
	}

	/**
	 * Add a socket route generator.
	 * @param type The type to add the generator for.
	 * @param typeConfig The type config.
	 * @param generator The generator to add.
	 */
	public addSocketRouteGenerator(
		type: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		generator: SocketRouteGenerator
	): void {
		if (!Is.empty(typeConfig)) {
			this._socketRouteGenerators.push({
				type,
				typeConfig,
				generator
			});
		}
	}

	/**
	 * Start the engine server.
	 * @returns Nothing.
	 */
	public async start(): Promise<void> {
		await this._engineCore.start();

		await this.startWebServer();
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
		const restRoutes = this.buildRestRoutes();
		const socketRoutes = this.buildSocketRoutes();
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
		this._loggingConnectorType = coreConfig.silent ? undefined : defaults.loggingConnector;

		this._webServer = new FastifyWebServer({
			loggingConnectorType: this._loggingConnectorType,
			mimeTypeProcessors
		});

		await this._webServer.build(
			restRouteProcessors,
			restRoutes,
			socketRouteProcessors,
			socketRoutes,
			this._config.web
		);
		await this._webServer.start();
	}

	/**
	 * The REST routes for the application.
	 * @returns The REST routes for the application.
	 * @internal
	 */
	private buildRestRoutes(): IRestRoute[] {
		const routes: IRestRoute[] = [];

		for (const { type, typeConfig, generator } of this._restRouteGenerators) {
			this.initialiseRestTypeRoute(routes, type, typeConfig, generator);
		}

		return routes;
	}

	/**
	 * The socket routes for the application.
	 * @returns The socket routes for the application.
	 * @internal
	 */
	private buildSocketRoutes(): ISocketRoute[] {
		const routes: ISocketRoute[] = [];

		for (const { type, typeConfig, generator } of this._socketRouteGenerators) {
			this.initialiseSocketTypeRoute(routes, type, typeConfig, generator);
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
	private initialiseRestTypeRoute(
		routes: IRestRoute[],
		typeKey: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		generateRoutes: (baseRouteName: string, componentName: string) => IRestRoute[]
	): void {
		if (Is.arrayValue(typeConfig)) {
			const defaultEngineTypes = this._engineCore.getDefaultTypes();

			for (let i = 0; i < typeConfig.length; i++) {
				const restPath = typeConfig[i].restPath;
				if (Is.string(restPath)) {
					const serviceType = typeConfig[i].overrideInstanceType ?? defaultEngineTypes[typeKey];
					if (Is.stringValue(serviceType)) {
						routes.push(...generateRoutes(restPath, serviceType));
					}
				}
			}
		}
	}

	/**
	 * Initialise the rest routes from connector.
	 * @param routes The routes to add to.
	 * @param typeKey The key for the default types.
	 * @param typeConfig The type config.
	 * @param generateRoutes The function to generate the routes.
	 * @internal
	 */
	private initialiseSocketTypeRoute(
		routes: ISocketRoute[],
		typeKey: string,
		typeConfig: IEngineCoreTypeConfig[] | undefined,
		generateRoutes: (baseRouteName: string, componentName: string) => ISocketRoute[]
	): void {
		if (Is.arrayValue(typeConfig)) {
			const defaultEngineTypes = this._engineCore.getDefaultTypes();

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
		this._engineCore.addTypeInitialiser(
			"authenticationComponent",
			this._config.authenticationComponent,
			initialiseAuthenticationComponent
		);
		this._engineCore.addTypeInitialiser(
			"informationComponent",
			this._config.informationComponent,
			initialiseInformationComponent
		);
		this._engineCore.addTypeInitialiser(
			"restRouteProcessor",
			this._config.restRouteProcessor,
			initialiseRestRouteProcessorComponent
		);
		this._engineCore.addTypeInitialiser(
			"socketRouteProcessor",
			this._config.socketRouteProcessor,
			initialiseSocketRouteProcessorComponent
		);
		this._engineCore.addTypeInitialiser(
			"mimeTypeProcessor",
			this._config.mimeTypeProcessor,
			initialiseMimeTypeProcessorComponent
		);
	}

	/**
	 * Add the server REST route generators.
	 * @internal
	 */
	private addServerRestRouteGenerators(): void {
		this.addRestRouteGenerator(
			"informationComponent",
			this._config.informationComponent,
			generateRestRoutesInformation
		);

		this.addRestRouteGenerator(
			"authenticationComponent",
			this._config.authenticationComponent,
			generateRestRoutesAuthentication
		);

		const coreConfig = this._engineCore.getConfig();
		this.addRestRouteGenerator(
			"loggingComponent",
			coreConfig.loggingComponent,
			generateRestRoutesLogging
		);
		this.addRestRouteGenerator(
			"telemetryComponent",
			coreConfig.telemetryComponent,
			generateRestRoutesTelemetry
		);
		this.addRestRouteGenerator(
			"blobStorageComponent",
			coreConfig.blobStorageComponent,
			generateRestRoutesBlobStorage
		);
		this.addRestRouteGenerator(
			"identityComponent",
			coreConfig.identityComponent,
			generateRestRoutesIdentity
		);
		this.addRestRouteGenerator(
			"identityProfileComponent",
			coreConfig.identityProfileComponent,
			generateRestRoutesIdentityProfile
		);
		this.addRestRouteGenerator("nftComponent", coreConfig.nftComponent, generateRestRoutesNft);
		this.addRestRouteGenerator(
			"attestationComponent",
			coreConfig.attestationComponent,
			generateRestRoutesAttestation
		);
		this.addRestRouteGenerator(
			"auditableItemGraphComponent",
			coreConfig.auditableItemGraphComponent,
			generateRestRoutesAuditableItemGraph
		);
		this.addRestRouteGenerator(
			"auditableItemStreamComponent",
			coreConfig.auditableItemStreamComponent,
			generateRestRoutesAuditableItemStream
		);
		this.addRestRouteGenerator(
			"entityStorageComponent",
			coreConfig.entityStorageComponent,
			generateRestRoutesEntityStorage
		);
	}

	/**
	 * Add the server socket route generators.
	 * @internal
	 */
	private addServerSocketRouteGenerators(): void {
		// const coreConfig = this._engineCore.getConfig();
		// this.addSocketRouteGenerator("eventBusComponent", coreConfig.eventBusComponent, generateSocketRoutesEventBus);
	}
}
