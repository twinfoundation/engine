# Class: EngineServer\<T\>

Server for the engine.

## Type Parameters

• **T** *extends* `IEngineServerConfig` = `IEngineServerConfig`

## Implements

- `IEngineServer`

## Constructors

### new EngineServer()

> **new EngineServer**\<`T`\>(`options`): [`EngineServer`](EngineServer.md)\<`T`\>

Create a new instance of EngineServer.

#### Parameters

• **options**

The options for the engine.

• **options.engineCore**: `IEngineCore`\<`T`, `IEngineState`\>

The engine core to serve from.

#### Returns

[`EngineServer`](EngineServer.md)\<`T`\>

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### addRestRouteGenerator()

> **addRestRouteGenerator**(`type`, `typeConfig`, `module`, `method`): `void`

Add a REST route generator.

#### Parameters

• **type**: `string`

The type to add the generator for.

• **typeConfig**: `undefined` \| `IEngineCoreTypeConfig`[]

The type config.

• **module**: `string`

The module containing the generator.

• **method**: `string`

The method to call on the module.

#### Returns

`void`

#### Implementation of

`IEngineServer.addRestRouteGenerator`

***

### addSocketRouteGenerator()

> **addSocketRouteGenerator**(`type`, `typeConfig`, `module`, `method`): `void`

Add a socket route generator.

#### Parameters

• **type**: `string`

The type to add the generator for.

• **typeConfig**: `undefined` \| `IEngineCoreTypeConfig`[]

The type config.

• **module**: `string`

The module containing the generator.

• **method**: `string`

The method to call on the module.

#### Returns

`void`

#### Implementation of

`IEngineServer.addSocketRouteGenerator`

***

### start()

> **start**(): `Promise`\<`boolean`\>

Start the engine server.

#### Returns

`Promise`\<`boolean`\>

True if the start was successful.

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
