// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory } from '@twin.org/core';

/**
 * Test component.
 */
export class TestComponent {
	CLASS_NAME = 'TestComponent';

	value;

	/**
	 * Create a new instance of TestComponent.
	 * @param options The options for the component.
	 * @param options.value The value.
	 */
	constructor(options) {
		this.value = options.value;
	}
}

/**
 * Test initialiser.
 * @param core The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 */
export function testTypeInitialiser(core, context, instanceConfig, overrideInstanceType) {
	ComponentFactory.register(
		'test-component',
		() => new TestComponent(instanceConfig.options ?? { value: 4567 })
	);
	return overrideInstanceType ?? 'test-component';
}

/**
 * Generate the rest routes for the component.
 * @param baseRouteName The base route name.
 * @param componentName The component name.
 * @returns The rest routes.
 */
export function generateRestRoutes(baseRouteName, componentName) {
	return [
		{
			operationId: 'test-op',
			summary: 'value endpoint',
			tag: 'bar',
			method: 'GET',
			path: `${baseRouteName}/value`,
			handler: async (httpRequestContext, request) => {
				const component = ComponentFactory.get(componentName);
				return {
					body: {
						value: component.value
					}
				};
			}
		}
	];
}
