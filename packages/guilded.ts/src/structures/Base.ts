import { Client } from '.';

/** Represents a data model from Guilded. */
export class Base<ID = string> {
	/** The ID of this structure. */
	public readonly id: ID;

	/** @param client The client that owns this structure. */
	constructor(public readonly client: Client, id: ID) {
		this.id = id;
	}
}
