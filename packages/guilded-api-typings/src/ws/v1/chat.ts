import {
	WebSocketBaseEventPayload,
	WebSocketEvent,
	APIMessage,
	APIMessageSummary,
	APIMessageReaction,
} from '../../v1';

/**
 * https://www.guilded.gg/docs/api/websockets/ChatMessageCreated
 */
export type WebSocketMessageCreateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.MessageCreate,
	WebSocketMessageCreateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ChatMessageCreated
 */
export interface WebSocketMessageCreateEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The message
	 */
	message: APIMessage;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ChatMessageUpdated
 */
export type WebSocketMessageUpdateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.MessageUpdate,
	WebSocketMessageUpdateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ChatMessageUpdated
 */
export type WebSocketMessageUpdateEventData = WebSocketMessageCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ChatMessageDeleted
 */
export type WebSocketMessageDeleteEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.MessageDelete,
	WebSocketMessageDeleteEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ChatMessageDeleted
 */
export interface WebSocketMessageDeleteEventData
	extends Omit<WebSocketMessageCreateEventData, 'message'> {
	/**
	 * The message
	 */
	message: APIMessageSummary;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ChannelMessageReactionCreated
 */
export type WebSocketMessageReactionAddEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.MessageReactionAdd,
	WebSocketMessageReactionAddEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ChannelMessageReactionCreated
 */
export interface WebSocketMessageReactionAddEventData {
	/**
	 * The ID of the server
	 */
	serverId?: string;
	/**
	 * The reaction
	 */
	reaction: APIMessageReaction;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ChannelMessageReactionDeleted
 */
export type WebSocketMessageReactionRemoveEventPaylod = WebSocketBaseEventPayload<
	WebSocketEvent.MessageReactionRemove,
	WebSocketMessageReactionRemoveEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ChannelMessageReactionDeleted
 */
export type WebSocketMessageReactionRemoveEventData = WebSocketMessageReactionAddEventData;
