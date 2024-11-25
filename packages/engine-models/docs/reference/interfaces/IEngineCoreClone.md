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