# Interface: IEngineCore

Interface describing the engine core methods.

## Methods

### addTypeInitialiser()

> **addTypeInitialiser**\<`T`\>(`type`, `typeConfig`, `initialiser`): `void`

Add a type initialiser.

#### Type Parameters

• **T** *extends* [`IEngineCoreTypeBaseConfig`](IEngineCoreTypeBaseConfig.md)\<`unknown`\>

#### Parameters

• **type**: `string`

The type to add the initialiser for.

• **typeConfig**: `undefined` \| [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)[]

The type config.

• **initialiser**: [`EngineTypeInitialiser`](../type-aliases/EngineTypeInitialiser.md)\<`T`\>

The initialiser to add.

#### Returns

`void`

***

### start()

> **start**(): `Promise`\<`void`\>

Start the engine core.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### stop()

> **stop**(): `Promise`\<`void`\>

Stop the engine core.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### logInfo()

> **logInfo**(`message`): `void`

Log info.

#### Parameters

• **message**: `string`

The message to log.

#### Returns

`void`

***

### logError()

> **logError**(`error`): `void`

Log error.

#### Parameters

• **error**: `IError`

The error to log.

#### Returns

`void`

***

### getConfig()

> **getConfig**(): [`IEngineCoreConfig`](IEngineCoreConfig.md)

Get the config for the engine.

#### Returns

[`IEngineCoreConfig`](IEngineCoreConfig.md)

The config for the engine.

***

### getState()

> **getState**(): [`IEngineState`](IEngineState.md)

Get the state of the engine.

#### Returns

[`IEngineState`](IEngineState.md)

The state of the engine.

***

### getDefaultTypes()

> **getDefaultTypes**(): `object`

Get the types for the component.

#### Returns

`object`

The default types.
