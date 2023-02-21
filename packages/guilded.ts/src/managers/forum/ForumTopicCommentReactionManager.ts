import { BaseManager, FetchManyOptions } from '../BaseManager';
import { RESTGetForumTopicCommentsResult } from 'guilded-api-typings';
import { ForumTopicComment } from '../../structures/forum/ForumTopicComment';
import { ForumTopicCommentReaction } from '../../structures/forum/ForumTopicCommentReaction';
import { ForumTopicCommentReactionCollector } from '../../collectors/ForumTopicCommentReactionCollector';
import { CollectorOptions } from '../../collectors/Collector';
import { Collection } from '@discordjs/collection';

/**
 * The manager for forum topic comment reactions
 */
export class ForumTopicCommentReactionManager extends BaseManager<
	number,
	ForumTopicCommentReaction
> {
	/**
	 * @param forumTopicComment The forum topic comment
	 */
	constructor(public readonly forumTopicComment: ForumTopicComment) {
		super(forumTopicComment.client, forumTopicComment.client.options.maxMessageReactionCache);
	}

	/**
	 * Add a reaction to the forum topic comment
	 * @param emojiId The ID of the emoji
	 */
	add(emojiId: number) {
		return this.client.api.forumTopicCommentReactions.create(
			this.forumTopicComment.channel.id,
			this.forumTopicComment.forumTopic.id,
			this.forumTopicComment.id,
			emojiId,
		);
	}

	/**
	 * Remove a reaction from the forum topic comment
	 * @param emojiId The ID of the emoji
	 */
	remove(emojiId: number) {
		return this.client.api.forumTopicCommentReactions.delete(
			this.forumTopicComment.channel.id,
			this.forumTopicComment.forumTopic.id,
			this.forumTopicComment.id,
			emojiId,
		);
	}

	/**
	 * Create a reaction collector for the forum topic comment
	 * @param options The options for the forum topic comment reaction collector
	 * @returns The created forum topic comment reaction collector
	 * @example
	 * const collector = comment.reactions.createCollector({ time: 15 * 1000 });
	 *
	 * collector.on('end', (reactions) => console.log(`Collected ${reactions.size} reactions!`));
	 */
	createCollector(options?: CollectorOptions<ForumTopicCommentReaction>) {
		return new ForumTopicCommentReactionCollector(this, options);
	}

	/**
	 * Similar to {@link createCollector} but in promise form
	 * @param options The options for the forum topic comment reaction collector
	 * @returns The collected forum topic comment reactions
	 * @example
	 * const reactions = await comment.reactions.awaitReactions({ time: 15 * 1000 });
	 *
	 * console.log(`Collected ${reactions.size} reactions!`);
	 */
	awaitReactions(options?: CollectorOptions<ForumTopicCommentReaction>) {
		return new Promise<Collection<number, ForumTopicCommentReaction>>((resolve) =>
			this.createCollector(options).once('end', resolve),
		);
	}
}

/**
 * The options for fetching forum topics
 */
export interface ForumTopicCommentFetchManyOptions
	extends FetchManyOptions,
		RESTGetForumTopicCommentsResult {}
