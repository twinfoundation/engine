# Class: EnvHelper

Environment variable helper.

## Constructors

### new EnvHelper()

> **new EnvHelper**(): [`EnvHelper`](EnvHelper.md)

#### Returns

[`EnvHelper`](EnvHelper.md)

## Methods

### envToJson()

> `static` **envToJson**\<`T`\>(`envVars`, `prefix`): `T`

Get the environment variable as an object with camel cased names.

#### Type Parameters

• **T** = [`IEngineEnvironmentVariables`](../interfaces/IEngineEnvironmentVariables.md)

#### Parameters

• **envVars**

The environment variables.

• **prefix**: `string`

The prefix of the environment variables.

#### Returns

`T`

The object with camel cased names.
