import { APIForumTopicCommentReaction } from 'guilded-api-typings';
import { Base } from '../Base';
import { ForumChannel } from '../channel/ForumChannel';
import { ForumTopicComment } from './ForumTopicComment';
import { ForumTopic } from './ForumTopic';

/**
 * Represents a forum comment reaction on Guilded
 */
export class ForumTopicCommentReaction extends Base {
	/**
	 * @param channel The forum channel
	 * @param forumTopic The forum topic
	 * @param forumTopicComment The forum topic comment
	 * @param data The data of the forum topic comment reaction
	 * @param cache Whether to cache the forum topic comment reaction
	 */
	constructor(
		public readonly channel: ForumChannel,
		public readonly forumTopic: ForumTopic,
		public readonly forumTopicComment: ForumTopicComment,
		public readonly data: APIForumTopicCommentReaction,
		cache = channel.client.options.cacheForumTopicComments ?? true,
	) {
		super(channel.client);
		if (cache) this.forumTopicComment.reactions.cache.set(this.emote.id, this);
	}

	/**
	 * Whether the forum topic reaction is cached
	 */
	get isCached() {
		return this.forumTopicComment.reactions.cache.has(this.emote.id);
	}

	/**
	 * The ID of the user that created the forum topic reaction
	 */
	get creatorId() {
		return this.data.createdBy;
	}

	/**
	 * The user that created the forum topic reaction
	 */
	get creator() {
		return this.client.users.cache.get(this.creatorId) ?? null;
	}

	/**
	 * Whether the client user created the forum topic reaction
	 */
	get isCreator() {
		return this.creatorId === this.client.user?.id;
	}

	/**
	 * The emote
	 */
	get emote() {
		return this.data.emote;
	}

	/**
	 * Fetch the user that created the forum topic comment reaction
	 * @returns The fetched user
	 */
	async fetchCreator() {
		return this.client.users.fetch(this.forumTopic.channel.serverId, this.creatorId);
	}

	/**
	 * Remove the reaction from the forum topic comment
	 */
	remove() {
		return this.forumTopicComment.reactions.remove(this.emote.id);
	}
}
