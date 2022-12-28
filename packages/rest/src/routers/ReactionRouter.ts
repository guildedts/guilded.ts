import { Routes } from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/**
 * The reaction router for the Guilded REST API.
 * @example new ReactionRouter(rest);
 */
export class ReactionRouter extends BaseRouter {
	/**
	 * Create a reaction on Guilded.
	 * @param channelId The ID of the channel the content belongs to.
	 * @param contentId The ID of the content to add the reaction to.
	 * @param emojiId The ID of the emoji to add the reaction with.
	 * @example reactions.create('abc', 'abc', 123);
	 */
	create(channelId: string, contentId: string, emojiId: number) {
		return this.rest.put<void>(Routes.messageReaction(channelId, contentId, emojiId));
	}

	/**
	 * Delete a reaction from Guilded.
	 * @param channelId The ID of the channel the content belongs to.
	 * @param contentId The ID of the content to remove the reaction from.
	 * @param emojiId The ID of the emoji to remove.
	 * @example reactions.delete('abc', 'abc', 123);
	 */
	delete(channelId: string, contentId: string, emojiId: number) {
		return this.rest.delete<void>(Routes.messageReaction(channelId, contentId, emojiId));
	}
}
