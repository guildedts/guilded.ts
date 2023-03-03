import { APIChannel } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { ForumTopicManager } from '../../managers/forum/ForumTopicManager';

/**
 * Represents a forum channel on Guilded
 */
export class ForumChannel extends Channel {
	/**
	 * The manager for topics
	 */
	readonly topics: ForumTopicManager;

	/**
	 * @param client The client
	 * @param data The data of the forum channel
	 * @param cache Whether to cache the forum channel
	 */
	constructor(client: Client, data: APIChannel, cache?: boolean) {
		super(client, data, cache);
		this.topics = new ForumTopicManager(this);
	}
}
