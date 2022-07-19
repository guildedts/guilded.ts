import { BaseManager } from './BaseManager';
import { ForumChannel } from '../structures/channel/ForumChannel';
import { Topic } from '../structures/Topic';

/**
 * The manager of topics that belong to a forum channel.
 * @example new TopicManager(channel);
 */
export class TopicManager extends BaseManager<number, Topic> {
	/** @param channel The forum channel the topics belong to. */
	constructor(public readonly channel: ForumChannel) {
		super(channel.client, channel.client.options.maxTopicCache);
	}

	/**
	 * Create a topic in the forum channel.
	 * @param title The title of the topic.
	 * @param content The content of the topic.
	 * @returns The created topic.
	 * @example topics.create('Title', 'Content');
	 */
	async post(title: string, content: string) {
		const raw = await this.client.api.topics.create(this.channel.id, title, content);
		return new Topic(this.channel, raw);
	}
}
