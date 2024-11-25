# Function: initialiseAuditableItemGraphComponent()

> **initialiseAuditableItemGraphComponent**(`engineCore`, `context`, `instanceConfig`, `overrideInstanceType`?): `string` \| `undefined`

Initialise the auditable item graph component.

## Parameters

• **engineCore**: `IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md), `IEngineState`\>

The engine core.

• **context**: `IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md), `IEngineState`\>

The context for the engine.

• **instanceConfig**: [`AuditableItemGraphComponentConfig`](../type-aliases/AuditableItemGraphComponentConfig.md)

The instance config.

• **overrideInstanceType?**: `string`

The instance type to override the default.

## Returns

`string` \| `undefined`

The name of the instance created.

## Throws

GeneralError if the component type is unknown.
