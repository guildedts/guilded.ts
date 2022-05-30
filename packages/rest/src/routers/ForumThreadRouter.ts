import { APIForumThread, APIForumThreadPayload, Routes } from "guilded-api-typings";
import { BaseRouter } from "./BaseRouter";

/** The forum thread router for the Guilded REST API. */
export class ForumThreadRouter extends BaseRouter {
    /**
     * Create a forum thread on Guilded.
     * @param channelId The ID of the channel the forum thread belongs to.
     * @param title The title to create the forum thread with.
     * @param content The content to create the forum thread with.
     * @returns The created forum thread.
     */
    public async create(channelId: string, title: string, content: string) {
        const { forumThread } = await this.rest.post<{ forumThread: APIForumThread }, APIForumThreadPayload>(
			Routes.forums(channelId),
			{ title, content },
		);
        return forumThread;
    }
}
