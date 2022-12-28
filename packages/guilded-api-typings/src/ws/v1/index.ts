import {
	APIBot,
	WebSocketOpCode,
	WebSocketServerAddEventPayload,
	WebSocketServerRemoveEventPayload,
	WebSocketMessageCreateEventPayload,
	WebSocketMessageUpdateEventPayload,
	WebSocketMessageDeleteEventPayload,
	WebSocketMessageReactionAddEventPayload,
	WebSocketMessageReactionRemoveEventPaylod,
	WebSocketServerMemberAddEventPayload,
	WebSocketServerMemberRemoveEventPayload,
	WebSocketServerBanAddEventPayload,
	WebSocketServerBanRemoveEventPayload,
	WebSocketServerMemberUpdateEventPayload,
	WebSocketServerRolesUpdateEventPayload,
	WebSocketChannelCreateEventPayload,
	WebSocketChannelUpdateEventPayload,
	WebSocketChannelDeleteEventPayload,
	WebSocketWebhookCreateEventPayload,
	WebSocketWebhookUpdateEventPayload,
	WebSocketDocCreateEventPayload,
	WebSocketDocUpdateEventPayload,
	WebSocketDocDeleteEventPayload,
	WebSocketCalendarEventCreateEventPayload,
	WebSocketCalendarEventUpdateEventPayload,
	WebSocketCalendarEventDeleteEventPayload,
	WebSocketCalendarEventRsvpUpdateEventPayload,
	WebSocketCalendarEventRsvpsUpdateEventPayload,
	WebSocketCalendarEventRsvpDeleteEventPayload,
	WebSocketForumTopicCreateEventPayload,
	WebSocketForumTopicUpdateEventPayload,
	WebSocketForumTopicDeleteEventPayload,
	WebSocketForumTopicPinEventPayload,
	WebSocketForumTopicUnpinEventPayload,
	WebSocketForumTopicLockEventPayload,
	WebSocketForumTopicUnlockEventPayload,
	WebSocketForumTopicReactionAddEventPayload,
	WebSocketForumTopicReactionRemoveEventPayload,
	WebSocketForumTopicCommentCreateEventPayload,
	WebSocketForumTopicCommentUpdateEventPayload,
	WebSocketForumTopicCommentDeleteEventPayload,
	WebSocketForumTopicCommentReactionAddEventPayload,
	WebSocketForumTopicCommentReactionRemoveEventPayload,
	WebSocketListItemCreateEventPayload,
	WebSocketListItemUpdateEventPayload,
	WebSocketListItemDeleteEventPayload,
	WebSocketListItemCompleteEventPayload,
	WebSocketListItemUncompleteEventPayload,
} from '../../v1';

export * from '../common';
export * from './bots';
export * from './calendarEvents';
export * from './channels';
export * from './chat';
export * from './docs';
export * from './forums';
export * from './listItems';
export * from './servers';
export * from './webhooks';

/**
 * The version of the WebSocket API
 */
export const WebSocketVersion = 1;

/**
 * https://www.guilded.gg/docs/api/websockets
 */
