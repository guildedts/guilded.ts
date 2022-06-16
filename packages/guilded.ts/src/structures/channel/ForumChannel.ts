import { APIChannel, APIChannelType } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { TopicManager } from '../../managers/TopicManager';

/** Represents a forum channel on Guilded. */
export class ForumChannel extends Channel {
	public declare readonly type: APIChannelType.Forums;

	/** The manager of topics that belong to the forum channel. */
	public readonly topics: TopicManager;

	/**
	 * @param client The client the forum channel belongs to.
	 * @param raw The raw data of the forum channel.
	 */
	constructor(client: Client, raw: APIChannel) {
		super(client, raw);
		this.topics = new TopicManager(this);
	}

	/**
	 * Create a topic in the forum channel.
	 * @param title The title of the topic.
	 * @param content The content of the topic.
	 * @returns The created topic.
	 */
	public post(title: string, content: string) {
		return this.topics.post(title, content);
	}
}
