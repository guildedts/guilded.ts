import { Client } from './Client';

/** Represents a data model from Guilded. */
export class Base<ID = string> {
	/**
	 * @param client The client that owns the structure.
	 * @param id The ID of the structure.
	 */
	constructor(public readonly client: Client, public readonly id: ID) {}
}
