# Function: initialiseWalletStorage()

> **initialiseWalletStorage**(`engineCore`, `context`, `instanceConfig`, `overrideInstanceType?`): `undefined` \| `string`

Initialise the wallet storage.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`WalletConnectorConfig`](../type-aliases/WalletConnectorConfig.md)

The instance config.

### overrideInstanceType?

`string`

The instance type to override the default.

## Returns

`undefined` \| `string`

Nothing.

## Throws

GeneralError if the connector type is unknown.
