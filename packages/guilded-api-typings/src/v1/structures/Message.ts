import { APIMentions } from './Channel';
import { APIEmbed } from './Embed';

/**
 * The API message model.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export interface APIMessage {
	/** The ID of the message. */
	id: string;
	/** The type of message. */
	type: APIMessageType;
	/** The ID of the server the message belongs to. */
	serverId?: string;
	/** The ID of the channel the message belongs to. */
	channelId: string;
	/** The content of the message. */
	content?: string;
	/** The embeds of the message. */
	embeds?: APIEmbed[];
	/** The IDs of messages that were replied to. */
	replyMessageIds?: string[];
	/** Whether the message is private. */
	isPrivate?: boolean;
	/** Whether the message is silent. */
	isSilent?: boolean;
	/** The mentions of the message. */
	mentions?: APIMentions;
	/** The date the message was created. */
	createdAt: string;
	/** The ID of the user who created the message. */
	createdBy: string;
	/** The ID of the webhook that created the message. */
	createdByWebhookId?: string;
	/** The date the message was edited. */
	updatedAt?: string;
}

/**
 * The API message summary model.
 * @see https://www.guilded.gg/docs/api/websockets/ChatMessageDeleted
 */
export interface APIMessageSummary {
	/** The ID of the message. */
	id: string;
	/** The ID of the server the message belongs to. */
	serverId?: string;
	/** The ID of the channel the message belongs to. */
	channelId: string;
	/** The date the message was deleted. */
	deletedAt: string;
	/** Whether the message is private. */
	isPrivate?: boolean;
}

/**
 * The API message types.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export type APIMessageType = 'default' | 'system';

/**
 * The payload for creating a message.
 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageCreate
 */
export interface APIMessagePayload extends APIMessageEditPayload {
	/** Whether the message is private. */
	isPrivate?: boolean;
	/** Whether the message is silent. */
	isSilent?: boolean;
	/** The IDs of messages to reply to. */
	replyMessageIds?: string[];
}

/**
 * The payload for editing a message.
 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageUpdate
 */
export interface APIMessageEditPayload {
	/** The content of the message. */
	content?: string;
	/** The embeds of the message. */
	embeds?: APIEmbed[];
}

/**
 * The query parameters for fetching messages.
 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageReadMany
 */
export interface APIFetchMessagesQuery {
	/** A date to fetch messages before. */
	before?: string;
	/** A date to fetch messages after. */
	after?: string;
	/** The limit of messages to fetch. */
	limit?: number;
	/** Whether to include private messages. */
	includePrivate?: boolean;
}

/**
 * The API content reaction model.
 * @see https://www.guilded.gg/docs/api/reactions/ContentReaction
 */
export interface APIContentReaction {
	/** The ID of the reaction. */
	id: number;
	/** The ID of the server the reaction belongs to. */
	serverId?: string;
	/** The date the reaction was created. */
	createdAt: string;
	/** The ID of the user who created the reaction. */
	createdBy: string;
	/** The ID of the webhook that created the reaction. */
	createdByWebhookId?: string;
}
