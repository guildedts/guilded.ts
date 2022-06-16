/**
 * Represents a embed on Guilded.
 * @see https://www.guilded.gg/docs/api/chat/ChatEmbed
 */
export interface APIEmbed {
	/** The title of the embed. */
	title?: string;
	/** The description of the embed. */
	description?: string;
	/** The URL of the embed. */
	url?: string;
	/** The color of the embed. */
	color?: number;
	/** The footer of the embed. */
	footer?: APIEmbedFooter;
	/** The timestamp of the embed. */
	timestamp?: string;
	/** The thumbnail of the embed. */
	thumbnail?: APIEmbedMedia;
	/** The image of the embed. */
	image?: APIEmbedMedia;
	/** The author of the embed. */
	author?: APIEmbedAuthor;
	/** The fields of the embed. */
	fields?: APIEmbedField[];
}

/**
 * Represents a embed footer on Guilded.
 * @see https://www.guilded.gg/docs/api/chat/ChatEmbed
 */
export interface APIEmbedFooter {
	/** The icon URL of the footer. */
	icon_url?: string;
	/** The text of the footer. */
	text: string;
}

/**
 * Represents embed media on Guilded.
 * @see https://www.guilded.gg/docs/api/chat/ChatEmbed
 */
export interface APIEmbedMedia {
	/** The URL of the media. */
	url?: string;
}

/**
 * Represents a embed author on Guilded.
 * @see https://www.guilded.gg/docs/api/chat/ChatEmbed
 */
export interface APIEmbedAuthor {
	/** The name of the author. */
	name?: string;
	/** The URL of the author. */
	url?: string;
	/** The icon URL of the author. */
	icon_url?: string;
}

/**
 * Represents a embed field on Guilded.
 * @see https://www.guilded.gg/docs/api/chat/ChatEmbed
 */
export interface APIEmbedField {
	/** The name of the field. */
	name: string;
	/** The value of the field. */
	value: string;
	/** Whether the field is inline. */
	inline?: boolean;
}
