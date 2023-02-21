import { Routes } from 'guilded-api-typings';
import { BaseRouter } from '../BaseRouter';

/**
 * The reaction router for the Guilded REST API
 */
export class ForumTopicCommentReactionRouter extends BaseRouter {
	/**
	 * Create a reaction on Guilded
	 * @param channelId The ID of the channel
	 * @param topicId The ID of the topic
	 * @param commentId The ID of the content
	 * @param emojiId The ID of the emoji
	 */
	create(channelId: string, topicId: number, commentId: number, emojiId: number) {
		return this.rest.put<void>(
			Routes.forumTopicCommentReaction(channelId, topicId, commentId, emojiId),
		);
	}

	/**
	 * Delete a reaction from Guilded
	 * @param channelId The ID of the channel
	 * @param topicId The ID of the topic
	 * @param commentId The ID of the content
	 * @param emojiId The ID of the emoji
	 */
	delete(channelId: string, topicId: number, commentId: number, emojiId: number) {
		return this.rest.delete<void>(
			Routes.forumTopicCommentReaction(channelId, topicId, commentId, emojiId),
		);
	}
}
