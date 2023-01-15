import {
	APIForumTopic,
	RESTPatchForumTopicJSONBody,
	APIForumTopicSummary,
} from 'guilded-api-typings';
import { FetchOptions } from '../managers/BaseManager';
import { Base } from './Base';
import { ForumChannel } from './channel/ForumChannel';

/**
 * Represents a forum topic on Guilded
 */
export class ForumTopic extends Base {
	/**
	 * @param channel The forum channel
	 * @param data The data of the forum topic
	 * @param cache Whether to cache the forum topic
	 */
	constructor(
		public readonly channel: ForumChannel,
		public readonly data: APIForumTopic | APIForumTopicSummary,
		cache = channel.client.options.cacheForumTopics ?? true,
	) {
		super(channel.client);
		if (cache) channel.topics.cache.set(this.id, this);
	}

	/**
	 * Whether the forum topic is cached
	 */
	get isCached() {
		return this.channel.topics.cache.has(this.id);
	}

	/**
	 * The ID of the forum topic
	 */
	get id() {
		return this.data.id;
	}

	/**
	 * The title of the forum topic (`1`-`500` characters)
	 */
	get title() {
		return this.data.title;
	}

	/**
	 * When the forum topic was created
	 */
	get createdAt() {
		return new Date(this.data.createdAt);
	}

	/**
	 * The ID of the user that created the forum topic
	 */
	get creatorId() {
		return this.data.createdBy;
	}

	/**
	 * The user that created the forum topic
	 */
	get creator() {
		return this.client.users.cache.get(this.creatorId) ?? null;
	}

	/**
	 * Whether the client user created the forum topic
	 */
	get isCreator() {
		return this.creatorId == this.client.user?.id;
	}

	/**
	 * When the forum topic was updated, if relevant
	 */
	get updatedAt() {
		return this.data.updatedAt ? new Date(this.data.updatedAt) : null;
	}

	/**
	 * When the forum topic was bumped, if relevant
	 *
	 * This is updated whenever there is any activity within the forum topic
	 */
	get bumpedAt() {
		return this.data.bumpedAt ? new Date(this.data.bumpedAt) : null;
	}

	/**
	 * Whether the forum topic is pinned
	 */
	get isPinned() {
		return this.data.isPinned ?? false;
	}

	/**
	 * Whether the forum topic is locked
	 */
	get isLocked() {
		return this.data.isLocked ?? false;
	}

	/**
	 * The content of the forum topic
	 */
	get content() {
		return 'content' in this.data ? this.data.content : null;
	}

	/**
	 * The mentions of the forum topic
	 */
	get mentions() {
		return 'mentions' in this.data ? this.data.mentions ?? {} : {};
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
	 * Fetch the user that created the forum topic
	 * @returns The fetched user
	 */
	async fetchCreator() {
		return this.client.users.fetch(this.channel.serverId, this.creatorId);
	}

	/**
	 * Update the forum topic
	 * @param options The options to update the forum topic with
	 * @returns The updated forum topic
	 */
	update(options: RESTPatchForumTopicJSONBody) {
		return this.channel.topics.update(this, options) as Promise<this>;
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
