# Interface: IEngineServer

Interface describing the engine server methods.

## Methods

### addRestRouteGenerator()

> **addRestRouteGenerator**(`type`, `typeConfig`, `generator`): `void`

Add a REST route generator.

#### Parameters

• **type**: `string`

The type to add the generator for.

• **typeConfig**: `undefined` \| [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)[]

The type config.

• **generator**: [`RestRouteGenerator`](../type-aliases/RestRouteGenerator.md)

The generator to add.

#### Returns

`void`

***

### addSocketRouteGenerator()

> **addSocketRouteGenerator**(`type`, `typeConfig`, `generator`): `void`

Add a socket route generator.

#### Parameters

• **type**: `string`

The type to add the generator for.

• **typeConfig**: `undefined` \| [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)[]

The type config.

• **generator**: [`SocketRouteGenerator`](../type-aliases/SocketRouteGenerator.md)

The generator to add.

#### Returns

`void`

***

### start()

> **start**(): `Promise`\<`boolean`\>

Start the engine server.

#### Returns

`Promise`\<`boolean`\>

True if the start was successful.

***

### stop()

> **stop**(): `Promise`\<`void`\>

Stop the engine server.

#### Returns

`Promise`\<`void`\>

Nothing.
