import { APIChannel, RESTPostForumTopicJSONBody } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { ForumTopicManager } from '../../managers/ForumTopicManager';

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
	 * @param raw The data of the forum channel
	 * @param cache Whether to cache the forum channel
	 */
	constructor(client: Client, raw: APIChannel, cache?: boolean) {
		super(client, raw, cache);
		this.topics = new ForumTopicManager(this);
	}

	/**
	 * Create a forum topic in the channel
	 * @param title The title of the forum topic
	 * @param content The content of the forum topic
	 * @returns The created forum topic
	 */
	post(payload: RESTPostForumTopicJSONBody) {
		return this.topics.create(payload);
	}
}
