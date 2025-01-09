# Function: initialiseEntityStorageConnector()

> **initialiseEntityStorageConnector**(`engineCore`, `context`, `typeCustom`, `schema`): `void`

Initialise the entity storage connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### typeCustom

Override the type of connector to use instead of default configuration.

`undefined` | `string`

### schema

`string`

The schema for the entity storage.

## Returns

`void`

## Throws

GeneralError if the connector type is unknown.
