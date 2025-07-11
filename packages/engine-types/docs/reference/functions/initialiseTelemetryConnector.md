# Function: initialiseTelemetryConnector()

> **initialiseTelemetryConnector**(`engineCore`, `context`, `instanceConfig`, `overrideInstanceType?`): `undefined` \| `string`

Initialise a telemetry connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`TelemetryConnectorConfig`](../type-aliases/TelemetryConnectorConfig.md)

The instance config.

### overrideInstanceType?

`string`

The instance type to override the default.

## Returns

`undefined` \| `string`

The name of the instance created.

## Throws

GeneralError if the connector type is unknown.
