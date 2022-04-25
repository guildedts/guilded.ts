/**
 * The API chat message object.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export interface APIChatMessage {
	/** The ID of the message. */
	id: string;
	/** The type of message. */
	type: APIChatMessageType;
	/** The ID of the server the message was sent from. */
	serverId?: string;
	/** The ID of the channel the message was sent from. */
	channelId: string;
	/** The content of the message. */
	content: string;
	/** Message IDs that were replied to. */
	replyMessageIds?: string[];
	/** Whether the message is private. */
	isPrivate?: boolean;
	/** The time the message was sent. */
	createdAt: string;
	/** The ID of the user who sent the message. */
	createdBy: string;
	/** The ID of the webhook that sent the message. */
	createdByWebhookId?: string;
	/** The time the message was edited. */
	updatedAt?: string;
}

/**
 * The API deleted chat message object.
 * @see https://www.guilded.gg/docs/api/websockets/ChatMessageDeleted
 */
export interface APIDeletedChatMessage {
	/** The ID of the message. */
	id: string;
	/** The ID of the server the message was sent from. */
	serverId: string;
	/** The ID of the channel the message was sent from. */
	channelId: string;
	/** The time the message was deleted. */
	deletedAt: string;
	/** Whether the message is private. */
	isPrivate: boolean;
}

/**
 * The API chat message types.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export type APIChatMessageType = 'default' | 'system';

/**
 * The payload for creating a chat message.
 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageCreate
 */
export interface APIChatMessagePayload {
	/** Whether the message is private. */
	isPrivate?: boolean;
	/** Whether the message is silent. */
	isSilent?: boolean;
	/** Message IDs to reply to. */
	replyMessageIds?: string[];
	/** The content of the message. */
	content: string;
}

/**
 * The query parameters for getting chat messages.
 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageReadMany
 */
export interface APIGetChatMessagesQuery {
	/** A time string to get messages before. */
	before?: string;
	/** A time string to get messages after. */
	after?: string;
	/** The limit of messages to get. */
	limit?: number;
	/** Whether to include private messages. */
	includePrivate?: boolean;
}

/**
 * The API message reaction object.
 * @see https://www.guilded.gg/docs/api/reactions/ContentReaction
 */
export interface APIMessageReaction {
	/** The ID of the reaction. */
	id: string;
	/** The ID of the server the reaction was sent from. */
	serverId?: string;
	/** The time the reaction was created. */
	createdAt: string;
	/** The ID of the user who created the reaction. */
	createdBy: string;
	/** The ID of the webhook that created the reaction. */
	createdByWebhookId?: string;
}
