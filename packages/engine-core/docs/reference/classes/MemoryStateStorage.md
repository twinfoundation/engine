# Class: MemoryStateStorage\<S\>

Store state in memory.

## Type Parameters

• **S** *extends* `IEngineState` = `IEngineState`

## Implements

- `IEngineStateStorage`\<`S`\>

## Constructors

### new MemoryStateStorage()

> **new MemoryStateStorage**\<`S`\>(`readonlyMode`): [`MemoryStateStorage`](MemoryStateStorage.md)\<`S`\>

Create a new instance of MemoryStateStorage.

#### Parameters

• **readonlyMode**: `boolean` = `false`

Whether the file is in read-only mode.

#### Returns

[`MemoryStateStorage`](MemoryStateStorage.md)\<`S`\>

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### load()

> **load**(`engineCore`): `Promise`\<`undefined` \| `S`\>

Method for loading the state.

#### Parameters

• **engineCore**: `IEngineCore`\<`IEngineState`\>

The engine core to load the state for.

#### Returns

`Promise`\<`undefined` \| `S`\>

The state of the engine or undefined if it doesn't exist.

#### Implementation of

`IEngineStateStorage.load`

***

### save()

> **save**(`engineCore`, `state`): `Promise`\<`void`\>

Method for saving the state.

#### Parameters

• **engineCore**: `IEngineCore`\<`IEngineState`\>

The engine core to save the state for.

• **state**: `S`

The state of the engine to save.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IEngineStateStorage.save`
