# Type Alias: BlobStorageConnectorConfig

> **BlobStorageConnectorConfig** = \{ `type`: *typeof* [`File`](../variables/BlobStorageConnectorType.md#file); `options`: `IFileBlobStorageConnectorConstructorOptions` & `object`; \} \| \{ `type`: *typeof* [`Memory`](../variables/BlobStorageConnectorType.md#memory); `options?`: `never`; \} \| \{ `type`: *typeof* [`AwsS3`](../variables/BlobStorageConnectorType.md#awss3); `options`: `IS3BlobStorageConnectorConstructorOptions` & `object`; \} \| \{ `type`: *typeof* [`AzureStorage`](../variables/BlobStorageConnectorType.md#azurestorage); `options`: `IAzureBlobStorageConnectorConstructorOptions` & `object`; \} \| \{ `type`: *typeof* [`GcpStorage`](../variables/BlobStorageConnectorType.md#gcpstorage); `options`: `IGcpBlobStorageConnectorConstructorOptions` & `object`; \} \| \{ `type`: *typeof* [`Ipfs`](../variables/BlobStorageConnectorType.md#ipfs); `options`: `IIpfsBlobStorageConnectorConstructorOptions`; \}

Blob storage connector config types.
