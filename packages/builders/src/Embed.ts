import {
	APIEmbed,
	APIEmbedAuthor,
	APIEmbedField,
	APIEmbedFooter,
	APIEmbedMedia,
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
	public thumbnail?: APIEmbedMedia;
	/** The image of the embed. */
	public image?: APIEmbedMedia;
	/** The author of the embed. */
	public author?: APIEmbedAuthor;
	/** The fields of the embed. */
	public fields: APIEmbedField[];

	/** @param data The initial data of the embed. */
	constructor(data: APIEmbed = {}) {
		this.title = data.title;
		this.description = data.description;
		this.url = data.url;
		this.color = data.color;
		this.footer = data.footer;
		this.timestamp = data.timestamp ? new Date(data.timestamp) : undefined;
		this.thumbnail = data.thumbnail;
		this.image = data.image;
		this.author = data.author;
		this.fields = data.fields ?? [];
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
	 * @returns The embed builder.
	 */
	public setDescription(description?: string) {
		this.description = description;
		return this;
	}

	/**
	 * Set the URL of the embed.
	 * @param url The URL of the embed.
	 * @returns The embed builder.
	 */
	public setUrl(url?: string) {
		this.url = url;
		return this;
	}

	/**
	 * Set the color of the embed.
	 * @param color The color of the embed.
	 * @returns The embed builder.
	 */
	public setColor(color?: ColorResolvable) {
		this.color = color ? resolveColor(color) : undefined;
		return this;
	}

	/**
	 * Set the footer of the embed.
	 * @param text The text of the footer.
	 * @param iconUrl The icon URL of the footer.
	 * @returns The embed builder.
	 */
	public setFooter(text?: string, iconUrl?: string) {
		this.footer = text ? { text, icon_url: iconUrl } : undefined;
		return this;
	}

	/**
	 * Set the timestamp of the embed.
	 * @param timestamp The timestamp of the embed.
	 * @returns The embed builder.
	 */
	public setTimestamp(timestamp?: string | number | Date) {
		this.timestamp = new Date(timestamp ?? Date.now());
		return this;
	}

	/**
	 * Set the thumbnail of the embed.
	 * @param thumbnailUrl The thumbnail URL of the embed.
	 * @returns The embed builder.
	 */
	public setThumbnail(thumbnailUrl?: string) {
		this.thumbnail = { url: thumbnailUrl };
		return this;
	}

	/**
	 * Set the image of the embed.
	 * @param imageUrl The image URL of the embed.
	 * @returns The embed builder.
	 */
	public setImage(imageUrl?: string) {
		this.image = { url: imageUrl };
		return this;
	}

	/**
	 * Set the author of the embed.
	 * @param author The author of the embed.
	 * @returns The embed builder.
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
	 * @returns The embed builder.
	 */
	public addField(name: string, value: string, inline?: boolean) {
		this.fields.push({ name, value, inline });
		return this;
	}

	/**
	 * Set the fields of the embed.
	 * @param fields The fields of the embed.
	 * @returns The embed builder.
	 */
	public setFields(fields: APIEmbedField[] = []) {
		this.fields = fields;
		return this;
	}
}
