# Interface: IEngineCoreClone\<C, S\>

Interface describing the data required to clone an engine.

## Type Parameters

• **C** *extends* [`IEngineCoreConfig`](IEngineCoreConfig.md) = [`IEngineCoreConfig`](IEngineCoreConfig.md)

• **S** *extends* [`IEngineState`](IEngineState.md) = [`IEngineState`](IEngineState.md)

## Properties

### config

> **config**: `C`

The config for the engine.

***

### state

> **state**: `S`

The state of the engine.

***

### typeInitialisers

> **typeInitialisers**: `object`[]

The type initialisers for the engine.

#### type

> **type**: `string`

#### typeConfig

> **typeConfig**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)[]

#### module

> **module**: `string`

#### method

> **method**: `string`

***

### entitySchemas

> **entitySchemas**: `object`

The entity schemas for the engine.

#### Index Signature

\[`schema`: `string`\]: `IEntitySchema`

***

### loggerTypeName

> **loggerTypeName**: `string`

The logger type name.
