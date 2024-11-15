# Interface: IEngineCoreContext\<S\>

The context for the engine core.

## Type Parameters

• **S** *extends* [`IEngineState`](IEngineState.md) = [`IEngineState`](IEngineState.md)

## Properties

### config

> **config**: [`IEngineCoreConfig`](IEngineCoreConfig.md)

The engine core config.

***

### state

> **state**: `S`

The engine core state.

***

### stateDirty

> **stateDirty**: `boolean`

The state dirty flag, which flags that the state needs saving.

***

### defaultTypes

> **defaultTypes**: `object`

The default types to use when components don't have custom types.

#### Index Signature

 \[`type`: `string`\]: `string`

***

### componentInstances

> **componentInstances**: `object`[]

The components.
