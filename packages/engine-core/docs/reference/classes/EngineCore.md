# Class: EngineCore\<S\>

Core for the engine.

## Type Parameters

• **S** *extends* `IEngineState` = `IEngineState`

## Implements

- `IEngineCore`\<`S`\>

## Constructors

### new EngineCore()

> **new EngineCore**\<`S`\>(`options`?): [`EngineCore`](EngineCore.md)\<`S`\>

Create a new instance of EngineCore.

#### Parameters

• **options?**: [`IEngineCoreOptions`](../interfaces/IEngineCoreOptions.md)

The options for the engine.

#### Returns

[`EngineCore`](EngineCore.md)\<`S`\>

## Properties

### LOGGER\_TYPE\_NAME

> `readonly` `static` **LOGGER\_TYPE\_NAME**: `string` = `"engine"`

Name for the engine logger.

***

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### addTypeInitialiser()

> **addTypeInitialiser**\<`V`\>(`type`, `typeConfig`, `initialiser`): `void`

Add a type initialiser.

#### Type Parameters

• **V** *extends* `IEngineCoreTypeBaseConfig`\<`unknown`\>

#### Parameters

• **type**: `string`

The type to add the initialiser for.

• **typeConfig**: `undefined` \| `IEngineCoreTypeConfig`[]

The type config.

• **initialiser**: `EngineTypeInitialiser`\<`V`\>

The initialiser to add.

#### Returns

`void`

#### Implementation of

`IEngineCore.addTypeInitialiser`

***

### start()

> **start**(): `Promise`\<`boolean`\>

Start the engine core.

#### Returns

`Promise`\<`boolean`\>

True if the start was successful.

#### Implementation of

`IEngineCore.start`

***

### stop()

> **stop**(): `Promise`\<`void`\>

Stop the engine core.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IEngineCore.stop`

***

### logInfo()

> **logInfo**(`message`): `void`

Log info.

#### Parameters

• **message**: `string`

The message to log.

#### Returns

`void`

#### Implementation of

`IEngineCore.logInfo`

***

### logError()

> **logError**(`error`): `void`

Log error.

#### Parameters

• **error**: `IError`

The error to log.

#### Returns

`void`

#### Implementation of

`IEngineCore.logError`

***

### getConfig()

> **getConfig**(): `IEngineCoreConfig`

Get the config for the engine.

#### Returns

`IEngineCoreConfig`

The config for the engine.

#### Implementation of

`IEngineCore.getConfig`

***

### getState()

> **getState**(): `S`

Get the state of the engine.

#### Returns

`S`

The state of the engine.

#### Implementation of

`IEngineCore.getState`

***

### getDefaultTypes()

> **getDefaultTypes**(): `object`

Get the types for the component.

#### Returns

`object`

The default types.

#### Implementation of

`IEngineCore.getDefaultTypes`
