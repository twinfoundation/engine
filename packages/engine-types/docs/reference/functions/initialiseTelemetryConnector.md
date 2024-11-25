# Function: initialiseTelemetryConnector()

> **initialiseTelemetryConnector**(`engineCore`, `context`, `instanceConfig`, `overrideInstanceType`?): `string` \| `undefined`

Initialise a telemetry connector.

## Parameters

• **engineCore**: `IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md), `IEngineState`\>

The engine core.

• **context**: `IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md), `IEngineState`\>

The context for the engine.

• **instanceConfig**: [`TelemetryConnectorConfig`](../type-aliases/TelemetryConnectorConfig.md)

The instance config.

• **overrideInstanceType?**: `string`

The instance type to override the default.

## Returns

`string` \| `undefined`

The name of the instance created.

## Throws

GeneralError if the connector type is unknown.
