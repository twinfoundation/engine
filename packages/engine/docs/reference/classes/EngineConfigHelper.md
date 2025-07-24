# Class: EngineConfigHelper

Helper methods for engine config.

## Constructors

### Constructor

> **new EngineConfigHelper**(): `EngineConfigHelper`

#### Returns

`EngineConfigHelper`

## Properties

### CLASS\_NAME

> `readonly` `static` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### addCustomEntityStorage()

> `static` **addCustomEntityStorage**\<`T`\>(`engineConfig`, `entityTypeName`, `entitySchema`, `restPath?`, `options?`): `void`

Add a custom entity storage to the engine configuration.

#### Type Parameters

##### T

`T`

#### Parameters

##### engineConfig

`IEngineConfig`

The engine configuration.

##### entityTypeName

`string`

The entity type name.

##### entitySchema

`IEntitySchema`\<`T`\>

The entity schema.

##### restPath?

`string`

The rest path to serve the entity storage from, leave undefined for no endpoints.

##### options?

Additional options.

###### partitionPerUser?

`boolean`

Whether to partition the user identity in the data, defaults to false.

#### Returns

`void`
