import { APIForumTopic, APIForumTopicComment, APIForumTopicSummary } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicCreate
 */
export type RESTPostForumTopicJSONBody = Pick<APIForumTopic, 'title' | 'content'>;
/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicCreate
 */
export type RESTPostForumTopicResult = RESTGetForumTopicResult;

/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicReadMany
 */
export interface RESTGetForumTopicsQuery {
	/**
	 * The date that will be used to filter out results for the current page
	 */
	before?: Date;
	/**
	 * The max size of the page (range: `1`-`100`)
	 *
	 * @default 25
	 */
	limit?: number;
}
/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicReadMany
 */
export interface RESTGetForumTopicsResult {
	/**
	 * The forum topics
	 */
	forumTopics: APIForumTopicSummary;
}

/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicRead
 */
export interface RESTGetForumTopicResult {
	/**
	 * The forum topic
	 */
	forumTopic: APIForumTopic;
}

/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicUpdate
 */
export type RESTPatchForumTopicJSONBody = Partial<RESTPostForumTopicJSONBody>;
/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicUpdate
 */
export type RESTPatchForumTopicResult = RESTGetForumTopicResult;

/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicDelete
 */
export type RESTDeleteForumTopicResult = never;

/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicPin
 */
export type RESTPutForumTopicPinResult = never;

/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicUnpin
 */
export type RESTDeleteForumTopicPinResult = never;

/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicReactionCreate
 */
export type RESTPutForumTopicReactionResult = never;

/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicReactionDelete
 */
export type RESTDeleteForumTopicReactionResult = never;

/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicLock
 */
export type RESTPutForumTopicLockResult = never;

/**
 * https://www.guilded.gg/docs/api/forums/ForumTopicUnlock
 */
export type RESTDeleteForumTopicLockResult = never;

/**
 * https://www.guilded.gg/docs/api/forumComments/ForumTopicCommentCreate
 */
export type RESTPostForumTopicCommentJSONBody = Pick<APIForumTopicComment, 'content'>;
/**
 * https://www.guilded.gg/docs/api/forumComments/ForumTopicCommentCreate
 */
export type RESTPostForumTopicCommentResult = RESTGetForumTopicCommentResult;

/**
 * https://www.guilded.gg/docs/api/forumComments/ForumTopicCommentReadMany
 */
export interface RESTGetForumTopicCommentsResult {
	/**
	 * The forum topic comments
	 */
	forumTopicComments: APIForumTopicComment[];
}

/**
 * https://www.guilded.gg/docs/api/forumComments/ForumTopicCommentRead
 */
export interface RESTGetForumTopicCommentResult {
	/**
	 * The forum topic comment
	 */
	forumTopicComment: APIForumTopicComment;
}

/**
 * https://www.guilded.gg/docs/api/forumComments/ForumTopicCommentUpdate
 */
export type RESTPatchForumTopicCommentJSONBody = Partial<RESTPostForumTopicCommentJSONBody>;
/**
 * https://www.guilded.gg/docs/api/forumComments/ForumTopicCommentUpdate
 */
export type RESTPatchForumTopicCommentResult = RESTGetForumTopicCommentResult;

/**
 * https://www.guilded.gg/docs/api/forumComments/ForumTopicCommentDelete
 */
export type RESTDeleteForumTopicCommentResult = never;

/**
 * https://www.guilded.gg/docs/api/reactions/ForumTopicCommentReactionCreate
 */
export type RESTPutForumTopicCommentReactionResult = never;

/**
 * https://www.guilded.gg/docs/api/reactions/ForumTopicCommentReactionDelete
 */
export type RESTDeleteForumTopicCommentReactionResult = never;
