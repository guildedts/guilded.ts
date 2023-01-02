import { APIMentions, APIReaction } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/forums/ForumTopic
 */
export interface APIForumTopic extends APIForumTopicSummary {
	/**
	 * The content of the forum topic
	 */
	content: string;
	/**
	 * The mentions of the forum topic
	 */
	mentions?: APIMentions;
}

/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicSummary
 */
export interface APIForumTopicSummary {
	/**
	 * The ID of the forum topic
	 */
	id: number;
	/**
	 * The ID of the server4
	 */
	serverId: string;
	/**
	 * The ID of the channel
	 */
	channelId: string;
	/**
	 * The title of the forum topic (`1`-`500` characters)
	 */
	title: string;
	/**
	 * When the forum topic was created
	 */
	createdAt: string;
	/**
	 * The ID of the user who created the forum topic
	 *
	 * Note: If this forum topic has {@link createdByWebhookId}, this field will still be populated, but can be ignored
	 */
	createdBy: string;
	/**
	 * The ID of the webhook that created the forum topic, if it was created by a webhook
	 */
	createdByWebhookId?: string;
	/**
	 * When the forum topic was updated, if relevant
	 */
	updatedAt?: string;
	/**
	 * When the forum topic was bumped, if relevant
	 *
	 * This is updated whenever there is any activity within the forum topic
	 */
	bumpedAt?: string;
	/**
	 * Whether the forum topic is pinned
	 *
	 * @default false
	 */
	isPinned?: boolean;
	/**
	 * Whether the forum topic is locked
	 *
	 * @default false
	 */
	isLocked?: boolean;
}

/**
 * https://www.guilded.gg/docs/api/forumComments/ForumTopicComment
 */
export interface APIForumTopicComment {
	/**
	 * The ID of the forum topic comment
	 */
	id: number;
	/**
	 * The content of the forum topic comment (`1`-`10000` characters)
	 */
	content: string;
	/**
	 * When the forum topic comment was created
	 */
	createdAt: string;
	/**
	 * When the forum topic comment was updated, if relevant
	 */
	updatedAt?: string;
	/**
	 * The ID of the channel
	 */
	channelId: string;
	/**
	 * The ID of the forum topic
	 */
	forumTopicId: number;
	/**
	 * The ID of the user that created the forum topic comment
	 */
	createdBy: string;
	/**
	 * The mentions of the forum topic comment
	 */
	mentions?: APIMentions;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicReactionCreated
 * https://www.guilded.gg/docs/api/websockets/ForumTopicReactionDeleted
 */
export interface APIForumTopicReaction extends APIReaction {
	/**
	 * The ID of the forum topic
	 */
	forumTopicId: number;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentReactionCreated
 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentReactionDeleted
 */
export interface APIForumTopicCommentReaction extends APIForumTopicReaction {
	/**
	 * The ID of the forum topic comment
	 */
	forumTopicCommentId: number;
}
