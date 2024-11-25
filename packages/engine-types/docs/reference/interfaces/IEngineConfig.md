# Interface: IEngineConfig

Extended engine core config with known types.

## Extends

- `IEngineCoreConfig`

## Properties

### debug?

> `optional` **debug**: `boolean`

Start the engine in debug mode.

#### Default

```ts
false
```

#### Inherited from

`IEngineCoreConfig.debug`

***

### silent?

> `optional` **silent**: `boolean`

Disable output to the console.

#### Default

```ts
false
```

#### Inherited from

`IEngineCoreConfig.silent`

***

### types

> **types**: `object`

The types to initialise in the engine.

#### Index Signature

 \[`type`: `string`\]: `IEngineCoreTypeConfig`[] \| `undefined`

#### loggingConnector?

> `optional` **loggingConnector**: `IEngineCoreTypeConfig`\<[`LoggingConnectorConfig`](../type-aliases/LoggingConnectorConfig.md)\>[]

Logging connector options which can be overridden by individual components by specifying types other than default.

#### loggingComponent?

> `optional` **loggingComponent**: `IEngineCoreTypeConfig`\<[`LoggingComponentConfig`](../type-aliases/LoggingComponentConfig.md)\>[]

Logging component options which can be overridden by individual components by specifying types other than default.

#### entityStorageConnector?

> `optional` **entityStorageConnector**: `IEngineCoreTypeConfig`\<[`EntityStorageConnectorConfig`](../type-aliases/EntityStorageConnectorConfig.md)\>[]

Entity storage connector options which can be overridden by individual components by specifying types other than default.

#### entityStorageComponent?

> `optional` **entityStorageComponent**: `IEngineCoreTypeConfig`\<[`EntityStorageComponentConfig`](../type-aliases/EntityStorageComponentConfig.md)\>[]

Entity storage component options which can be overridden by individual components by specifying types other than default.

#### blobStorageConnector?

> `optional` **blobStorageConnector**: `IEngineCoreTypeConfig`\<[`BlobStorageConnectorConfig`](../type-aliases/BlobStorageConnectorConfig.md)\>[]

Blob storage connector options which can be overridden by individual components by specifying types other than default.

#### blobStorageComponent?

> `optional` **blobStorageComponent**: `IEngineCoreTypeConfig`\<[`BlobStorageComponentConfig`](../type-aliases/BlobStorageComponentConfig.md)\>[]

Blob storage component options which can be overridden by individual components by specifying types other than default.

#### telemetryConnector?

> `optional` **telemetryConnector**: `IEngineCoreTypeConfig`\<[`TelemetryConnectorConfig`](../type-aliases/TelemetryConnectorConfig.md)\>[]

Telemetry connector options which can be overridden by individual components by specifying types other than default.

#### telemetryComponent?

> `optional` **telemetryComponent**: `IEngineCoreTypeConfig`\<[`TelemetryComponentConfig`](../type-aliases/TelemetryComponentConfig.md)\>[]

Telemetry component options which can be overridden by individual components by specifying types other than default.

#### backgroundTaskConnector?

> `optional` **backgroundTaskConnector**: `IEngineCoreTypeConfig`\<[`BackgroundTaskConnectorConfig`](../type-aliases/BackgroundTaskConnectorConfig.md)\>[]

Background task connector options which can be overridden by individual components by specifying types other than default.

#### vaultConnector?

> `optional` **vaultConnector**: `IEngineCoreTypeConfig`\<[`VaultConnectorConfig`](../type-aliases/VaultConnectorConfig.md)\>[]

Vault connector options which can be overridden by individual components by specifying types other than default.

#### dltConfig?

> `optional` **dltConfig**: `IEngineCoreTypeConfig`\<[`DltConfig`](../type-aliases/DltConfig.md)\>[]

DLT options which can be overridden by individual components by specifying types other than default.

#### walletConnector?

