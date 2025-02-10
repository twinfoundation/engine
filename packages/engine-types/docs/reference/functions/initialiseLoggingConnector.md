# Function: initialiseLoggingConnector()

> **initialiseLoggingConnector**(`engineCore`, `context`, `instanceConfig`, `overrideInstanceType`?): `undefined` \| `string`

Initialise the logging connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core context.

### instanceConfig

[`LoggingConnectorConfig`](../type-aliases/LoggingConnectorConfig.md)

The instance config.

### overrideInstanceType?

`string`

The instance type to override the default.

## Returns

`undefined` \| `string`

The name of the instance created.

## Throws

GeneralError if the connector type is unknown.
