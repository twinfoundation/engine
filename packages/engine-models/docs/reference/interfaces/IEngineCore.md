# Interface: IEngineCore\<C, S\>

Interface describing the engine core methods.

## Type Parameters

• **C** *extends* [`IEngineCoreConfig`](IEngineCoreConfig.md) = [`IEngineCoreConfig`](IEngineCoreConfig.md)

• **S** *extends* [`IEngineState`](IEngineState.md) = [`IEngineState`](IEngineState.md)

## Methods

### addTypeInitialiser()

> **addTypeInitialiser**(`type`, `typeConfig`, `module`, `method`): `void`

Add a type initialiser.

#### Parameters

• **type**: `string`

The type to add the initialiser for.

• **typeConfig**: `undefined` \| [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)[]

The type config.

• **module**: `string`

The name of the module which contains the initialiser method.

• **method**: `string`

The name of the method to call.

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

> **getConfig**(): `C`

Get the config for the engine.

#### Returns

`C`

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

> **getCloneData**(): [`IEngineCoreClone`](IEngineCoreClone.md)\<`C`, `S`\>

Get the data required to create a clone of the engine.

#### Returns

[`IEngineCoreClone`](IEngineCoreClone.md)\<`C`, `S`\>

The clone data.

***

### populateClone()

> **populateClone**(`cloneData`, `silent`?): `void`

Populate the engine from the clone data.

#### Parameters

• **cloneData**: [`IEngineCoreClone`](IEngineCoreClone.md)\<`C`, `S`\>

The clone data to populate from.

• **silent?**: `boolean`

Should the clone be silent.

#### Returns

`void`
