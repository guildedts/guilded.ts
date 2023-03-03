import { APIForumTopicComment, RESTPatchForumTopicCommentJSONBody } from 'guilded-api-typings';
import { FetchOptions } from '../../managers/BaseManager';
import { Base } from '../Base';
import { ForumChannel } from '../channel/ForumChannel';
import { ForumTopic } from './ForumTopic';
import { ForumTopicCommentReactionManager } from '../../managers/forum/ForumTopicCommentReactionManager';

/**
 * Represents a forum comment on Guilded
 */
export class ForumTopicComment extends Base {
	/**
	 * The manager for reactions
	 */
	readonly reactions: ForumTopicCommentReactionManager;

	/**
	 * @param channel The forum channel
	 * @param data The data of the forum topic
	 * @param cache Whether to cache the forum topic
	 */
	constructor(
		public readonly channel: ForumChannel,
		public readonly forumTopic: ForumTopic,
		public readonly data: APIForumTopicComment,
		cache = channel.client.options.cacheForumTopicComments ?? true,
	) {
		super(channel.client);
		this.reactions = new ForumTopicCommentReactionManager(this);
		if (cache) this.forumTopic.comments.cache.set(this.id, this);
	}

	/**
	 * Whether the forum topic comment is cached
	 */
	get isCached() {
		return this.forumTopic.comments.cache.has(this.id);
	}

	/**
	 * The ID of the forum topic comment
	 */
	get id() {
		return this.data.id;
	}

	/**
	 * When the forum topic comment was created
	 */
	get createdAt() {
		return new Date(this.data.createdAt);
	}

	/**
	 * The ID of the user that created the forum topic comment
	 */
	get creatorId() {
		return this.data.createdBy;
	}

	/**
	 * The user that created the forum topic comment
	 */
	get creator() {
		return this.client.users.cache.get(this.creatorId) ?? null;
	}

	/**
	 * Whether the client user created the forum topic comment
	 */
	get isCreator() {
		return this.creatorId == this.client.user?.id;
	}

	/**
	 * When the forum topic comment was updated, if relevant
	 */
	get updatedAt() {
		return this.data.updatedAt ? new Date(this.data.updatedAt) : null;
	}

	/**
	 * The content of the forum topic comment
	 */
	get content() {
		return 'content' in this.data ? this.data.content : null;
	}

	/**
	 * The mentions of the forum topic comment
	 */
	get mentions() {
		return 'mentions' in this.data ? this.data.mentions ?? {} : {};
	}

	/**
	 * Fetch the forum topic comment
	 * @param options The options to fetch the forum topic comment with
	 * @returns The fetched forum topic comment
	 */
	fetch(options?: FetchOptions) {
		return this.forumTopic.comments.fetch(this.data.id, options);
	}

	/**
	 * Fetch the user that created the forum topic comment
	 * @returns The fetched user
	 */
	async fetchCreator() {
		return this.client.users.fetch(this.channel.serverId, this.data.createdBy);
	}

	/**
	 * Update a forum topic comment's content
	 * @param options The options to update the forum topic comment with
	 * @returns The updated forum topic comment
	 */
	update(options: RESTPatchForumTopicCommentJSONBody) {
		return this.forumTopic.comments.update(this, options) as Promise<this>;
	}

	/**
	 * Delete the forum topic comment
	 * @returns The deleted forum topic comment
	 */
	async delete() {
		await this.forumTopic.comments.delete(this.id);
		return this;
	}
}
