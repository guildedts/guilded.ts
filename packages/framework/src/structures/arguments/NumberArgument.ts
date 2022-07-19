import { inlineCode } from 'guilded.ts';
import { Argument } from './Argument';

/**
 * Represents a number command argument.
 * @example
 * class MyArgument extends NumberArgument {
 *     name = 'my-argument';
 * }
 */
export abstract class NumberArgument extends Argument {
	/** The default value of the argument. */
	default?: number;
	/** The choices of the argument. */
	choices: number[] = [];
	/** The max value of the argument. */
	max?: number;
	/** The min value of the argument. */
	min?: number;

	/**
	 * Validates the number argument.
	 * @param value The value of the argument.
	 * @returns The validated value, or error.
	 * @example numberArgument.validate('1'); // 1
	 */
	async validate(value: string): Promise<number> {
		value = (await super.validate(value)) as string;
		if (isNaN(value as any)) throw new Error(`${inlineCode(this.name)} must be a number.`);
		else if (this.choices.length > 0 && !this.choices.includes(Number(value)))
			throw new Error(
				`${inlineCode(this.name)} must tbe one of the following: ${this.choices
					.map((choice) => inlineCode(`${choice}`))
					.join(', ')}.`,
			);
		else if (this.max && Number(value) > this.max)
			throw new Error(`${inlineCode(this.name)} must be less than ${this.max}.`);
		else if (this.min && Number(value) < this.min)
			throw new Error(`${inlineCode(this.name)} must be greater than ${this.min}.`);
		else if (this.default && !value) return this.default;
		else return Number(value);
	}
}
