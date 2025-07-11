# Class: MemoryStateStorage\<S\>

Store state in memory.

## Type Parameters

### S

`S` *extends* `IEngineState` = `IEngineState`

## Implements

- `IEngineStateStorage`\<`S`\>

## Constructors

### Constructor

> **new MemoryStateStorage**\<`S`\>(`readonlyMode`, `state?`): `MemoryStateStorage`\<`S`\>

Create a new instance of MemoryStateStorage.

#### Parameters

##### readonlyMode

`boolean` = `false`

Whether the file is in read-only mode.

##### state?

`S`

The initial state.

#### Returns

`MemoryStateStorage`\<`S`\>

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### load()

> **load**(`engineCore`): `Promise`\<`undefined` \| `S`\>

Method for loading the state.

#### Parameters

##### engineCore

`IEngineCore`

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

##### engineCore

`IEngineCore`

The engine core to save the state for.

##### state

`S`

The state of the engine to save.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IEngineStateStorage.save`
