import { APIChannel } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { TopicManager } from '../../managers/TopicManager';

/**
 * Represents a forum channel on Guilded.
 * @example new ForumChannel(client, rawChannel);
 */
export class ForumChannel extends Channel {
	/** The manager of topics that belong to the forum channel. */
	readonly topics: TopicManager;

	/**
	 * @param client The client the forum channel belongs to.
	 * @param raw The raw data of the forum channel.
	 * @param cache Whether to cache the forum channel.
	 */
	constructor(client: Client, raw: APIChannel, cache?: boolean) {
		super(client, raw, cache);
		this.topics = new TopicManager(this);
	}

	/**
	 * Create a topic in the forum channel.
	 * @param title The title of the topic.
	 * @param content The content of the topic.
	 * @returns The created topic.
	 * @example channel.post('Title', 'Content');
	 */
	post(title: string, content: string) {
		return this.topics.post(title, content);
	}
}
