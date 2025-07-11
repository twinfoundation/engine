# Class: FileStateStorage\<S\>

Store state in a file.

## Type Parameters

### S

`S` *extends* `IEngineState` = `IEngineState`

## Implements

- `IEngineStateStorage`\<`S`\>

## Constructors

### Constructor

> **new FileStateStorage**\<`S`\>(`filename`, `readonlyMode`): `FileStateStorage`\<`S`\>

Create a new instance of FileStateStorage.

#### Parameters

##### filename

`string`

The filename to store the state.

##### readonlyMode

`boolean` = `false`

Whether the file is in read-only mode.

#### Returns

`FileStateStorage`\<`S`\>

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
