# Class: EngineCore\<C, S\>

Core for the engine.

## Type Parameters

• **C** *extends* `IEngineCoreConfig` = `IEngineCoreConfig`

• **S** *extends* `IEngineState` = `IEngineState`

## Implements

- `IEngineCore`\<`C`, `S`\>

## Constructors

### new EngineCore()

> **new EngineCore**\<`C`, `S`\>(`options`?): [`EngineCore`](EngineCore.md)\<`C`, `S`\>

Create a new instance of EngineCore.

#### Parameters

• **options?**: [`IEngineCoreOptions`](../interfaces/IEngineCoreOptions.md)\<`C`, `S`\>

The options for the engine.

#### Returns

[`EngineCore`](EngineCore.md)\<`C`, `S`\>

## Properties

### LOGGER\_TYPE\_NAME

> `readonly` `static` **LOGGER\_TYPE\_NAME**: `string` = `"engine"`

Name for the engine logger.

***

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

***

### \_context

> `protected` **\_context**: `IEngineCoreContext`\<`C`, `S`\>

The core context.

## Methods

### addTypeInitialiser()

> **addTypeInitialiser**(`type`, `typeConfig`, `module`, `method`): `void`

Add a type initialiser.

#### Parameters

• **type**: `string`

The type to add the initialiser for.

• **typeConfig**: `undefined` \| `IEngineCoreTypeConfig`[]

The type config.

• **module**: `string`

The name of the module which contains the initialiser method.

• **method**: `string`

The name of the method to call.

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

> **getConfig**(): `C`

Get the config for the engine.

#### Returns

`C`

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

***

### getCloneData()

> **getCloneData**(): `IEngineCoreClone`\<`C`, `S`\>

Get the data required to create a clone of the engine.

#### Returns

`IEngineCoreClone`\<`C`, `S`\>

The clone data.

#### Implementation of

`IEngineCore.getCloneData`

***

### populateClone()

> **populateClone**(`cloneData`, `silent`?): `void`

Populate the engine from the clone data.

#### Parameters

• **cloneData**: `IEngineCoreClone`\<`C`, `S`\>

The clone data to populate from.

• **silent?**: `boolean`

Should the clone be silent.

#### Returns

`void`

#### Implementation of

`IEngineCore.populateClone`
