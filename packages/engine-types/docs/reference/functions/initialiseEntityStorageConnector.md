# Function: initialiseEntityStorageConnector()

> **initialiseEntityStorageConnector**(`engineCore`, `context`, `typeCustom`, `schema`): `void`

Initialise the entity storage connector.

## Parameters

• **engineCore**: `IEngineCore`\<[`IEngineCoreTypesConfig`](../interfaces/IEngineCoreTypesConfig.md), `IEngineState`\>

The engine core.

• **context**: `IEngineCoreContext`\<[`IEngineCoreTypesConfig`](../interfaces/IEngineCoreTypesConfig.md), `IEngineState`\>

The context for the engine.

• **typeCustom**: `undefined` \| `string`

Override the type of connector to use instead of default configuration.

• **schema**: `string`

The schema for the entity storage.

## Returns

`void`

## Throws

GeneralError if the connector type is unknown.
