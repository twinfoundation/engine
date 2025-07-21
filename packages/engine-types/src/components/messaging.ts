// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import {
	AwsMessagingEmailConnector,
	AwsMessagingPushNotificationConnector,
	AwsMessagingSmsConnector
} from "@twin.org/messaging-connector-aws";
import {
	type EmailEntry,
	EntityStorageMessagingEmailConnector,
	EntityStorageMessagingPushNotificationConnector,
	EntityStorageMessagingSmsConnector,
	initSchema,
	type PushNotificationDeviceEntry,
	type PushNotificationMessageEntry,
	type SmsEntry
} from "@twin.org/messaging-connector-entity-storage";
import {
	type IMessagingComponent,
	type IMessagingEmailConnector,
	type IMessagingPushNotificationsConnector,
	type IMessagingSmsConnector,
	MessagingEmailConnectorFactory,
	MessagingPushNotificationsConnectorFactory,
	MessagingSmsConnectorFactory
} from "@twin.org/messaging-models";
import {
	initSchema as initSchemaService,
	MessagingService,
	type TemplateEntry
} from "@twin.org/messaging-service";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { MessagingComponentConfig } from "../models/config/messagingComponentConfig";
import type { MessagingEmailConnectorConfig } from "../models/config/messagingEmailConnectorConfig";
import type { MessagingPushNotificationConnectorConfig } from "../models/config/messagingPushNotificationConnectorConfig";
import type { MessagingSmsConnectorConfig } from "../models/config/messagingSmsConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { MessagingComponentType } from "../models/types/messagingComponentType";
import { MessagingEmailConnectorType } from "../models/types/messagingEmailConnectorType";
import { MessagingPushNotificationConnectorType } from "../models/types/messagingPushNotificationConnectorType";
import { MessagingSmsConnectorType } from "../models/types/messagingSmsConnectorType";

/**
 * Initialise a messaging email connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseMessagingEmailConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingEmailConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Messaging Email Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IMessagingEmailConnector;
	let instanceType: string;

	if (type === MessagingEmailConnectorType.EntityStorage) {
		initSchema({ email: true, sms: false, pushNotification: false });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.messagingEmailEntryStorageConnectorType,
			nameof<EmailEntry>()
		);
		connector = new EntityStorageMessagingEmailConnector({
			loggingConnectorType: context.defaultTypes.loggingConnector,
			...instanceConfig.options
		});
		instanceType = EntityStorageMessagingEmailConnector.NAMESPACE;
	} else if (type === MessagingEmailConnectorType.Aws) {
		connector = new AwsMessagingEmailConnector({
			loggingConnectorType: context.defaultTypes.loggingConnector,
			...instanceConfig.options
		});
		instanceType = AwsMessagingEmailConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "messagingEmailConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component: connector });
	MessagingEmailConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise a messaging sms connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseMessagingSmsConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingSmsConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Messaging SMS Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IMessagingSmsConnector;
	let instanceType: string;

	if (type === MessagingSmsConnectorType.EntityStorage) {
		initSchema({ email: false, sms: true, pushNotification: false });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.messagingSmsEntryStorageConnectorType,
			nameof<SmsEntry>()
		);
		connector = new EntityStorageMessagingSmsConnector({
			loggingConnectorType: context.defaultTypes.loggingConnector,
			...instanceConfig.options
		});
		instanceType = EntityStorageMessagingSmsConnector.NAMESPACE;
	} else if (type === MessagingSmsConnectorType.Aws) {
		connector = new AwsMessagingSmsConnector({
			loggingConnectorType: context.defaultTypes.loggingConnector,
			...instanceConfig.options
		});
		instanceType = AwsMessagingSmsConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "messagingSmsConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component: connector });
	MessagingSmsConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise a messaging push notification connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseMessagingPushNotificationConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingPushNotificationConnectorConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Messaging Push Notification Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IMessagingPushNotificationsConnector;
	let instanceType: string;

	if (type === MessagingPushNotificationConnectorType.EntityStorage) {
		initSchema({ email: false, sms: false, pushNotification: true });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.messagingDeviceEntryStorageConnectorType,
			nameof<PushNotificationDeviceEntry>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.messagingMessageEntryStorageConnectorType,
			nameof<PushNotificationMessageEntry>()
		);
		connector = new EntityStorageMessagingPushNotificationConnector({
			loggingConnectorType: context.defaultTypes.loggingConnector,
			...instanceConfig.options
		});
		instanceType = EntityStorageMessagingPushNotificationConnector.NAMESPACE;
	} else if (type === MessagingPushNotificationConnectorType.Aws) {
		connector = new AwsMessagingPushNotificationConnector({
			loggingConnectorType: context.defaultTypes.loggingConnector,
			...instanceConfig.options
		});
		instanceType = AwsMessagingPushNotificationConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "messagingPushNotificationConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component: connector });
	MessagingPushNotificationsConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the messaging component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export function initialiseMessagingComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Messaging Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IMessagingComponent;
	let instanceType: string;

	if (type === MessagingComponentType.Service) {
		initSchemaService();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.templateEntryStorageConnectorType,
			nameof<TemplateEntry>()
		);

		component = new MessagingService({
			messagingEmailConnectorType: context.defaultTypes.messagingEmailConnector,
			messagingSmsConnectorType: context.defaultTypes.messagingSmsConnector,
			messagingPushNotificationConnectorType: context.defaultTypes.messagingNotificationConnector,
			...instanceConfig.options
		});
		instanceType = StringHelper.kebabCase(nameof(MessagingService));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "messagingComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component });
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
