# Interface: IEngineCore\<S\>

Interface describing the engine core methods.

## Type Parameters

• **S** *extends* [`IEngineState`](IEngineState.md) = [`IEngineState`](IEngineState.md)

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

> **start**(): `Promise`\<`boolean`\>

Start the engine core.

#### Returns

`Promise`\<`boolean`\>

True if the start was successful.

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

> **getState**(): `S`

Get the state of the engine.

#### Returns

`S`

The state of the engine.

***

### getDefaultTypes()

> **getDefaultTypes**(): `object`

Get the types for the component.

#### Returns

`object`

The default types.

***

### getCloneData()

> **getCloneData**(): [`IEngineCoreClone`](IEngineCoreClone.md)\<[`IEngineState`](IEngineState.md)\>

Get the data required to create a clone of the engine.

#### Returns

[`IEngineCoreClone`](IEngineCoreClone.md)\<[`IEngineState`](IEngineState.md)\>

The clone data.

***

### populateClone()

> **populateClone**(`cloneData`): `void`

Populate the engine from the clone data.

#### Parameters

• **cloneData**: [`IEngineCoreClone`](IEngineCoreClone.md)\<[`IEngineState`](IEngineState.md)\>

The clone data to populate from.

#### Returns

`void`
