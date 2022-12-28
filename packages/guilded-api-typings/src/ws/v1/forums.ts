import {
	APIForumTopic,
	APIForumTopicComment,
	APIForumTopicCommentReaction,
	APIForumTopicReaction,
	WebSocketBaseEventPayload,
	WebSocketEvent,
} from '../../v1';

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicCreated
 */
export type WebSocketForumTopicCreateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ForumTopicCreate,
	WebSocketForumTopicCreateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicCreated
 */
export interface WebSocketForumTopicCreateEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The forum topic
	 */
	forumTopic: APIForumTopic;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicUpdated
 */
export type WebSocketForumTopicUpdateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ForumTopicUpdate,
	WebSocketForumTopicUpdateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicUpdated
 */
export type WebSocketForumTopicUpdateEventData = WebSocketForumTopicCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicDeleted
 */
export type WebSocketForumTopicDeleteEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ForumTopicDelete,
	WebSocketForumTopicDeleteEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicDeleted
 */
export type WebSocketForumTopicDeleteEventData = WebSocketForumTopicCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicPinned
 */
export type WebSocketForumTopicPinEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ForumTopicPin,
	WebSocketForumTopicPinEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicPinned
 */
export type WebSocketForumTopicPinEventData = WebSocketForumTopicCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicUnpinned
 */
export type WebSocketForumTopicUnpinEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ForumTopicUnpin,
	WebSocketForumTopicUnpinEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicUnpinned
 */
export type WebSocketForumTopicUnpinEventData = WebSocketForumTopicCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicLocked
 */
export type WebSocketForumTopicLockEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ForumTopicLock,
	WebSocketForumTopicLockEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicLocked
 */
export type WebSocketForumTopicLockEventData = WebSocketForumTopicCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicUnlocked
 */
export type WebSocketForumTopicUnlockEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ForumTopicUnlock,
	WebSocketForumTopicUnlockEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicUnlocked
 */
export type WebSocketForumTopicUnlockEventData = WebSocketForumTopicCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicReactionCreated
 */
export type WebSocketForumTopicReactionAddEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ForumTopicReactionAdd,
	WebSocketForumTopicReactionAddEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicReactionCreated
 */
export interface WebSocketForumTopicReactionAddEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The reaction
	 */
	reaction: APIForumTopicReaction;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicReactionDeleted
 */
export type WebSocketForumTopicReactionRemoveEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ForumTopicReactionRemove,
	WebSocketForumTopicReactionRemoveEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicReactionDeleted
 */
export type WebSocketForumTopicReactionRemoveEventData = WebSocketForumTopicReactionAddEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentCreated
 */
export type WebSocketForumTopicCommentCreateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ForumTopicCommentCreate,
	WebSocketForumTopicCommentCreateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentCreated
 */
export interface WebSocketForumTopicCommentCreateEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The forum topic comment
	 */
	forumTopicComment: APIForumTopicComment;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentUpdated
 */
export type WebSocketForumTopicCommentUpdateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ForumTopicCommentUpdate,
	WebSocketForumTopicCommentUpdateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentUpdated
 */
export type WebSocketForumTopicCommentUpdateEventData = WebSocketForumTopicCommentCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentDeleted
 */
export type WebSocketForumTopicCommentDeleteEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ForumTopicCommentDelete,
	WebSocketForumTopicCommentDeleteEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentDeleted
 */
export type WebSocketForumTopicCommentDeleteEventData = WebSocketForumTopicCommentCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentReactionCreated
 */
export type WebSocketForumTopicCommentReactionAddEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ForumTopicCommentReactionAdd,
	WebSocketForumTopicCommentReactionAddEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentReactionCreated
 */
export interface WebSocketForumTopicCommentReactionAddEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The reaction
	 */
	reaction: APIForumTopicCommentReaction;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentReactionDeleted
 */
export type WebSocketForumTopicCommentReactionRemoveEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ForumTopicCommentReactionRemove,
	WebSocketForumTopicCommentReactionRemoveEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentReactionDeleted
 */
export type WebSocketForumTopicCommentReactionRemoveEventData =
	WebSocketForumTopicCommentReactionAddEventData;
