# Type Alias: SocketRouteProcessorConfig

> **SocketRouteProcessorConfig** = \{ `type`: *typeof* [`AuthHeader`](../variables/SocketRouteProcessorType.md#authheader); `options`: `IAuthHeaderProcessorConstructorOptions`; \} \| \{ `type`: *typeof* [`Logging`](../variables/SocketRouteProcessorType.md#logging); `options`: `ILoggingProcessorConstructorOptions`; \} \| \{ `type`: *typeof* [`NodeIdentity`](../variables/SocketRouteProcessorType.md#nodeidentity); `options`: `never`; \} \| \{ `type`: *typeof* [`StaticUserIdentity`](../variables/SocketRouteProcessorType.md#staticuseridentity); `options`: `IStaticUserIdentityProcessorConstructorOptions`; \} \| \{ `type`: *typeof* [`SocketRoute`](../variables/SocketRouteProcessorType.md#socketroute); `options`: `ISocketRouteProcessorConstructorOptions`; \}

Socket route processor config types.
