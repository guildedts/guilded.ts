/**
 * Represents a forum topic on Guilded.
 * @see https://www.guilded.gg/docs/api/forums/ForumTopic
 */
export interface APIForumTopic extends APIForumTopicSummary {
	/** The content of the forum topic. */
	content: string;
}

/**
 * Represents a summary of a forum topic on Guilded.
 * @see https://www.guilded.gg/docs/api/forums/ForumTopicSummary
 */
export interface APIForumTopicSummary {
	/** The ID of the forum topic. */
	id: number;
	/** The ID of the server the forum topic belongs to. */
	serverId: string;
	/** The ID of the channel the forum topic belongs to. */
	channelId: string;
	/** The title of the forum topic. */
	title: string;
	/** The date the forum topic was created. */
	createdAt: string;
	/** The ID of the user that created the forum topic. */
	createdBy: string;
	/** The ID of the webhook that created the forum topic. */
	createdByWebhookId?: string;
	/** The date the forum topic was edited. */
	updatedAt?: string;
	/** The date the forum topic was bumped. */
	bumpedAt?: string;
}

/**
 * The payload for creating a forum topic.
 * @see https://www.guilded.gg/docs/api/forums/ForumTopicCreate
 */
export interface APIForumTopicPayload {
	/** The title of the forum topic. */
	title: string;
	/** The content of the forum topic. */
	content: string;
}

/**
 * The payload for editing a forum topic.
 * @see https://www.guilded.gg/docs/api/forums/ForumTopicUpdate
 */
export type APIForumTopicEditPayload = Partial<APIForumTopicPayload>;

/**
 * The options for fetching forum topics.
 * @see https://www.guilded.gg/docs/api/forums/ForumTopicReadMany
 */
export interface APIForumTopicFetchManyOptions {
	/** The date to fetch forum topics before. */
	before?: Date;
	/** The limit of forum topics to fetch. */
	limit?: number;
}
