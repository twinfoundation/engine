# Interface: IEngineCoreOptions\<C, S\>

The options for creating engine core.

## Type Parameters

• **C** *extends* `IEngineCoreConfig` = `IEngineCoreConfig`

• **S** *extends* `IEngineState` = `IEngineState`

## Properties

### config?

> `optional` **config**: `C`

The engine core config.

***

### stateStorage?

> `optional` **stateStorage**: `IEngineStateStorage`\<`S`\>

The state storage component.

***

### skipBootstrap?

> `optional` **skipBootstrap**: `boolean`

Skip the bootstrap process, useful for additional engine instances.

***

### populateTypeInitialisers()?

> `optional` **populateTypeInitialisers**: (`engineCore`, `context`) => `void`

Populate the type initialisers for the engine.

#### Parameters

• **engineCore**: `IEngineCore`\<`C`, `S`\>

• **context**: `IEngineCoreContext`\<`C`, `S`\>

#### Returns

`void`

***

### customBootstrap()?

> `optional` **customBootstrap**: (`engineCore`, `context`) => `Promise`\<`void`\>

Custom bootstrap method for the engine.

#### Parameters

• **engineCore**: `IEngineCore`\<`C`, `S`\>

• **context**: `IEngineCoreContext`\<`C`, `S`\>

#### Returns

`Promise`\<`void`\>

***

### loggerTypeName?

> `optional` **loggerTypeName**: `string`

The name of the logger to use in the engine.

#### Default

```ts
engine
```
