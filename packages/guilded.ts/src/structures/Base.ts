import { Client } from '..';

/** Represents a data model from Guilded. */
export class Base {
	/** @param client The client that owns this structure. */
	constructor(public readonly client: Client) {}
}
