/**
 * Represents a forum topic on Guilded.
 * @see https://www.guilded.gg/docs/api/forums/ForumTopic
 */
export interface APITopic {
	/** The ID of the forum topic. */
	id: number;
	/** The ID of the server the forum topic belongs to. */
	serverId: string;
	/** The ID of the channel the forum topic belongs to. */
	channelId: string;
	/** The title of the forum topic. */
	title?: string;
	/** The content of the forum topic. */
	content?: string;
	/** The date the forum topic was created. */
	createdAt: string;
	/** The ID of the user that created the forum topic. */
	createdBy: string;
	/** The ID of the webhook that created the forum topic. */
	createdByWebhookId?: string;
	/** The date the forum topic was edited. */
	updatedAt?: string;
}

/**
 * The payload for creating a forum topic.
 * @see https://www.guilded.gg/docs/api/forums/ForumTopicCreate
 */
export interface APITopicPayload {
	/** The title of the forum topic. */
	title: string;
	/** The content of the forum topic. */
	content: string;
}
