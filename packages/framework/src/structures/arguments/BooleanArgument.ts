import { inlineCode } from 'guilded.ts';
import { Argument } from './Argument';

/** Represents a boolean command argument. */
export abstract class BooleanArgument extends Argument {
	/** The default value of the argument. */
	public default?: boolean;

	public async validate(value: string): Promise<boolean> {
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
