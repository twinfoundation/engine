# Function: initialiseSocketRouteProcessorComponent()

> **initialiseSocketRouteProcessorComponent**(`engineCore`, `context`, `instanceConfig`, `overrideInstanceType`?): `undefined` \| `string`

Initialise the socket route processor.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`SocketRouteProcessorConfig`](../type-aliases/SocketRouteProcessorConfig.md)

The instance config.

### overrideInstanceType?

`string`

The instance type to override the default.

## Returns

`undefined` \| `string`

The name of the instance created.

## Throws

GeneralError if the component type is unknown.
