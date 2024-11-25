# Interface: IEngineServerConfig

Extended engine server config with known types.

## Extends

- `IEngineConfig`

## Properties

### debug?

> `optional` **debug**: `boolean`

Start the engine in debug mode.

#### Default

```ts
false
```

#### Inherited from

`IEngineConfig.debug`

***

### silent?

> `optional` **silent**: `boolean`

Disable output to the console.

#### Default

```ts
false
```

#### Inherited from

`IEngineConfig.silent`

***

### web?

> `optional` **web**: `IWebServerOptions`

Configuration for the web server.

***

### types

> **types**: `object` & `object`

The types to initialise in the engine.

#### Type declaration

##### loggingConnector?

> `optional` **loggingConnector**: `IEngineCoreTypeConfig`\<`LoggingConnectorConfig`\>[]

Logging connector options which can be overridden by individual components by specifying types other than default.

##### loggingComponent?

> `optional` **loggingComponent**: `IEngineCoreTypeConfig`\<`LoggingComponentConfig`\>[]

Logging component options which can be overridden by individual components by specifying types other than default.

##### entityStorageConnector?

> `optional` **entityStorageConnector**: `IEngineCoreTypeConfig`\<`EntityStorageConnectorConfig`\>[]

Entity storage connector options which can be overridden by individual components by specifying types other than default.

##### entityStorageComponent?

> `optional` **entityStorageComponent**: `IEngineCoreTypeConfig`\<`EntityStorageComponentConfig`\>[]

Entity storage component options which can be overridden by individual components by specifying types other than default.

##### blobStorageConnector?

> `optional` **blobStorageConnector**: `IEngineCoreTypeConfig`\<`BlobStorageConnectorConfig`\>[]

Blob storage connector options which can be overridden by individual components by specifying types other than default.

##### blobStorageComponent?

> `optional` **blobStorageComponent**: `IEngineCoreTypeConfig`\<`BlobStorageComponentConfig`\>[]

Blob storage component options which can be overridden by individual components by specifying types other than default.

##### telemetryConnector?

> `optional` **telemetryConnector**: `IEngineCoreTypeConfig`\<`TelemetryConnectorConfig`\>[]

Telemetry connector options which can be overridden by individual components by specifying types other than default.

##### telemetryComponent?

> `optional` **telemetryComponent**: `IEngineCoreTypeConfig`\<`TelemetryComponentConfig`\>[]

Telemetry component options which can be overridden by individual components by specifying types other than default.

##### backgroundTaskConnector?

> `optional` **backgroundTaskConnector**: `IEngineCoreTypeConfig`\<`BackgroundTaskConnectorConfig`\>[]

Background task connector options which can be overridden by individual components by specifying types other than default.

##### vaultConnector?

> `optional` **vaultConnector**: `IEngineCoreTypeConfig`\<`VaultConnectorConfig`\>[]

Vault connector options which can be overridden by individual components by specifying types other than default.

##### dltConfig?

> `optional` **dltConfig**: `IEngineCoreTypeConfig`\<`DltConfig`\>[]

DLT options which can be overridden by individual components by specifying types other than default.

##### walletConnector?

> `optional` **walletConnector**: `IEngineCoreTypeConfig`\<`WalletConnectorConfig`\>[]

Wallet connector options which can be overridden by individual components by specifying types other than default.

##### immutableStorageConnector?

> `optional` **immutableStorageConnector**: `IEngineCoreTypeConfig`\<`ImmutableStorageConnectorConfig`\>[]

Immutable storage connector options which can be overridden by individual components by specifying types other than default.

##### immutableProofComponent?

> `optional` **immutableProofComponent**: `IEngineCoreTypeConfig`\<`ImmutableProofComponentConfig`\>[]

Immutable proof component options which can be overridden by individual components by specifying types other than default.

##### faucetConnector?

