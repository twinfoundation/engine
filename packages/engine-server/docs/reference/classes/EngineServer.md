# Class: EngineServer

Server for the engine.

## Implements

- `IEngineServer`

## Constructors

### new EngineServer()

> **new EngineServer**(): [`EngineServer`](EngineServer.md)

Create a new instance of EngineServer.

#### Returns

[`EngineServer`](EngineServer.md)

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### start()

> **start**(`config`): `Promise`\<`void`\>

Start the engine.

#### Parameters

• **config**: `IEngineServerConfig`

The configuration for the engine.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IEngineServer.start`

***

### stop()

> **stop**(): `Promise`\<`void`\>

Stop the engine.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IEngineServer.stop`
