# Class: Engine\<C, S\>

The engine with built in types.

## Extends

- `EngineCore`\<`C`, `S`\>

## Type Parameters

### C

`C` *extends* `IEngineConfig` = `IEngineConfig`

### S

`S` *extends* `IEngineState` = `IEngineState`

## Constructors

### Constructor

> **new Engine**\<`C`, `S`\>(`options?`): `Engine`\<`C`, `S`\>

Create a new instance of Engine.

#### Parameters

##### options?

`IEngineCoreOptions`\<`C`, `S`\>

The options for the engine.

#### Returns

`Engine`\<`C`, `S`\>

#### Overrides

`EngineCore<C, S>.constructor`

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Overrides

`EngineCore.CLASS_NAME`

***

### LOGGER\_TYPE\_NAME

> `readonly` `static` **LOGGER\_TYPE\_NAME**: `string`

Name for the engine logger.

#### Inherited from

`EngineCore.LOGGER_TYPE_NAME`

***

### \_context

> `protected` **\_context**: `IEngineCoreContext`\<`C`, `S`\>

The core context.

#### Inherited from

`EngineCore._context`

## Methods

### addTypeInitialiser()

> **addTypeInitialiser**(`type`, `typeConfig`, `module`, `method`): `void`

Add a type initialiser.

#### Parameters

##### type

`string`

The type to add the initialiser for.

##### typeConfig

The type config.

`undefined` | `IEngineCoreTypeConfig`[]

##### module

`string`

The name of the module which contains the initialiser method.

##### method

`string`

The name of the method to call.

#### Returns

`void`

#### Inherited from

`EngineCore.addTypeInitialiser`

***

### start()

> **start**(): `Promise`\<`boolean`\>

Start the engine core.

#### Returns

`Promise`\<`boolean`\>

True if the start was successful.

#### Inherited from

`EngineCore.start`

***

### stop()

> **stop**(): `Promise`\<`void`\>

Stop the engine core.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`EngineCore.stop`

***

### logInfo()

> **logInfo**(`message`): `void`

Log info.

#### Parameters

##### message

`string`

The message to log.

#### Returns

`void`

#### Inherited from

`EngineCore.logInfo`

***

### logError()

> **logError**(`error`): `void`

Log error.

#### Parameters

##### error

`IError`

The error to log.

#### Returns

`void`

#### Inherited from

`EngineCore.logError`

***

### getConfig()

> **getConfig**(): `C`

Get the config for the engine.

#### Returns

`C`

The config for the engine.

#### Inherited from

`EngineCore.getConfig`

***

### getState()

> **getState**(): `S`

Get the state of the engine.

#### Returns

`S`

The state of the engine.

#### Inherited from

`EngineCore.getState`

***

### getDefaultTypes()

> **getDefaultTypes**(): `object`

Get the types for the component.

#### Returns

`object`

The default types.

#### Inherited from

`EngineCore.getDefaultTypes`

***

### getCloneData()

> **getCloneData**(): `IEngineCoreClone`\<`C`, `S`\>

Get the data required to create a clone of the engine.

#### Returns

`IEngineCoreClone`\<`C`, `S`\>

The clone data.

#### Inherited from

`EngineCore.getCloneData`

***

### populateClone()

> **populateClone**(`cloneData`, `silent?`): `void`

Populate the engine from the clone data.

#### Parameters

##### cloneData

`IEngineCoreClone`\<`C`, `S`\>

The clone data to populate from.

##### silent?

`boolean`

Should the clone be silent.

#### Returns

`void`

#### Inherited from

`EngineCore.populateClone`
