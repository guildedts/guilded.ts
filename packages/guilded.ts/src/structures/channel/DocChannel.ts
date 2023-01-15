import { APIChannel } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { DocManager } from '../../managers/DocManager';

/**
 * Represents a doc channel on Guilded
 */
export class DocChannel extends Channel {
	/**
	 * The manager for docs
	 */
	readonly docs: DocManager;

	/**
	 * @param client The client
	 * @param data The data of the doc channel
	 * @param cache Whether to cache the doc channel
	 */
	constructor(client: Client, data: APIChannel, cache?: boolean) {
		super(client, data, cache);
		this.docs = new DocManager(this);
	}
}