> `optional` **walletConnector**: `IEngineCoreTypeConfig`\<[`WalletConnectorConfig`](../type-aliases/WalletConnectorConfig.md)\>[]

Wallet connector options which can be overridden by individual components by specifying types other than default.

#### immutableStorageConnector?

> `optional` **immutableStorageConnector**: `IEngineCoreTypeConfig`\<[`ImmutableStorageConnectorConfig`](../type-aliases/ImmutableStorageConnectorConfig.md)\>[]

Immutable storage connector options which can be overridden by individual components by specifying types other than default.

#### immutableProofComponent?

> `optional` **immutableProofComponent**: `IEngineCoreTypeConfig`\<[`ImmutableProofComponentConfig`](../type-aliases/ImmutableProofComponentConfig.md)\>[]

Immutable proof component options which can be overridden by individual components by specifying types other than default.

#### faucetConnector?

> `optional` **faucetConnector**: `IEngineCoreTypeConfig`\<[`FaucetConnectorConfig`](../type-aliases/FaucetConnectorConfig.md)\>[]

Faucet connector options which can be overridden by individual components by specifying types other than default.

#### identityConnector?

> `optional` **identityConnector**: `IEngineCoreTypeConfig`\<[`IdentityConnectorConfig`](../type-aliases/IdentityConnectorConfig.md)\>[]

Identity connector options which can be overridden by individual components by specifying types other than default.

#### identityComponent?

> `optional` **identityComponent**: `IEngineCoreTypeConfig`\<[`IdentityComponentConfig`](../type-aliases/IdentityComponentConfig.md)\>[]

Identity component profile options which can be overridden by individual components by specifying types other than default.

#### identityProfileConnector?

> `optional` **identityProfileConnector**: `IEngineCoreTypeConfig`\<[`IdentityProfileConnectorConfig`](../type-aliases/IdentityProfileConnectorConfig.md)\>[]

Identity profile connector options which can be overridden by individual components by specifying types other than default.

#### identityProfileComponent?

> `optional` **identityProfileComponent**: `IEngineCoreTypeConfig`\<[`IdentityProfileComponentConfig`](../type-aliases/IdentityProfileComponentConfig.md)\>[]

Identity profile component profile options which can be overridden by individual components by specifying types other than default.

#### nftConnector?

> `optional` **nftConnector**: `IEngineCoreTypeConfig`\<[`NftConnectorConfig`](../type-aliases/NftConnectorConfig.md)\>[]

NFT connector options which can be overridden by individual components by specifying types other than default.

#### nftComponent?

> `optional` **nftComponent**: `IEngineCoreTypeConfig`\<[`NftComponentConfig`](../type-aliases/NftComponentConfig.md)\>[]

NFT component options which can be overridden by individual components by specifying types other than default.

#### attestationConnector?

> `optional` **attestationConnector**: `IEngineCoreTypeConfig`\<[`AttestationConnectorConfig`](../type-aliases/AttestationConnectorConfig.md)\>[]

Attestation connector options which can be overridden by individual components by specifying types other than default.

#### attestationComponent?

> `optional` **attestationComponent**: `IEngineCoreTypeConfig`\<[`AttestationComponentConfig`](../type-aliases/AttestationComponentConfig.md)\>[]

Attestation component profile options which can be overridden by individual components by specifying types other than default.

#### auditableItemGraphComponent?

> `optional` **auditableItemGraphComponent**: `IEngineCoreTypeConfig`\<[`AuditableItemGraphComponentConfig`](../type-aliases/AuditableItemGraphComponentConfig.md)\>[]

Auditable item graph component options which can be overridden by individual components by specifying types other than default.

#### auditableItemStreamComponent?

> `optional` **auditableItemStreamComponent**: `IEngineCoreTypeConfig`\<[`AuditableItemStreamComponentConfig`](../type-aliases/AuditableItemStreamComponentConfig.md)\>[]

Auditable item stream component profile options which can be overridden by individual components by specifying types other than default.

#### Overrides

`IEngineCoreConfig.types`
