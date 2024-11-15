// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineState, IEngineStateStorage } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";

/**
 * Store state in memory.
 */
export class MemoryStateStorage<S extends IEngineState = IEngineState>
	implements IEngineStateStorage<S>
{
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<MemoryStateStorage>();

	/**
	 * Readonly mode state file is not updated.
	 * @internal
	 */
	private readonly _readonlyMode: boolean;

	/**
	 * The state object.
	 * @internal
	 */
	private _engineState?: S;

	/**
	 * Create a new instance of MemoryStateStorage.
	 * @param readonlyMode Whether the file is in read-only mode.
	 */
	constructor(readonlyMode: boolean = false) {
		this._readonlyMode = readonlyMode;
	}

	/**
	 * Method for loading the state.
	 * @param engineCore The engine core to load the state for.
	 * @returns The state of the engine or undefined if it doesn't exist.
	 */
	public async load(engineCore: IEngineCore): Promise<S | undefined> {
		engineCore.logInfo(
			I18n.formatMessage(`${StringHelper.camelCase(this.CLASS_NAME)}.loading`, {
				filename: this._engineState
			})
		);
		return this._engineState;
	}

	/**
	 * Method for saving the state.
	 * @param engineCore The engine core to save the state for.
	 * @param state The state of the engine to save.
	 * @returns Nothing.
	 */
	public async save(engineCore: IEngineCore, state: S): Promise<void> {
		if (!this._readonlyMode) {
			engineCore.logInfo(I18n.formatMessage(`${StringHelper.camelCase(this.CLASS_NAME)}.saving`));
			this._engineState = state;
		}
	}
}
