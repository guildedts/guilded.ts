import { Client } from './Client';

/**
 * Represents a data model on Guilded.
 * @example new Base(client, id);
 */
export class Base<Id = string> {
	/**
	 * @param client The client the data model belongs to.
	 * @param id The ID of the structure.
	 */
	constructor(public readonly client: Client, public readonly id: Id) {}
}
