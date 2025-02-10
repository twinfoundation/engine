# Function: initialiseImmutableStorageConnector()

> **initialiseImmutableStorageConnector**(`engineCore`, `context`, `instanceConfig`, `overrideInstanceType`?): `undefined` \| `string`

Initialise the immutable storage connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`ImmutableStorageConnectorConfig`](../type-aliases/ImmutableStorageConnectorConfig.md)

The instance config.

### overrideInstanceType?

`string`

The instance type to override the default.

## Returns

`undefined` \| `string`

The name of the instance created.

## Throws

GeneralError if the connector type is unknown.
