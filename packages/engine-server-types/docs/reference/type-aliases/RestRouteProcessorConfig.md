# Type Alias: RestRouteProcessorConfig

> **RestRouteProcessorConfig** = \{ `type`: *typeof* [`AuthHeader`](../variables/RestRouteProcessorType.md#authheader); `options`: `IAuthHeaderProcessorConstructorOptions`; \} \| \{ `type`: *typeof* [`Logging`](../variables/RestRouteProcessorType.md#logging); `options`: `ILoggingProcessorConstructorOptions`; \} \| \{ `type`: *typeof* [`NodeIdentity`](../variables/RestRouteProcessorType.md#nodeidentity); `options`: `never`; \} \| \{ `type`: *typeof* [`StaticUserIdentity`](../variables/RestRouteProcessorType.md#staticuseridentity); `options`: `IStaticUserIdentityProcessorConstructorOptions`; \} \| \{ `type`: *typeof* [`RestRoute`](../variables/RestRouteProcessorType.md#restroute); `options`: `IRestRouteProcessorConstructorOptions`; \}

REST route processor config types.
