# Function: initialiseTelemetryComponent()

> **initialiseTelemetryComponent**(`engineCore`, `context`, `instanceConfig`, `overrideInstanceType?`): `undefined` \| `string`

Initialise the telemetry component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`TelemetryComponentConfig`](../type-aliases/TelemetryComponentConfig.md)

The instance config.

### overrideInstanceType?

`string`

The instance type to override the default.

## Returns

`undefined` \| `string`

The name of the instance created.

## Throws

GeneralError if the component type is unknown.
