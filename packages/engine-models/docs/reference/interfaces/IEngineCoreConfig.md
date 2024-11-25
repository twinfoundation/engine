# Interface: IEngineCoreConfig

Configuration for the engine core.

## Properties

### debug?

> `optional` **debug**: `boolean`

Start the engine in debug mode.

#### Default

```ts
false
```

***

### silent?

> `optional` **silent**: `boolean`

Disable output to the console.

#### Default

```ts
false
```

***

### types

> **types**: `object`

The types to initialise in the engine.

#### Index Signature

 \[`type`: `string`\]: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)[] \| `undefined`
