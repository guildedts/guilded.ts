import { inlineCode } from 'guilded.ts';
import { Argument } from './Argument';

/**
 * Represents a string command argument
 */
export abstract class StringArgument extends Argument {
	/**
	 * The default value of the argument
	 */
	default: string | null = null;
	/**
	 * The choices of the argument
	 */
	choices: string[] = [];
	/**
	 * The max length of the argument
	 */
	max = Infinity;
	/**
	 * The min length of the argument
	 */
	min = -Infinity;

	/**
	 * Validates the string argument
	 * @param value The value of the argument
	 * @returns The validated value
	 * @example stringArgument.validate('hello'); // 'hello'
	 */
	async validate(value: string): Promise<string> {
		value = (await super.validate(value)) as string;
		if (this.choices.length > 0 && !this.choices.includes(value))
			throw new Error(
				`${inlineCode(this.name)} must tbe one of the following: ${this.choices
					.map((choice) => inlineCode(choice))
					.join(', ')}`,
			);
		else if (value.length > this.max)
			throw new Error(`${inlineCode(this.name)} must be shorter than ${this.max} characters`);
		else if (value.length < this.min)
			throw new Error(`${inlineCode(this.name)} must be longer than ${this.min} characters`);
		else if (this.default !== null && !value) return this.default;
		else return value;
	}
}
