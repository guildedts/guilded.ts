import { Routes } from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/**
 * The reaction router for the Guilded REST API
 */
export class ReactionRouter extends BaseRouter {
	/**
	 * Create a reaction on Guilded
	 * @param channelId The ID of the channel
	 * @param contentId The ID of the content
	 * @param emojiId The ID of the emoji
	 */
	create(channelId: string, contentId: string, emojiId: number) {
		return this.rest.put<void>(Routes.messageReaction(channelId, contentId, emojiId));
	}

	/**
	 * Delete a reaction from Guilded
	 * @param channelId The ID of the channel
	 * @param contentId The ID of the content
	 * @param emojiId The ID of the emoji
	 */
	delete(channelId: string, contentId: string, emojiId: number) {
		return this.rest.delete<void>(Routes.messageReaction(channelId, contentId, emojiId));
	}
}
