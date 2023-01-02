import { APIMentions, APIReaction } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export interface APIMessage extends Omit<APIMessageSummary, 'deletedAt'> {
	/**
	 * The type of message
	 */
	type: MessageType;
	/**
	 * The content of the message
	 */
	content?: string;
	/**
	 * The embeds of the message (`1`-`10` length)
	 *
	 * @default []
	 */
	embeds?: APIEmbed[];
	/**
	 * The IDs of messages the message replies to (`1`-`5` length)
	 *
	 * @default []
	 */
	replyMessageIds?: string[];
	/**
	 * Whether the message is silent
	 *
	 * If `true`, this message did not notify those mentioned or replied to
	 *
	 * @default false
	 */
	isSilent?: boolean;
	/**
	 * The mentions of the message
	 */
	mentions?: APIMentions;
	/**
	 * When the message was created
	 */
	createdAt: string;
	/**
	 * The ID of the user who created the message
	 *
	 * Note: If this message has {@link createdByWebhookId}, this field will still be populated, but can be ignored
	 */
	createdBy: string;
	/**
	 * The ID of the webhook that created the message, if it was created by a webhook
	 */
	createdByWebhookId?: string;
	/**
	 * When the message was updated, if relevant
	 */
	updatedAt?: string;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ChatMessageDeleted
 */
export interface APIMessageSummary {
	/**
	 * The ID of the message
	 */
	id: string;
	/**
	 * The ID of the server
	 */
	serverId?: string;
	/**
	 * The ID of the channel
	 */
	channelId: string;
	/**
	 * When the message was deleted
	 */
	deletedAt: string;
	/**
	 * Whether the message is private
	 *
	 * If `true`, this message will only be seen by those mentioned or replied to
	 *
	 * @default false
	 */
	isPrivate?: boolean;
}

/**
 * https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export enum MessageType {
	/**
	 * A message made by a user
	 */
	Default = 'default',
	/**
	 * A message made by Guilded
	 */
	System = 'system',
}

/**
 * https://www.guilded.gg/docs/api/chat/ChatEmbed
 */
export interface APIEmbed {
	/**
	 * The title of the embed (max characters: `256`)
	 */
	title?: string;
	/**
	 * The description of the embed (max characters: `2048`)
	 */
	description?: string;
	/**
	 * The url of the embed (max characters: `1024`)
	 *
	 * **RegEx:**
	 * ```
	 * /^(?!attachment)/
	 * ```
	 */
	url?: string;
	/**
	 * The color of the embed (range: `0x0`-`0xffffff`)
	 */
	color?: number;
	/**
	 * The footer of the embed
	 */
	footer?: APIEmbedFooter;
	/**
	 * The timestamp of the embed
	 */
	timestamp?: string;
	/**
	 * The thumbnail of the embed
	 */
	thumbnail?: APIEmbedThumbnail;
	/**
	 * The image of the embed
	 */
	image?: APIEmbedImage;
	/**
	 * The author of the embed
	 */
	author?: APIEmbedAuthor;
	/**
	 * The fields of the embed (max length: `25`)
	 *
	 * @default []
	 */
	fields?: APIEmbedField[];
}

/**
 * https://www.guilded.gg/docs/api/chat/ChatEmbed
 */
export interface APIEmbedFooter {
	/**
	 * The icon URL of the embed footer (max characters: `1024`)
	 */
	icon_url?: string;
	/**
	 * The text of the embed footer (max characters: `2048`)
	 */
	text: string;
}

/**
 * https://www.guilded.gg/docs/api/chat/ChatEmbed
 */
export interface APIEmbedThumbnail {
	/**
	 * The URL (max characters: `1024`)
	 */
	url: string;
}

/**
 * https://www.guilded.gg/docs/api/chat/ChatEmbed
 */
export type APIEmbedImage = APIEmbedThumbnail;

/**
 * https://www.guilded.gg/docs/api/chat/ChatEmbed
 */
export interface APIEmbedAuthor {
	/**
	 * The name of the embed author (max characters: `256`)
	 */
	name?: string;
	/**
	 * The URL of the embed author (max characters: `1024`)
	 *
	 * **RegEx:**
	 * ```
	 * /^(?!attachment)/
	 * ```
	 */
	url?: string;
	/**
	 * The icon URL of the embed author (max characters: `1024`)
	 */
	icon_url?: string;
}

/**
 * https://www.guilded.gg/docs/api/chat/ChatEmbed
 */
export interface APIEmbedField {
	/**
	 * The name of the embed field (max characters: `256`)
	 */
	name: string;
	/**
	 * The value of the embed field (max characters: `1024`)
	 */
	value: string;
	/**
	 * Whether the embed field is inline
	 *
	 * @default false
	 */
	inline?: boolean;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ChannelMessageReactionCreated
 * https://www.guilded.gg/docs/api/websockets/ChannelMessageReactionDeleted
 */
export interface APIMessageReaction extends APIReaction {
	/**
	 * The ID of the message
	 */
	messageId: string;
}
