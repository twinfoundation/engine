# Interface: IEngineServer

Interface describing the engine server methods.

## Methods

### addRestRouteGenerator()

> **addRestRouteGenerator**(`type`, `typeConfig`, `module`, `method`): `void`

Add a REST route generator.

#### Parameters

• **type**: `string`

The type to add the generator for.

• **typeConfig**: `undefined` \| [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)[]

The type config.

• **module**: `string`

The module containing the generator.

• **method**: `string`

The method to call on the module.

#### Returns

`void`

***

### addSocketRouteGenerator()

> **addSocketRouteGenerator**(`type`, `typeConfig`, `module`, `method`): `void`

Add a socket route generator.

#### Parameters

• **type**: `string`

The type to add the generator for.

• **typeConfig**: `undefined` \| [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)[]

The type config.

• **module**: `string`

The module containing the generator.

• **method**: `string`

The method to call on the module.

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
