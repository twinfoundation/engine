# Function: buildEngineServerConfiguration()

> **buildEngineServerConfiguration**(`envVars`, `coreEngineConfig`, `serverInfo`, `openApiSpecPath?`): `IEngineServerConfig`

Handles the configuration of the server.

## Parameters

### envVars

[`IEngineServerEnvironmentVariables`](../interfaces/IEngineServerEnvironmentVariables.md)

The environment variables.

### coreEngineConfig

`IEngineCoreConfig`

The core engine config.

### serverInfo

`IServerInfo`

The server information.

### openApiSpecPath?

`string`

The path to the open api spec.

## Returns

`IEngineServerConfig`

The the config for the core and the server.
