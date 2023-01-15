import { Client } from './Client';

/**
 * Represents a data model on Guilded
 */
export abstract class Base {
	/**
	 * @param client The client
	 */
	constructor(public readonly client: Client) {}
}
