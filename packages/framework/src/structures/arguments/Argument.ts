import { inlineCode } from 'guilded.ts';
import { Command } from '../Command';

/** Represents a command argument. */
export abstract class Argument {
	/** The name of the argument. */
	public abstract name: string;
	/** The description of the argument. */
	public description?: string;
	/** Whether the argument is required. */
	public required = true;

	/** @param command The command the argument belongs to. */
	constructor(public readonly command: Command) {}

	/** The usage of the argument. */
	public get usage() {
		return this.required ? `<${this.name}>` : `[${this.name}]`;
	}

	/**
	 * Validates the argument.
	 * @param value The value of the argument.
	 * @returns The validated value, or error.
	 */
	public async validate(value: string): Promise<unknown> {
		if (!value && this.required)
			throw new Error(`Missing required argument ${inlineCode(this.name)}`);
		else return value;
	}
}

/** The constructor for a command argument. */
export type ArgumentConstructor = new (command: Command) => Argument;
