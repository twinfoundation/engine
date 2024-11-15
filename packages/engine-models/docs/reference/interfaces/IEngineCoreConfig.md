# Interface: IEngineCoreConfig

Configuration for the engine core.

## Properties

### debug?

> `optional` **debug**: `boolean`

Start the engine in debug mode.

#### Default

```ts
false
```

***

### silent?

> `optional` **silent**: `boolean`

Disable output to the console.

#### Default

```ts
false
```

***

### loggingConnector?

> `optional` **loggingConnector**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`LoggingConnectorConfig`](../type-aliases/LoggingConnectorConfig.md)\>[]

Logging connector options which can be overridden by individual components by specifying types other than default.

***

### loggingComponent?

> `optional` **loggingComponent**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`LoggingComponentConfig`](../type-aliases/LoggingComponentConfig.md)\>[]

Logging component options which can be overridden by individual components by specifying types other than default.

***

### entityStorageConnector?

> `optional` **entityStorageConnector**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`EntityStorageConnectorConfig`](../type-aliases/EntityStorageConnectorConfig.md)\>[]

Entity storage connector options which can be overridden by individual components by specifying types other than default.

***

### entityStorageComponent?

> `optional` **entityStorageComponent**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`EntityStorageComponentConfig`](../type-aliases/EntityStorageComponentConfig.md)\>[]

Entity storage component options which can be overridden by individual components by specifying types other than default.

***

### blobStorageConnector?

> `optional` **blobStorageConnector**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`BlobStorageConnectorConfig`](../type-aliases/BlobStorageConnectorConfig.md)\>[]

Blob storage connector options which can be overridden by individual components by specifying types other than default.

***

### blobStorageComponent?

> `optional` **blobStorageComponent**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`BlobStorageComponentConfig`](../type-aliases/BlobStorageComponentConfig.md)\>[]

Blob storage component options which can be overridden by individual components by specifying types other than default.

***

### telemetryConnector?

> `optional` **telemetryConnector**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`TelemetryConnectorConfig`](../type-aliases/TelemetryConnectorConfig.md)\>[]

Telemetry connector options which can be overridden by individual components by specifying types other than default.

***

### telemetryComponent?

> `optional` **telemetryComponent**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`TelemetryComponentConfig`](../type-aliases/TelemetryComponentConfig.md)\>[]

Telemetry component options which can be overridden by individual components by specifying types other than default.

***

### backgroundTaskConnector?

> `optional` **backgroundTaskConnector**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`BackgroundTaskConnectorConfig`](../type-aliases/BackgroundTaskConnectorConfig.md)\>[]

Background task connector options which can be overridden by individual components by specifying types other than default.

***

### vaultConnector?

> `optional` **vaultConnector**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`VaultConnectorConfig`](../type-aliases/VaultConnectorConfig.md)\>[]

Vault connector options which can be overridden by individual components by specifying types other than default.

***

### dltConfig?

> `optional` **dltConfig**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`DltConfig`](../type-aliases/DltConfig.md)\>[]

DLT options which can be overridden by individual components by specifying types other than default.

***

### walletConnector?

> `optional` **walletConnector**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`WalletConnectorConfig`](../type-aliases/WalletConnectorConfig.md)\>[]

Wallet connector options which can be overridden by individual components by specifying types other than default.

***

### immutableStorageConnector?

> `optional` **immutableStorageConnector**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`ImmutableStorageConnectorConfig`](../type-aliases/ImmutableStorageConnectorConfig.md)\>[]

Immutable storage connector options which can be overridden by individual components by specifying types other than default.

***

### immutableProofComponent?

> `optional` **immutableProofComponent**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`ImmutableProofComponentConfig`](../type-aliases/ImmutableProofComponentConfig.md)\>[]

Immutable proof component options which can be overridden by individual components by specifying types other than default.

***

### faucetConnector?

> `optional` **faucetConnector**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`FaucetConnectorConfig`](../type-aliases/FaucetConnectorConfig.md)\>[]

Faucet connector options which can be overridden by individual components by specifying types other than default.

***

### identityConnector?

> `optional` **identityConnector**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`IdentityConnectorConfig`](../type-aliases/IdentityConnectorConfig.md)\>[]

Identity connector options which can be overridden by individual components by specifying types other than default.

***

### identityComponent?

> `optional` **identityComponent**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`IdentityComponentConfig`](../type-aliases/IdentityComponentConfig.md)\>[]

Identity component profile options which can be overridden by individual components by specifying types other than default.

***

### identityProfileConnector?

> `optional` **identityProfileConnector**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`IdentityProfileConnectorConfig`](../type-aliases/IdentityProfileConnectorConfig.md)\>[]

Identity profile connector options which can be overridden by individual components by specifying types other than default.

***

### identityProfileComponent?

> `optional` **identityProfileComponent**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`IdentityProfileComponentConfig`](../type-aliases/IdentityProfileComponentConfig.md)\>[]

Identity profile component profile options which can be overridden by individual components by specifying types other than default.

***

### nftConnector?

> `optional` **nftConnector**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`NftConnectorConfig`](../type-aliases/NftConnectorConfig.md)\>[]

NFT connector options which can be overridden by individual components by specifying types other than default.

***

### nftComponent?

> `optional` **nftComponent**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`NftComponentConfig`](../type-aliases/NftComponentConfig.md)\>[]

NFT component options which can be overridden by individual components by specifying types other than default.

***

### attestationConnector?

> `optional` **attestationConnector**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`AttestationConnectorConfig`](../type-aliases/AttestationConnectorConfig.md)\>[]

Attestation connector options which can be overridden by individual components by specifying types other than default.

***

### attestationComponent?

> `optional` **attestationComponent**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`AttestationComponentConfig`](../type-aliases/AttestationComponentConfig.md)\>[]

Attestation component profile options which can be overridden by individual components by specifying types other than default.

***

### auditableItemGraphComponent?

> `optional` **auditableItemGraphComponent**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`AuditableItemGraphComponentConfig`](../type-aliases/AuditableItemGraphComponentConfig.md)\>[]

Auditable item graph component options which can be overridden by individual components by specifying types other than default.

***

### auditableItemStreamComponent?

> `optional` **auditableItemStreamComponent**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`AuditableItemStreamComponentConfig`](../type-aliases/AuditableItemStreamComponentConfig.md)\>[]

Auditable item stream component profile options which can be overridden by individual components by specifying types other than default.
