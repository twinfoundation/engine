# Function: initialiseBackgroundTaskConnector()

> **initialiseBackgroundTaskConnector**(`engineCore`, `context`, `instanceConfig`, `overrideInstanceType`?): `string` \| `undefined`

Initialise a background task connector.

## Parameters

• **engineCore**: `IEngineCore`\<[`IEngineCoreTypesConfig`](../interfaces/IEngineCoreTypesConfig.md), `IEngineState`\>

The engine core.

• **context**: `IEngineCoreContext`\<[`IEngineCoreTypesConfig`](../interfaces/IEngineCoreTypesConfig.md), `IEngineState`\>

The context for the engine.

• **instanceConfig**: [`BackgroundTaskConnectorConfig`](../type-aliases/BackgroundTaskConnectorConfig.md)

The instance config.

• **overrideInstanceType?**: `string`

The instance type to override the default.

## Returns

`string` \| `undefined`

The name of the instance created.

## Throws

GeneralError if the connector type is unknown.
