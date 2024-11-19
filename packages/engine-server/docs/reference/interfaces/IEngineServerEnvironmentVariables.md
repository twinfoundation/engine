# Interface: IEngineServerEnvironmentVariables

The engine server environment variables.

## Properties

### adminUsername

> **adminUsername**: `string`

The name of the admin user.

***

### port

> **port**: `string`

The port to serve the API from.

***

### host

> **host**: `string`

The host to serve the API from.

***

### corsOrigins

> **corsOrigins**: `string`

The CORS origins to allow, defaults to *.

***

### httpMethods

> **httpMethods**: `string`

The CORS methods to allow, defaults to GET, POST, PUT, DELETE, OPTIONS.

***

### httpAllowedHeaders

> **httpAllowedHeaders**: `string`

The CORS headers to allow.

***

### httpExposedHeaders

> **httpExposedHeaders**: `string`

The CORS headers to expose.

***

### authProcessorType

> **authProcessorType**: `string`

The type of auth processor to use on the API: entity-storage.

***

### authSigningKeyId

> **authSigningKeyId**: `string`

The id of the key in the vault to use for signing in auth operations.