> `optional` **faucetConnector**: `IEngineCoreTypeConfig`\<`FaucetConnectorConfig`\>[]

Faucet connector options which can be overridden by individual components by specifying types other than default.

##### identityConnector?

> `optional` **identityConnector**: `IEngineCoreTypeConfig`\<`IdentityConnectorConfig`\>[]

Identity connector options which can be overridden by individual components by specifying types other than default.

##### identityComponent?

> `optional` **identityComponent**: `IEngineCoreTypeConfig`\<`IdentityComponentConfig`\>[]

Identity component profile options which can be overridden by individual components by specifying types other than default.

##### identityProfileConnector?

> `optional` **identityProfileConnector**: `IEngineCoreTypeConfig`\<`IdentityProfileConnectorConfig`\>[]

Identity profile connector options which can be overridden by individual components by specifying types other than default.

##### identityProfileComponent?

> `optional` **identityProfileComponent**: `IEngineCoreTypeConfig`\<`IdentityProfileComponentConfig`\>[]

Identity profile component profile options which can be overridden by individual components by specifying types other than default.

##### nftConnector?

> `optional` **nftConnector**: `IEngineCoreTypeConfig`\<`NftConnectorConfig`\>[]

NFT connector options which can be overridden by individual components by specifying types other than default.

##### nftComponent?

> `optional` **nftComponent**: `IEngineCoreTypeConfig`\<`NftComponentConfig`\>[]

NFT component options which can be overridden by individual components by specifying types other than default.

##### attestationConnector?

> `optional` **attestationConnector**: `IEngineCoreTypeConfig`\<`AttestationConnectorConfig`\>[]

Attestation connector options which can be overridden by individual components by specifying types other than default.

##### attestationComponent?

> `optional` **attestationComponent**: `IEngineCoreTypeConfig`\<`AttestationComponentConfig`\>[]

Attestation component profile options which can be overridden by individual components by specifying types other than default.

##### auditableItemGraphComponent?

> `optional` **auditableItemGraphComponent**: `IEngineCoreTypeConfig`\<`AuditableItemGraphComponentConfig`\>[]

Auditable item graph component options which can be overridden by individual components by specifying types other than default.

##### auditableItemStreamComponent?

> `optional` **auditableItemStreamComponent**: `IEngineCoreTypeConfig`\<`AuditableItemStreamComponentConfig`\>[]

Auditable item stream component profile options which can be overridden by individual components by specifying types other than default.

#### Type declaration

##### informationComponent?

> `optional` **informationComponent**: `IEngineCoreTypeConfig`\<[`InformationComponentConfig`](../type-aliases/InformationComponentConfig.md)\>[]

Information component options which can be overridden by individual components by specifying types other than default..

##### restRouteProcessor?

> `optional` **restRouteProcessor**: `IEngineCoreTypeConfig`\<[`RestRouteProcessorConfig`](../type-aliases/RestRouteProcessorConfig.md)\>[]

REST route processors options which can be overridden by individual components by specifying types other than default..

##### socketRouteProcessor?

> `optional` **socketRouteProcessor**: `IEngineCoreTypeConfig`\<[`SocketRouteProcessorConfig`](../type-aliases/SocketRouteProcessorConfig.md)\>[]

Socket route processors options which can be overridden by individual components by specifying types other than default..

##### mimeTypeProcessor?

> `optional` **mimeTypeProcessor**: `IEngineCoreTypeConfig`\<[`MimeTypeProcessorConfig`](../type-aliases/MimeTypeProcessorConfig.md)\>[]

Mime type processors options which can be overridden by individual components by specifying types other than default..

##### authenticationComponent?

> `optional` **authenticationComponent**: `IEngineCoreTypeConfig`\<[`AuthenticationComponentConfig`](../type-aliases/AuthenticationComponentConfig.md)\>[]

Authentication component options which can be overridden by individual components by specifying types other than default..

#### Overrides

`IEngineConfig.types`
