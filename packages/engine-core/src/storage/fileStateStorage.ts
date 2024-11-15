// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { readFile, stat, writeFile } from "node:fs/promises";
import { BaseError, GeneralError, Guards, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineState, IEngineStateStorage } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";

/**
 * Store state in a file.
 */
export class FileStateStorage implements IEngineStateStorage {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<FileStateStorage>();

	/**
	 * The filename to store the state.
	 * @internal
	 */
	private readonly _filename: string;

	/**
	 * Readonly mode state file is not updated.
	 * @internal
	 */
	private readonly _readonlyMode: boolean;

	/**
	 * Create a new instance of FileStateStorage.
	 * @param filename The filename to store the state.
	 * @param readonlyMode Whether the file is in read-only mode.
	 */
	constructor(filename: string, readonlyMode: boolean = false) {
		Guards.stringValue(this.CLASS_NAME, nameof(filename), filename);
		this._filename = filename;
		this._readonlyMode = readonlyMode;
	}

	/**
	 * Method for loading the state.
	 * @param engineCore The engine core to load the state for.
	 * @returns The state of the engine or undefined if it doesn't exist.
	 */
	public async load(engineCore: IEngineCore): Promise<IEngineState | undefined> {
		try {
			engineCore.logInfo(
				I18n.formatMessage(`${StringHelper.camelCase(this.CLASS_NAME)}.loading`, {
					filename: this._filename
				})
			);
			if (await this.fileExists(this._filename)) {
				const content = await readFile(this._filename, "utf8");
				return JSON.parse(content.toString()) as IEngineState;
			}
		} catch (err) {
			throw new GeneralError(
				this.CLASS_NAME,
				"loadingError",
				{ filename: this._filename },
				BaseError.fromError(err)
			);
		}
	}

	/**
	 * Method for saving the state.
	 * @param engineCore The engine core to save the state for.
	 * @param state The state of the engine to save.
	 * @returns Nothing.
	 */
	public async save(engineCore: IEngineCore, state: IEngineState): Promise<void> {
		if (!this._readonlyMode) {
			try {
				engineCore.logInfo(
					I18n.formatMessage(`${StringHelper.camelCase(this.CLASS_NAME)}.saving`, {
						filename: this._filename
					})
				);
				await writeFile(this._filename, JSON.stringify(state), "utf8");
			} catch (err) {
				throw new GeneralError(
					this.CLASS_NAME,
					"savingError",
					{ filename: this._filename },
					BaseError.fromError(err)
				);
			}
		}
	}

	/**
	 * Does the specified file exist.
	 * @param filename The filename to check for existence.
	 * @returns True if the file exists.
	 * @internal
	 */
	private async fileExists(filename: string): Promise<boolean> {
		try {
			const stats = await stat(filename);
			return stats.isFile();
		} catch {
			return false;
		}
	}
}
