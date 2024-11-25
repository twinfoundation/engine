# Function: initialiseWalletStorage()

> **initialiseWalletStorage**(`engineCore`, `context`, `instanceConfig`, `overrideInstanceType`?): `string` \| `undefined`

Initialise the wallet storage.

## Parameters

• **engineCore**: `IEngineCore`\<[`IEngineCoreTypesConfig`](../interfaces/IEngineCoreTypesConfig.md), `IEngineState`\>

The engine core.

• **context**: `IEngineCoreContext`\<[`IEngineCoreTypesConfig`](../interfaces/IEngineCoreTypesConfig.md), `IEngineState`\>

The context for the engine.

• **instanceConfig**: [`WalletConnectorConfig`](../type-aliases/WalletConnectorConfig.md)

The instance config.

• **overrideInstanceType?**: `string`

The instance type to override the default.

## Returns

`string` \| `undefined`

Nothing.

## Throws

GeneralError if the connector type is unknown.
