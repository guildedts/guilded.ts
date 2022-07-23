import { APIChannel, APIForumTopicPayload } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { ForumTopicManager } from '../../managers/ForumTopicManager';

/**
 * Represents a forum channel on Guilded.
 * @example new ForumChannel(client, rawChannel);
 */
export class ForumChannel extends Channel {
	/** The manager of topics that belong to the forum channel. */
	readonly topics: ForumTopicManager;

	/**
	 * @param client The client the forum channel belongs to.
	 * @param raw The raw data of the forum channel.
	 * @param cache Whether to cache the forum channel.
	 */
	constructor(client: Client, raw: APIChannel, cache?: boolean) {
		super(client, raw, cache);
		this.topics = new ForumTopicManager(this);
	}

	/**
	 * Create a topic in the forum channel.
	 * @param title The title of the topic.
	 * @param content The content of the topic.
	 * @returns The created topic.
	 * @example channel.post({ title: 'My Topic' });
	 */
	post(payload: APIForumTopicPayload) {
		return this.topics.create(payload);
	}
}
