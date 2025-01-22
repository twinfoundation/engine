// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { S3BlobStorageConnector } from "@twin.org/blob-storage-connector-aws-s3";
import { AzureBlobStorageConnector } from "@twin.org/blob-storage-connector-azure";
import { FileBlobStorageConnector } from "@twin.org/blob-storage-connector-file";
import { GcpBlobStorageConnector } from "@twin.org/blob-storage-connector-gcp";
import { IpfsBlobStorageConnector } from "@twin.org/blob-storage-connector-ipfs";
import { MemoryBlobStorageConnector } from "@twin.org/blob-storage-connector-memory";
import {
	BlobStorageConnectorFactory,
	type IBlobStorageComponent,
	type IBlobStorageConnector
} from "@twin.org/blob-storage-models";
import {
	BlobStorageService,
	initSchema as initSchemaBlobStorage,
	type BlobStorageEntry
} from "@twin.org/blob-storage-service";
import { ComponentFactory, GeneralError, I18n, Is } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { BlobStorageComponentConfig } from "../models/config/blobStorageComponentConfig";
import type { BlobStorageConnectorConfig } from "../models/config/blobStorageConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { BlobStorageComponentType } from "../models/types/blobStorageComponentType";
import { BlobStorageConnectorType } from "../models/types/blobStorageConnectorType";

/**
 * Initialise the blob storage connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseBlobStorageConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: BlobStorageConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Blob Storage Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IBlobStorageConnector;
	let instanceType: string;

	if (type === BlobStorageConnectorType.Ipfs) {
		connector = new IpfsBlobStorageConnector(instanceConfig.options);
		instanceType = IpfsBlobStorageConnector.NAMESPACE;
	} else if (type === BlobStorageConnectorType.File) {
		connector = new FileBlobStorageConnector({
			...instanceConfig.options,
			config: {
				...instanceConfig.options.config,
				directory: Is.stringValue(instanceConfig.options.storagePrefix)
					? path.join(instanceConfig.options.config.directory, instanceConfig.options.storagePrefix)
					: instanceConfig.options.config.directory
			}
		});
		instanceType = FileBlobStorageConnector.NAMESPACE;
	} else if (type === BlobStorageConnectorType.Memory) {
		connector = new MemoryBlobStorageConnector();
		instanceType = MemoryBlobStorageConnector.NAMESPACE;
	} else if (type === BlobStorageConnectorType.AwsS3) {
		connector = new S3BlobStorageConnector({
			...instanceConfig.options,
			config: {
				...instanceConfig.options.config,
				bucketName: `${instanceConfig.options.storagePrefix ?? ""}${instanceConfig.options.config.bucketName}`
			}
		});
		instanceType = S3BlobStorageConnector.NAMESPACE;
	} else if (type === BlobStorageConnectorType.GcpStorage) {
		connector = new GcpBlobStorageConnector({
			...instanceConfig.options,
			config: {
				...instanceConfig.options.config,
				bucketName: `${instanceConfig.options.storagePrefix ?? ""}${instanceConfig.options.config.bucketName}`
			}
		});
		instanceType = GcpBlobStorageConnector.NAMESPACE;
	} else if (type === BlobStorageConnectorType.AzureStorage) {
		connector = new AzureBlobStorageConnector({
			...instanceConfig.options,
			config: {
				...instanceConfig.options.config,
				containerName: `${instanceConfig.options.storagePrefix ?? ""}${instanceConfig.options.config.containerName}`
			}
		});
		instanceType = AzureBlobStorageConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "blobStorageConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component: connector
	});
	BlobStorageConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the blob storage component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseBlobStorageComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: BlobStorageComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Blob Storage Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IBlobStorageComponent;
	let instanceType: string;

	if (type === BlobStorageComponentType.Service) {
		initSchemaBlobStorage();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.entryEntityStorageType,
			nameof<BlobStorageEntry>()
		);

		component = new BlobStorageService({
			vaultConnectorType: context.defaultTypes.vaultConnector,
			...instanceConfig.options
		});
		instanceType = BlobStorageService.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "blobStorageComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component
	});
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
