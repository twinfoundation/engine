// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ITaskSchedulerComponent } from "@twin.org/background-task-models";
import { TaskSchedulerComponent } from "@twin.org/background-task-scheduler";
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import type { TaskSchedulerComponentConfig } from "../models/config/taskSchedulerComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { TaskSchedulerComponentType } from "../models/types/taskSchedulerComponentType";

/**
 * Initialise a task scheduler.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseTaskSchedulerComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TaskSchedulerComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Task Scheduler: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: ITaskSchedulerComponent;
	let instanceType: string;

	if (type === TaskSchedulerComponentType.Default) {
		component = new TaskSchedulerComponent({
			loggingConnectorType: context.defaultTypes.loggingConnector,
			...instanceConfig.options
		});
		instanceType = TaskSchedulerComponent.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "taskSchedulerComponent"
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
