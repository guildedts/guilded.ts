/**
 * The API embed object.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
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
	thumbnail?: APIEmbedThumbnail;
	/** The image of the embed. */
	image?: APIEmbedImage;
	/** The author of the embed. */
	author?: APIEmbedAuthor;
	/** The fields of the embed. */
	fields?: APIEmbedField[];
}

/**
 * The API embed footer object.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export interface APIEmbedFooter {
	/** The icon URL of the footer. */
	icon_url?: string;
	/** The text of the footer. */
	text: string;
}

/**
 * The API embed thumbnail object.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export interface APIEmbedThumbnail {
	/** The URL of the thumbnail. */
	url?: string;
}

/**
 * The API embed image object.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export interface APIEmbedImage {
	/** The URL of the image. */
	url?: string;
}

/**
 * The API embed author object.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
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
 * The API embed field object.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export interface APIEmbedField {
	/** The name of the field. */
	name: string;
	/** The value of the field. */
	value: string;
	/** Whether the field is inline. */
	inline?: boolean;
}
