import { APIForumTopic, APIForumTopicEditPayload, APIForumTopicSummary } from 'guilded-api-typings';
import { FetchOptions } from '../managers/BaseManager';
import { Base } from './Base';
import { ForumChannel } from './channel/ForumChannel';

/**
 * Represents a topic on Guilded.
 * @example new ForumTopic(channel, rawForumTopic);
 */
export class ForumTopic extends Base<number> {
	/** The ID of the server the forum topic belongs to. */
	readonly serverId: string;
	/** The ID of the channel the forum topic belongs to. */
	readonly channelId: string;
	/** The title of the forum topic. */
	readonly title: string;
	/** The date the forum topic was created. */
	readonly createdAt: Date;
	/** The ID of the user that created the forum topic. */
	readonly createdBy: string;
	/** The ID of the webhook that created the forum topic. */
	readonly createdByWebhookId?: string;
	/** The date the forum topic was edited. */
	readonly editedAt?: Date;
	/** The date the forum topic was bumped. */
	readonly bumpedAt?: Date;
	/** The content of the forum topic. */
	readonly content?: string;

	/**
	 * @param channel The forum channel the topic belongs to.
	 * @param raw The raw data of the forum topic.
	 * @param cache Whether to cache the forum topic.
	 */
	constructor(
		public readonly channel: ForumChannel,
		public readonly raw: APIForumTopic | APIForumTopicSummary,
		cache = channel.client.options.cacheForumTopics ?? true,
	) {
		super(channel.client, raw.id);
		this.serverId = raw.serverId;
		this.channelId = raw.channelId;
		this.title = raw.title;
		this.createdAt = new Date(raw.createdAt);
		this.createdBy = raw.createdBy;
		this.createdByWebhookId = raw.createdByWebhookId;
		this.editedAt = raw.updatedAt ? new Date(raw.updatedAt) : undefined;
		this.bumpedAt = raw.bumpedAt ? new Date(raw.bumpedAt) : undefined;
		this.content = 'content' in raw ? raw.content : undefined;
		if (cache) channel.topics.cache.set(this.id, this);
	}

	/** Whether the forum topic is cached. */
	get isCached() {
		return this.channel.topics.cache.has(this.id);
	}

	/** The server the forum topic belongs to. */
	get server() {
		return this.channel.server;
	}

	/** The timestamp the forum topic was created. */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The server member that created the forum topic. */
	get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/** The webhook that created the forun topic. */
	get webhook() {
		return this.createdByWebhookId
			? this.channel.webhooks.cache.get(this.createdByWebhookId)
			: undefined;
	}

	/** The ID of the user that created the forum topic. */
	get authorId() {
		return this.createdByWebhookId || this.createdBy;
	}

	/** The timestamp the forum topic was edited. */
	get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/** The timestamp the forum topic was bumped. */
	get bumpedTimestamp() {
		return this.bumpedAt?.getTime();
	}

	/**
	 * Fetch the forum topic.
	 * @param options The options to fetch the forum topic with.
	 * @returns The fetched forum topic.
	 * @example forumTopic.fetch();
	 */
	fetch(options?: FetchOptions) {
		return this.channel.topics.fetch(this, options);
	}

	/**
	 * Fetch the server the forum topic belongs to.
	 * @param options The options to fetch the server with.
	 * @returns The fetched server.
	 * @example forumTopic.fetchServer();
	 */
	fetchServer(options?: FetchOptions) {
		return this.channel.fetchServer(options);
	}

	/**
	 * Fetch the server member that created the forum topic.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example forumTopic.fetchAuthor();
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Fetch the webhook that created the forum topic.
	 * @param options The options to fetch the webhook with.
	 * @returns The fetched webhook.
	 * @example forumTopic.fetchWebhook();
	 */
	fetchWebhook(options?: FetchOptions) {
		return this.createdByWebhookId
			? this.channel.webhooks.fetch(this.createdByWebhookId, options)
			: undefined;
	}

	/**
	 * Edit the forum topic.
	 * @param payload The payload of the forum topic.
	 * @returns The edited forum topic.
	 * @example forumTopic.edit({ title: 'New title' });
	 */
	edit(payload: APIForumTopicEditPayload) {
		return this.channel.topics.edit(this, payload) as Promise<this>;
	}

	/**
	 * Delete the forum topic.
	 * @returns The deleted forum topic.
	 * @example forumTopic.delete();
	 */
	async delete() {
		this.channel.topics.delete(this);
		return this;
	}
}
