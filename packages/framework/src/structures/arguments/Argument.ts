import { inlineCode } from 'guilded.ts';
import { Command } from '../Command';

/**
 * Represents a command argument
 * @example
 * class MyArgument extends Argument {
 *     name = 'content';
 * }
 */
export abstract class Argument {
	/**
	 * The name of the argument
	 */
	abstract name: string;
	/**
	 * The description of the argument
	 */
	description: string | null = null;
	/**
	 * Whether the argument is required
	 */
	required = true;

	/**
	 * @param command The command
	 */
	constructor(public readonly command: Command) {}

	/**
	 * The usage of the argument
	 */
	get usage() {
		return this.required ? `<${this.name}>` : `[${this.name}]`;
	}

	/**
	 * Validates the argument
	 * @param value The value of the argument
	 * @returns The validated value
	 */
	async validate(value: string): Promise<unknown> {
		if (!value && this.required)
			throw new Error(`Missing required argument ${inlineCode(this.name)}`);
		else return value;
	}
}

/** The constructor for a command argument. */
export type ArgumentConstructor = new (command: Command) => Argument;
