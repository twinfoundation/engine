# Interface: IEngineStateStorage

Definition of state storage for engine.

## Methods

### load()

> **load**(`engineCore`): `Promise`\<`undefined` \| [`IEngineState`](IEngineState.md)\>

Method for loading the state.

#### Parameters

• **engineCore**: [`IEngineCore`](IEngineCore.md)

The engine core to load the state for.

#### Returns

`Promise`\<`undefined` \| [`IEngineState`](IEngineState.md)\>

The state of the engine or undefined if it doesn't exist.

***

### save()

> **save**(`engineCore`, `state`): `Promise`\<`void`\>

Method for saving the state.

#### Parameters

• **engineCore**: [`IEngineCore`](IEngineCore.md)

The engine core to save the state for.

• **state**: [`IEngineState`](IEngineState.md)

The state of the engine to save.

#### Returns

`Promise`\<`void`\>

Nothing.
