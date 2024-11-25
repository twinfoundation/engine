# Function: initialiseRestRouteProcessorComponent()

> **initialiseRestRouteProcessorComponent**(`engineCore`, `context`, `instanceConfig`, `overrideInstanceType`?): `string` \| `undefined`

Initialise the rest route processor.

## Parameters

• **engineCore**: `IEngineCore`\<[`IEngineServerTypesConfig`](../interfaces/IEngineServerTypesConfig.md), `IEngineState`\>

The engine core.

• **context**: `IEngineCoreContext`\<[`IEngineServerTypesConfig`](../interfaces/IEngineServerTypesConfig.md), `IEngineState`\>

The context for the engine.

• **instanceConfig**: [`RestRouteProcessorConfig`](../type-aliases/RestRouteProcessorConfig.md)

The instance config.

• **overrideInstanceType?**: `string`

The instance type to override the default.

## Returns

`string` \| `undefined`

The name of the instance created.

## Throws

GeneralError if the component type is unknown.
