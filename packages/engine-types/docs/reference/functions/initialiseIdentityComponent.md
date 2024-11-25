# Function: initialiseIdentityComponent()

> **initialiseIdentityComponent**(`engineCore`, `context`, `instanceConfig`, `overrideInstanceType`?): `string` \| `undefined`

Initialise the identity component.

## Parameters

• **engineCore**: `IEngineCore`\<[`IEngineCoreTypesConfig`](../interfaces/IEngineCoreTypesConfig.md), `IEngineState`\>

The engine core.

• **context**: `IEngineCoreContext`\<[`IEngineCoreTypesConfig`](../interfaces/IEngineCoreTypesConfig.md), `IEngineState`\>

The context for the engine.

• **instanceConfig**: [`IdentityComponentConfig`](../type-aliases/IdentityComponentConfig.md)

The instance config.

• **overrideInstanceType?**: `string`

The instance type to override the default.

## Returns

`string` \| `undefined`

The name of the instance created.

## Throws

GeneralError if the component type is unknown.
