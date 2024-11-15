# Class: MemoryStateStorage

Store state in memory.

## Implements

- `IEngineStateStorage`

## Constructors

### new MemoryStateStorage()

> **new MemoryStateStorage**(`readonlyMode`): [`MemoryStateStorage`](MemoryStateStorage.md)

Create a new instance of MemoryStateStorage.

#### Parameters

• **readonlyMode**: `boolean` = `false`

Whether the file is in read-only mode.

#### Returns

[`MemoryStateStorage`](MemoryStateStorage.md)

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### load()

> **load**(`engineCore`): `Promise`\<`undefined` \| `IEngineState`\>

Method for loading the state.

#### Parameters

• **engineCore**: `IEngineCore`

The engine core to load the state for.

#### Returns

`Promise`\<`undefined` \| `IEngineState`\>

The state of the engine or undefined if it doesn't exist.

#### Implementation of

`IEngineStateStorage.load`

***

### save()

> **save**(`engineCore`, `state`): `Promise`\<`void`\>

Method for saving the state.

#### Parameters

• **engineCore**: `IEngineCore`

The engine core to save the state for.

• **state**: `IEngineState`

The state of the engine to save.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IEngineStateStorage.save`
