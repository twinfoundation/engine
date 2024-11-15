# Class: EngineServer

Server for the engine.

## Implements

- `IEngineServer`

## Constructors

### new EngineServer()

> **new EngineServer**(`options`): [`EngineServer`](EngineServer.md)

Create a new instance of EngineServer.

#### Parameters

• **options**

The options for the engine.

• **options.engineCore**: `IEngineCore`\<`IEngineState`\>

The engine core to serve from.

• **options.server?**: `IEngineServerConfig`

The server options for the engine.

#### Returns

[`EngineServer`](EngineServer.md)

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

***

### \_config

> `protected` `readonly` **\_config**: `IEngineServerConfig`

The server config.

## Methods

### addRestRouteGenerator()

> **addRestRouteGenerator**(`type`, `typeConfig`, `generator`): `void`

Add a REST route generator.

#### Parameters

• **type**: `string`

The type to add the generator for.

• **typeConfig**: `undefined` \| `IEngineCoreTypeConfig`[]

The type config.

• **generator**: `RestRouteGenerator`

The generator to add.

#### Returns

`void`

#### Implementation of

`IEngineServer.addRestRouteGenerator`

***

### addSocketRouteGenerator()

> **addSocketRouteGenerator**(`type`, `typeConfig`, `generator`): `void`

Add a socket route generator.

#### Parameters

• **type**: `string`

The type to add the generator for.

• **typeConfig**: `undefined` \| `IEngineCoreTypeConfig`[]

The type config.

• **generator**: `SocketRouteGenerator`

The generator to add.

#### Returns

`void`

#### Implementation of

`IEngineServer.addSocketRouteGenerator`

***

### start()

> **start**(): `Promise`\<`void`\>

Start the engine server.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IEngineServer.start`

***

### stop()

> **stop**(): `Promise`\<`void`\>

Stop the engine server.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IEngineServer.stop`
