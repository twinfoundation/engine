# Interface: IEngineStateStorage\<S\>

Definition of state storage for engine.

## Type Parameters

### S

`S` *extends* [`IEngineState`](IEngineState.md) = [`IEngineState`](IEngineState.md)

## Methods

### load()

> **load**(`engineCore`): `Promise`\<`undefined` \| `S`\>

Method for loading the state.

#### Parameters

##### engineCore

[`IEngineCore`](IEngineCore.md)

The engine core to load the state for.

#### Returns

`Promise`\<`undefined` \| `S`\>

The state of the engine or undefined if it doesn't exist.

***

### save()

> **save**(`engineCore`, `state`): `Promise`\<`void`\>

Method for saving the state.

#### Parameters

##### engineCore

[`IEngineCore`](IEngineCore.md)

The engine core to save the state for.

##### state

`S`

The state of the engine to save.

#### Returns

`Promise`\<`void`\>

Nothing.
