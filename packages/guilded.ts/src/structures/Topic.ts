import { APITopic } from 'guilded-api-typings';
import { FetchOptions } from '../managers/BaseManager';
import { Base } from './Base';
import { ForumChannel } from './channel/ForumChannel';

/**
 * Represents a topic on Guilded.
 * @example new Topic(channel, rawTopic);
 */
export class Topic extends Base<number> {
	/** The ID of the server the topic belongs to. */
	readonly serverId: string;
	/** The ID of the channel the topic belongs to. */
	readonly channelId: string;
	/** The title of the topic. */
	readonly title?: string;
	/** The content of the topic. */
	readonly content?: string;
	/** The date the topic was created. */
	readonly createdAt: Date;
	/** The ID of the user that created the topic. */
	readonly createdBy: string;
	/** The ID of the webhook that created the topic. */
	readonly createdByWebhookId?: string;
	/** The date the topic was edited. */
	readonly editedAt?: Date;

	/**
	 * @param channel The forum channel the topic belongs to.
	 * @param raw The raw data of the topic.
	 * @param cache Whether to cache the topic.
	 */
	constructor(
		public readonly channel: ForumChannel,
		public readonly raw: APITopic,
		cache = channel.client.options.cacheTopics ?? true,
	) {
		super(channel.client, raw.id);
		this.serverId = raw.serverId;
		this.channelId = raw.channelId;
		this.title = raw.title;
		this.content = raw.content;
		this.createdAt = new Date(raw.createdAt);
		this.createdBy = raw.createdBy;
		this.createdByWebhookId = raw.createdByWebhookId;
		this.editedAt = raw.updatedAt ? new Date(raw.updatedAt) : undefined;
		if (cache) channel.topics.cache.set(this.id, this);
	}

	/** Whether the topic is cached. */
	get isCached() {
		return this.channel.topics.cache.has(this.id);
	}

	/** The server the topic belongs to. */
	get server() {
		return this.channel.server;
	}

	/** The timestamp the topic was created. */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The server member that created the topic. */
	get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/** The webhook that created the topic. */
	get webhook() {
		return this.createdByWebhookId
			? this.channel.webhooks.cache.get(this.createdByWebhookId)
			: undefined;
	}

	/** The ID of the user that created the topic. */
	get authorId() {
		return this.createdByWebhookId || this.createdBy;
	}

	/** The timestamp the topic was edited. */
	get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/**
	 * Fetch the server the topic belongs to.
	 * @param options The options to fetch the server with.
	 * @returns The fetched server.
	 * @example topic.fetchServer();
	 */
	fetchServer(options?: FetchOptions) {
		return this.channel.fetchServer(options);
	}

	/**
	 * Fetch the server member that created the topic.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example topic.fetchAuthor();
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Fetch the webhook that created the topic.
	 * @param options The options to fetch the webhook with.
	 * @returns The fetched webhook.
	 * @example topic.fetchWebhook();
	 */
	fetchWebhook(options?: FetchOptions) {
		return this.createdByWebhookId
			? this.channel.webhooks.fetch(this.createdByWebhookId, options)
			: undefined;
	}
}
