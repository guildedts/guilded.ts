import { APIMentions } from './Channel';
import { APIEmbed } from './Embed';
import { APIEmote } from './Server';

/**
 * Represents a message on Guilded.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export interface APIMessage extends Omit<APIMessageSummary, 'deletedAt'> {
	/** The type of the message. */
	type: APIMessageTypeString;
	/** The content of the message. */
	content?: string;
	/** The embeds of the message. */
	embeds?: APIEmbed[];
	/** The IDs of messages that were replied to. */
	replyMessageIds?: string[];
	/** Whether the message is silent. */
	isSilent?: boolean;
	/** The mentions of the message. */
	mentions?: APIMentions;
	/** The date the message was created. */
	createdAt: string;
	/** The ID of the user that created the message. */
	createdBy: string;
	/** The ID of the webhook that created the message. */
	createdByWebhookId?: string;
	/** The date the message was edited. */
	updatedAt?: string;
}

/**
 * Represents a summary of a message on Guilded.
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
 * The type of a message on Guilded.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export enum APIMessageType {
	Default = 'default',
	System = 'system',
}

/**
 * The type string of a message on Guilded.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export type APIMessageTypeString = `${APIMessageType}`;

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

/** The resolvable payload for creating a message. */
export type APIMessagePayloadResolvable = string | APIEmbed[] | APIMessagePayload;

/** The resolvable payload for editing a message. */
export type APIMessageEditPayloadResolvable = string | APIEmbed[] | APIMessageEditPayload;

/**
 * The options for fetching messages.
 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageReadMany
 */
export interface APIMessageFetchOptions {
	/** The date to fetch messages before. */
	before?: Date;
	/** The date to fetch messages after. */
	after?: Date;
	/** The limit of messages to fetch. */
	limit?: number;
	/** Whether to include private messages. */
	includePrivate?: boolean;
}

/**
 * Represents a message reaction on Guilded.
 * @see https://www.guilded.gg/docs/api/websockets/ChannelMessageReactionCreated
 * @see https://www.guilded.gg/docs/api/websockets/ChannelMessageReactionDeleted
 */
export interface APIMessageReaction {
	/** The ID of the channel the message belongs to. */
	channelId: string;
	/** The ID of the message. */
	messageId: string;
	/** The ID of the user that created the reaction. */
	createdBy: string;
	/** The emote of the reaction. */
	emote: APIEmote;
}
