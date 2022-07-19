import { inlineCode } from 'guilded.ts';
import { Argument } from './Argument';

/**
 * Represents a boolean command argument.
 * @example
 * class MyArgument extends BooleanArgument {
 *     name = 'my-argument';
 * }
 */
export abstract class BooleanArgument extends Argument {
	/** The default value of the argument. */
	default?: boolean;

	/**
	 * Validates the boolean argument.
	 * @param value The value of the argument.
	 * @returns The validated value, or error.
	 * @example booleanArgument.validate('true'); // true
	 */
	async validate(value: string): Promise<boolean> {
		value = (await super.validate(value)) as string;
		if (this.default && !value) return this.default;
		else if (
			['true', 'yes', 'y', 'on', 'enable', 'false', 'no', 'n', 'off', 'disable'].includes(
				value.toLocaleLowerCase(),
			)
		)
			return ['true', 'yes', 'y', 'on', 'enable'].includes(value.toLocaleLowerCase());
		else throw new Error(`${inlineCode(this.name)} must be a boolean`);
	}
}
