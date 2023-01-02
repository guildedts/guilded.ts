import {
	APIForumTopic,
	RESTPatchForumTopicJSONBody,
	APIForumTopicSummary,
	APIMentions,
} from 'guilded-api-typings';
import { FetchOptions } from '../managers/BaseManager';
import { Base } from './Base';
import { ForumChannel } from './channel/ForumChannel';

/**
 * Represents a forum topic on Guilded
 */
export class ForumTopic extends Base<number> {
	/**
	 * The ID of the server
	 */
	readonly serverId: string;
	/**
	 * The ID of the channel
	 */
	readonly channelId: string;
	/**
	 * The title of the forum topic (`1`-`500` characters)
	 */
	readonly title: string;
	/**
	 * When the forum topic was created
	 */
	readonly createdAt: Date;
	/**
	 * The ID of the user who created the forum topic
	 *
	 * **Note:** If this forum topic has {@link createdByWebhookId}, this field will still be populated, but can be ignored
	 */
	readonly createdBy: string;
	/**
	 * The ID of the webhook that created the forum topic, if it was created by a webhook
	 */
	readonly createdByWebhookId?: string;
	/**
	 * When the forum topic was updated, if relevant
	 */
	readonly editedAt?: Date;
	/**
	 * When the forum topic was bumped, if relevant
	 *
	 * This is updated whenever there is any activity within the forum topic
	 */
	readonly bumpedAt?: Date;
	/**
	 * The content of the forum topic
	 */
	readonly content?: string;
	/**
	 * The mentions of the forum topic
	 */
	readonly mentions?: APIMentions;

	/**
	 * @param channel The forum channel
	 * @param raw The data of the forum topic
	 * @param cache Whether to cache the forum topic
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
		this.mentions = 'mentions' in raw ? raw.mentions : undefined;
		if (cache) channel.topics.cache.set(this.id, this);
	}

	/**
	 * Whether the forum topic is cached
	 */
	get isCached() {
		return this.channel.topics.cache.has(this.id);
	}

	/**
	 * The server
	 */
	get server() {
		return this.channel.server;
	}

	/**
	 * The timestamp of when the forum topic was created
	 */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/**
	 * The server member that created the forum topic
	 */
	get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/**
	 * The webhook that created the forum topic, if it was created by a webhook
	 */
	get webhook() {
		return this.createdByWebhookId
			? this.channel.webhooks.cache.get(this.createdByWebhookId)
			: undefined;
	}

	/**
	 * The ID of the user that created the forum topic
	 */
	get authorId() {
		return this.createdByWebhookId || this.createdBy;
	}

	/**
	 * The timestamp of when the forum topic was edited, if relevant
	 */
	get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/**
	 * The timestamp of when the forum topic was bumped, if relevant
	 *
	 * This is updated whenever there is any activity within the forum topic
	 */
	get bumpedTimestamp() {
		return this.bumpedAt?.getTime();
	}

	/**
	 * Fetch the forum topic
	 * @param options The options to fetch the forum topic with
	 * @returns The fetched forum topic
	 */
	fetch(options?: FetchOptions) {
		return this.channel.topics.fetch(this, options);
	}

	/**
	 * Fetch the server
	 * @param options The options to fetch the server with
	 * @returns The fetched server
	 */
	fetchServer(options?: FetchOptions) {
		return this.channel.fetchServer(options);
	}

	/**
	 * Fetch the server member that created the forum topic
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Fetch the webhook that created the forum topic
	 * @param options The options to fetch the webhook with
	 * @returns The fetched webhook
	 */
	fetchWebhook(options?: FetchOptions) {
		return this.createdByWebhookId
			? this.channel.webhooks.fetch(this.createdByWebhookId, options)
			: undefined;
	}

	/**
	 * Edit the forum topic
	 * @param payload The payload of the forum topic
	 * @returns The edited forum topic
	 */
	edit(payload: RESTPatchForumTopicJSONBody) {
		return this.channel.topics.edit(this, payload) as Promise<this>;
	}

	/**
	 * Delete the forum topic
	 * @returns The deleted forum topic
	 */
	async delete() {
		await this.channel.topics.delete(this);
		return this;
	}

	/**
	 * Pin the forum topic
	 * @returns The pinned forum topic
	 */
	async pin() {
		await this.channel.topics.pin(this);
		return this;
	}

	/**
	 * Unpin the forum topic
	 * @returns The unpinned forum topic
	 */
	async unpin() {
		await this.channel.topics.unpin(this);
		return this;
	}

	/**
	 * Lock the forum topic
	 * @returns The locked forum topic
	 */
	async lock() {
		await this.channel.topics.lock(this);
		return this;
	}

	/**
	 * Unlock the forum topic
	 * @returns The unlocked forum topic
	 */
	async unlock() {
		await this.channel.topics.unlock(this);
		return this;
	}
}
