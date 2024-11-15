# Interface: IEngineCoreOptions

The options for creating engine core.

## Properties

### config?

> `optional` **config**: `IEngineCoreConfig`

The engine core config.

***

### stateStorage?

> `optional` **stateStorage**: `IEngineStateStorage`

The state storage component.

***

### skipBootstrap?

> `optional` **skipBootstrap**: `boolean`

Skip the bootstrap process, useful for additional engine instances.

***

### customBootstrap()?

> `optional` **customBootstrap**: (`engineCore`, `context`) => `Promise`\<`void`\>

Custom bootstrap method for the engine.

#### Parameters

• **engineCore**: `IEngineCore`

• **context**: `IEngineCoreContext`

#### Returns

`Promise`\<`void`\>
