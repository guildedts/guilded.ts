/**
 * The API forum thread object.
 * @see https://www.guilded.gg/docs/api/forums/ForumThread
 */
export interface APIForumThread {
	/** The ID of the forum thread. */
	id: number;
	/** The ID of the server the forum thread was created on. */
	serverId: string;
	/** The ID of the channel the forum thread was created in. */
	channelId: string;
	/** The title of the forum thread. */
	title?: string;
	/** The content of the forum thread. */
	content?: string;
	/** The time the forum thread was created. */
	createdAt: string;
	/** The ID of the user who created the forum thread. */
	createdBy: string;
	/** The ID of the webhook that created the forum thread. */
	createdByWebhookId?: string;
	/** The time the forum thread was edited. */
	updatedAt?: string;
}

/**
 * The payload for creating a forum thread.
 * @see https://www.guilded.gg/docs/api/forums/ForumThreadCreate
 */
export interface APIForumThreadPayload {
	/** The title of the forum thread. */
	title: string;
	/** The content of the forum thread. */
	content: string;
}
