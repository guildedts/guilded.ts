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
	 * @param raw The data of the doc channel
	 * @param cache Whether to cache the doc channel
	 */
	constructor(client: Client, raw: APIChannel, cache?: boolean) {
		super(client, raw, cache);
		this.docs = new DocManager(this);
	}

	/**
	 * Create a doc in the channel
	 * @param title The title of the doc
	 * @param content The content of the doc
	 * @returns The created doc
	 */
	post(title: string, content: string) {
		return this.docs.create(title, content);
	}
}