export enum WebSocketEvent {
	/**
	 * https://www.guilded.gg/docs/api/websockets/ChatMessageCreated
	 */
	MessageCreate = 'ChatMessageCreated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ChatMessageUpdated
	 */
	MessageUpdate = 'ChatMessageUpdated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ChatMessageDeleted
	 */
	MessageDelete = 'ChatMessageDeleted',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ChannelMessageReactionCreated
	 */
	MessageReactionAdd = 'ChannelMessageReactionCreated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ChannelMessageReactionDeleted
	 */
	MessageReactionRemove = 'ChannelMessageReactionDeleted',
	/**
	 * https://www.guilded.gg/docs/api/websockets/BotServerMembershipCreated
	 */
	ServerAdd = 'BotServerMembershipCreated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/BotServerMembershipDeleted
	 */
	ServerRemove = 'BotServerMembershipDeleted',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ServerMemberJoined
	 */
	ServerMemberAdd = 'ServerMemberJoined',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ServerMemberRemoved
	 */
	ServerMemberRemove = 'ServerMemberRemoved',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ServerMemberBanned
	 */
	ServerBanAdd = 'ServerMemberBanned',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ServerMemberUnbanned
	 */
	ServerBanRemove = 'ServerMemberUnbanned',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ServerMemberUpdated
	 */
	ServerMemberUpdate = 'ServerMemberUpdated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ServerRolesUpdated
	 */
	ServerRolesUpdate = 'ServerRolesUpdated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ServerChannelCreated
	 */
	ChannelCreate = 'ServerChannelCreated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ServerChannelUpdated
	 */
	ChannelUpdate = 'ServerChannelUpdated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ServerChannelDeleted
	 */
	ChannelDelete = 'ServerChannelDeleted',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ServerWebhookCreated
	 */
	WebhookCreate = 'ServerWebhookCreated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ServerWebhookUpdated
	 */
	WebhookUpdate = 'ServerWebhookUpdated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/DocCreated
	 */
	DocCreate = 'DocCreated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/DocUpdated
	 */
	DocUpdate = 'DocUpdated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/DocDeleted
	 */
	DocDelete = 'DocDeleted',
	/**
	 * https://www.guilded.gg/docs/api/websockets/CalendarEventCreated
	 */
	CalendarEventCreate = 'CalendarEventCreated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/CalendarEventUpdated
	 */
	CalendarEventUpdate = 'CalendarEventUpdated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/CalendarEventDeleted
	 */
	CalendarEventDelete = 'CalendarEventDeleted',
	/**
	 * https://www.guilded.gg/docs/api/websockets/CalendarEventRsvpUpdated
	 */
	CalendarEventRsvpUpdate = 'CalendarEventRsvpUpdated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/CalendarEventRsvpManyUpdated
	 */
	CalendarEventRsvpsUpdate = 'CalendarEventRsvpManyUpdated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/CalendarEventRsvpDeleted
	 */
	CalendarEventRsvpDelete = 'CalendarEventRsvpDeleted',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ForumTopicCreated
	 */
	ForumTopicCreate = 'ForumTopicCreated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ForumTopicUpdated
	 */
	ForumTopicUpdate = 'ForumTopicUpdated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ForumTopicDeleted
	 */
	ForumTopicDelete = 'ForumTopicDeleted',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ForumTopicPinned
	 */
	ForumTopicPin = 'ForumTopicPinned',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ForumTopicUnpinned
	 */
	ForumTopicUnpin = 'ForumTopicUnpinned',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ForumTopicLocked
	 */
	ForumTopicLock = 'ForumTopicLocked',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ForumTopicUnlocked
	 */
	ForumTopicUnlock = 'ForumTopicUnlocked',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ForumTopicReactionCreated
	 */
	ForumTopicReactionAdd = 'ForumTopicReactionCreated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ForumTopicReactionDeleted
	 */
	ForumTopicReactionRemove = 'ForumTopicReactionDeleted',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentCreated
	 */
	ForumTopicCommentCreate = 'ForumTopicCommentCreated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentUpdated
	 */
	ForumTopicCommentUpdate = 'ForumTopicCommentUpdated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentDeleted
	 */
	ForumTopicCommentDelete = 'ForumTopicCommentDeleted',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentReactionCreated
	 */
	ForumTopicCommentReactionAdd = 'ForumTopicCommentReactionCreated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ForumTopicCommentReactionDeleted
	 */
	ForumTopicCommentReactionRemove = 'ForumTopicCommentReactionDeleted',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ListItemCreated
	 */
	ListItemCreate = 'ListItemCreated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ListItemUpdated
	 */
	ListItemUpdate = 'ListItemUpdated',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ListItemDeleted
	 */
	ListItemDelete = 'ListItemDeleted',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ListItemCompleted
	 */
	ListItemComplete = 'ListItemCompleted',
	/**
	 * https://www.guilded.gg/docs/api/websockets/ListItemUncompleted
	 */
	ListItemUncomplete = 'ListItemUncompleted',
}

/**
 * https://www.guilded.gg/docs/api/websockets
 */
export type WebSocketPayload =
	| WebSocketReadyPayload
	| WebSocketEventPayload
	| WebSocketResumePayload;

