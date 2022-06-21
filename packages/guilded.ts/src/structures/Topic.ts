import { APITopic } from 'guilded-api-typings';
import { Base } from './Base';
import { ForumChannel } from './channel/ForumChannel';

/** Represents a topic on Guilded. */
export class Topic extends Base<number> {
	/** The ID of the server the topic belongs to. */
	public readonly serverId: string;
	/** The ID of the channel the topic belongs to. */
	public readonly channelId: string;
	/** The title of the topic. */
	public readonly title?: string;
	/** The content of the topic. */
	public readonly content?: string;
	/** The date the topic was created. */
	public readonly createdAt: Date;
	/** The ID of the user that created the topic. */
	public readonly createdBy: string;
	/** The ID of the webhook that created the topic. */
	public readonly createdByWebhookId?: string;
	/** The date the topic was edited. */
	public readonly editedAt?: Date;

	/**
	 * @param channel The forum channel the topic belongs to.
	 * @param raw The raw data of the topic.
	 * @param cache Whether to cache the topic.
	 */
	public constructor(
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
	public get isCached() {
		return this.channel.topics.cache.has(this.id);
	}

	/** The server the topic belongs to. */
	public get server() {
		return this.channel.server;
	}

	/** The timestamp the topic was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The server member that created the topic. */
	public get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/** The webhook that created the topic. */
	public get webhook() {
		return this.createdByWebhookId
			? this.channel.webhooks.cache.get(this.createdByWebhookId)
			: undefined;
	}

	/** The ID of the user that created the topic. */
	public get authorId() {
		return this.createdByWebhookId || this.createdBy;
	}

	/** The timestamp the topic was edited. */
	public get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/**
	 * Fetch the server the topic belongs to.
	 * @param cache Whether to cache the fetched server.
	 * @returns The fetched server.
	 */
	public fetchServer(cache?: boolean) {
		return this.channel.fetchServer(cache);
	}

	/**
	 * Fetch the server member that created the topic.
	 * @param cache Whether to cache the fetched server member.
	 * @returns The fetched server member.
	 */
	public async fetchAuthor(cache?: boolean) {
		const server = await this.fetchServer(cache);
		return server.members.fetch(this.createdBy, cache);
	}

	/**
	 * Fetch the webhook that created the topic.
	 * @param cache Whether to cache the fetched webhook.
	 * @returns The fetched webhook.
	 */
	public fetchWebhook(cache?: boolean) {
		return this.createdByWebhookId
			? this.channel.webhooks.fetch(this.createdByWebhookId, cache)
			: undefined;
	}
}
