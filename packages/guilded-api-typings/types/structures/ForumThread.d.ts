/**
 * The API forum thread object.
 * @see https://www.guilded.gg/docs/api/forums/ForumThread
 */
export interface APIForumThread {
	id: number;
	serverId: string;
	channelId: string;
	title?: string;
	content?: string;
	createdAt: string;
	createdBy: string;
	createdByWebhookId?: string;
	updatedAt?: string;
}
/**
 * The payload for creating a forum thread.
 * @see https://www.guilded.gg/docs/api/forums/ForumThreadCreate
 */
export interface APIForumThreadPayload {
	title: string;
	content: string;
}
//# sourceMappingURL=ForumThread.d.ts.map
