# Interface: IEngineServerConfig

Configuration for the engine server.

## Properties

### web?

> `optional` **web**: `IWebServerOptions`

Configuration for the web server.

***

### informationComponent?

> `optional` **informationComponent**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`InformationComponentConfig`](../type-aliases/InformationComponentConfig.md)\>[]

Information component options which can be overridden by individual components by specifying types other than default..

***

### restRouteProcessor?

> `optional` **restRouteProcessor**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`RestRouteProcessorConfig`](../type-aliases/RestRouteProcessorConfig.md)\>[]

REST route processors options which can be overridden by individual components by specifying types other than default..

***

### socketRouteProcessor?

> `optional` **socketRouteProcessor**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`SocketRouteProcessorConfig`](../type-aliases/SocketRouteProcessorConfig.md)\>[]

Socket route processors options which can be overridden by individual components by specifying types other than default..

***

### mimeTypeProcessor?

> `optional` **mimeTypeProcessor**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`MimeTypeProcessorConfig`](../type-aliases/MimeTypeProcessorConfig.md)\>[]

Mime type processors options which can be overridden by individual components by specifying types other than default..

***

### authenticationComponent?

> `optional` **authenticationComponent**: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)\<[`AuthenticationComponentConfig`](../type-aliases/AuthenticationComponentConfig.md)\>[]

Authentication component options which can be overridden by individual components by specifying types other than default..
