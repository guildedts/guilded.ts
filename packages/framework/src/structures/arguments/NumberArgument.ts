import { inlineCode } from 'guilded.ts';
import { Argument } from './Argument';

/** Represents a number command argument. */
export abstract class NumberArgument extends Argument {
	/** The default value of the argument. */
	public default?: number;
	/** The choices of the argument. */
	public choices: number[] = [];
	/** The max value of the argument. */
	public max?: number;
	/** The min value of the argument. */
	public min?: number;

	public async validate(value: string): Promise<number> {
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
