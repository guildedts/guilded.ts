import { Routes } from "guilded-api-typings";
import { BaseRouter } from "./BaseRouter";

/** The reaction router for the Guilded REST API. */
export class ReactionRouter extends BaseRouter {
    /**
     * Create a reaction on Guilded.
     * @param channelId The ID of the channel the content belongs to.
     * @param contentId The ID of the content to add the reaction to.
     * @param emojiId The ID of the emoji to add the reaction with.
     */
    public create(channelId: string, contentId: string, emojiId: number) {
        return this.rest.put<void>(Routes.reaction(channelId, contentId, emojiId));
    }
}