/**
 * https://www.guilded.gg/docs/api/websockets
 */
export type WebSocketEventPayload =
	| WebSocketMessageCreateEventPayload
	| WebSocketMessageUpdateEventPayload
	| WebSocketMessageDeleteEventPayload
	| WebSocketMessageReactionAddEventPayload
	| WebSocketMessageReactionRemoveEventPaylod
	| WebSocketServerAddEventPayload
	| WebSocketServerRemoveEventPayload
	| WebSocketServerMemberAddEventPayload
	| WebSocketServerMemberRemoveEventPayload
	| WebSocketServerBanAddEventPayload
	| WebSocketServerBanRemoveEventPayload
	| WebSocketServerMemberUpdateEventPayload
	| WebSocketServerRolesUpdateEventPayload
	| WebSocketChannelCreateEventPayload
	| WebSocketChannelUpdateEventPayload
	| WebSocketChannelDeleteEventPayload
	| WebSocketWebhookCreateEventPayload
	| WebSocketWebhookUpdateEventPayload
	| WebSocketDocCreateEventPayload
	| WebSocketDocUpdateEventPayload
	| WebSocketDocDeleteEventPayload
	| WebSocketCalendarEventCreateEventPayload
	| WebSocketCalendarEventUpdateEventPayload
	| WebSocketCalendarEventDeleteEventPayload
	| WebSocketCalendarEventRsvpUpdateEventPayload
	| WebSocketCalendarEventRsvpsUpdateEventPayload
	| WebSocketCalendarEventRsvpDeleteEventPayload
	| WebSocketForumTopicCreateEventPayload
	| WebSocketForumTopicUpdateEventPayload
	| WebSocketForumTopicDeleteEventPayload
	| WebSocketForumTopicPinEventPayload
	| WebSocketForumTopicUnpinEventPayload
	| WebSocketForumTopicLockEventPayload
	| WebSocketForumTopicUnlockEventPayload
	| WebSocketForumTopicReactionAddEventPayload
	| WebSocketForumTopicReactionRemoveEventPayload
	| WebSocketForumTopicCommentCreateEventPayload
	| WebSocketForumTopicCommentUpdateEventPayload
	| WebSocketForumTopicCommentDeleteEventPayload
	| WebSocketForumTopicCommentReactionAddEventPayload
	| WebSocketForumTopicCommentReactionRemoveEventPayload
	| WebSocketListItemCreateEventPayload
	| WebSocketListItemUpdateEventPayload
	| WebSocketListItemDeleteEventPayload
	| WebSocketListItemCompleteEventPayload
	| WebSocketListItemUncompleteEventPayload;

/**
 * https://www.guilded.gg/docs/api/websockets
 */
export interface WebSocketBasePayload {
	/**
	 * The operation code of the message
	 */
	op: WebSocketOpCode;
	/**
	 * The data of the message
	 */
	d?: object;
	/**
	 * The ID of the message used for replaying events after a disconnect
	 */
	s?: string;
	/**
	 * The name of the event
	 */
	t?: WebSocketEvent;
}

/**
 * https://www.guilded.gg/docs/api/websockets
 */
export interface WebSocketBaseEventPayload<
	E extends WebSocketEvent = WebSocketEvent,
	D extends object = object,
> extends WebSocketBasePayload {
	op: WebSocketOpCode.Event;
	d: D;
	t: E;
}

/**
 * Not documented. The welcome payload
 */
export interface WebSocketReadyPayload extends WebSocketBasePayload {
	op: WebSocketOpCode.Ready;
	d: WebSocketReadyData;
}

/**
 * Not documented. The resume payload
 */
export interface WebSocketResumePayload extends WebSocketBasePayload {
	op: WebSocketOpCode.Resume;
}

/**
 * Not documented. The welcome payload data
 */
export interface WebSocketReadyData {
	/**
	 * The ID of the last message
	 */
	lastMessageId: string;
	/**
	 * The user
	 */
	user: APIBot;
	/**
	 * The ping interval
	 */
	heartbeatIntervalMs: number;
}
