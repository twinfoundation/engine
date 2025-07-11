# Function: initialiseMessagingEmailConnector()

> **initialiseMessagingEmailConnector**(`engineCore`, `context`, `instanceConfig`, `overrideInstanceType?`): `undefined` \| `string`

Initialise a messaging email connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`MessagingEmailConnectorConfig`](../type-aliases/MessagingEmailConnectorConfig.md)

The instance config.

### overrideInstanceType?

`string`

The instance type to override the default.

## Returns

`undefined` \| `string`

The name of the instance created.

## Throws

GeneralError if the connector type is unknown.
