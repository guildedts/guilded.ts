import {
	APIEmbed,
	APIEmbedAuthor,
	APIEmbedField,
	APIEmbedFooter,
	APIEmbedImage,
	APIEmbedThumbnail,
} from 'guilded-api-typings';
import { ColorResolvable, resolveColor } from './util';

/** The embed builder for Guilded embeds. */
export class Embed {
	/** The title of the embed. */
	public title?: string;
	/** The description of the embed. */
	public description?: string;
	/** The URL of the embed. */
	public url?: string;
	/** The color of the embed. */
	public color?: number;
	/** The footer of the embed. */
	public footer?: APIEmbedFooter;
	/** The timestamp of the embed. */
	public timestamp?: Date;
	/** The thumbnail of the embed. */
	public thumbnail?: APIEmbedThumbnail;
	/** The image of the embed. */
	public image?: APIEmbedImage;
	/** The author of the embed. */
	public author?: APIEmbedAuthor;
	/** The fields of the embed. */
	public fields: APIEmbedField[];

	/** @param data The data to use for the embed. */
	constructor(data?: APIEmbed) {
		this.title = data?.title;
		this.description = data?.description;
		this.url = data?.url;
		this.color = data?.color;
		this.footer = data?.footer;
		this.timestamp = data?.timestamp ? new Date(data.timestamp) : undefined;
		this.thumbnail = data?.thumbnail;
		this.image = data?.image;
		this.author = data?.author;
		this.fields = data?.fields ?? [];
	}

	/**
	 * Set the title of the embed.
	 * @param title The title of the embed.
	 * @returns This embed builder.
	 */
	public setTitle(title?: string) {
		this.title = title;
		return this;
	}

	/**
	 * Set the description of the embed.
	 * @param description The description of the embed.
	 * @returns This embed builder.
	 */
	public setDescription(description?: string) {
		this.description = description;
		return this;
	}

	/**
	 * Set the URL of the embed.
	 * @param url The URL of the embed.
	 * @returns This embed builder.
	 */
	public setURL(url?: string) {
		this.url = url;
		return this;
	}

	/**
	 * Set the color of the embed.
	 * @param color The color of the embed.
	 * @returns This embed builder.
	 */
	public setColor(color?: ColorResolvable) {
		this.color = color ? resolveColor(color) : undefined;
		return this;
	}

	/**
	 * Set the footer of the embed.
	 * @param text The text of the footer.
	 * @param icon The icon URL of the footer.
	 * @returns This embed builder.
	 */
	public setFooter(text: string, icon?: string) {
		this.footer = { text, icon_url: icon };
		return this;
	}

	/**
	 * Set the timestamp of the embed.
	 * @param timestamp The timestamp of the embed.
	 * @returns This embed builder.
	 */
	public setTimestamp(timestamp?: string | number | Date) {
		this.timestamp =
			timestamp instanceof Date
				? timestamp
				: typeof timestamp === 'string' || typeof timestamp === 'number'
				? new Date(timestamp)
				: undefined;
		return this;
	}

	/**
	 * Set the thumbnail of the embed.
	 * @param thumbnail The thumbnail of the embed.
	 * @returns This embed builder.
	 */
	public setThumbnail(thumbnail?: string) {
		this.thumbnail = { url: thumbnail };
		return this;
	}

	/**
	 * Set the image of the embed.
	 * @param image The image of the embed.
	 * @returns This embed builder.
	 */
	public setImage(image?: string) {
		this.image = { url: image };
		return this;
	}

	/**
	 * Set the author of the embed.
	 * @param author The author of the embed.
	 * @returns This embed builder.
	 */
	public setAuthor(author?: string | APIEmbedAuthor) {
		this.author = typeof author === 'string' ? { name: author } : author;
		return this;
	}

	/**
	 * Add a field to the embed.
	 * @param name The name of the field.
	 * @param value The value of the field.
	 * @param inline Whether the field is inline.
	 * @returns This embed builder.
	 */
	public addField(name: string, value: string, inline?: boolean) {
		this.fields.push({ name, value, inline });
		return this;
	}

	/**
	 * Set the fields of the embed.
	 * @param fields The fields of the embed.
	 * @returns This embed builder.
	 */
	public setFields(fields: APIEmbedField[]) {
		this.fields = fields;
		return this;
	}
}
