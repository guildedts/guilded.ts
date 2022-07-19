import {
	APIEmbed,
	APIEmbedAuthor,
	APIEmbedField,
	APIEmbedFooter,
	APIEmbedMedia,
} from 'guilded-api-typings';
import { ColorResolvable, resolveColor } from './util';

/**
 * The embed builder for Guilded embeds.
 * @example
 * new Embed()
 *     .setTitle('Embed Title')
 *     .setDescription('This is the embed description.');
 */
export class Embed {
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
	timestamp?: Date;
	/** The thumbnail of the embed. */
	thumbnail?: APIEmbedMedia;
	/** The image of the embed. */
	image?: APIEmbedMedia;
	/** The author of the embed. */
	author?: APIEmbedAuthor;
	/** The fields of the embed. */
	fields: APIEmbedField[];

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
	 * @example embed.setTitle('Embed Title');
	 */
	setTitle(title?: string) {
		this.title = title;
		return this;
	}

	/**
	 * Set the description of the embed.
	 * @param description The description of the embed.
	 * @returns The embed builder.
	 * @example embed.setDescription('This is the embed description.');
	 */
	setDescription(description?: string) {
		this.description = description;
		return this;
	}

	/**
	 * Set the URL of the embed.
	 * @param url The URL of the embed.
	 * @returns The embed builder.
	 * @example embed.setUrl('https://example.com');
	 */
	setUrl(url?: string) {
		this.url = url;
		return this;
	}

	/**
	 * Set the color of the embed.
	 * @param color The color of the embed.
	 * @returns The embed builder.
	 * @example
	 * // Set the color of the embed with a hex color.
	 * embed.setColor(0xFFFFFF);
	 * embed.setColor('#FFFFFF');
	 * // Set the color of the embed with a preset color.
	 * embed.setColor('WHITE');
	 * // Set the color of the embed with RGB values.
	 * embed.setColor([255, 255, 255]);
	 */
	setColor(color?: ColorResolvable) {
		this.color = color ? resolveColor(color) : undefined;
		return this;
	}

	/**
	 * Set the footer of the embed.
	 * @param text The text of the footer.
	 * @param iconUrl The icon URL of the footer.
	 * @returns The embed builder.
	 * @example embed.setFooter('Footer Text', 'https://example.com');
	 */
	setFooter(text?: string, iconUrl?: string) {
		this.footer = text ? { text, icon_url: iconUrl } : undefined;
		return this;
	}

	/**
	 * Set the timestamp of the embed.
	 * @param timestamp The timestamp of the embed.
	 * @returns The embed builder.
	 * @example
	 * // Set the timestamp of the embed with an ISO 8601 date.
	 * embed.setTimestamp('2022-01-01T00:00:00.000Z');
	 * // Set the timestamp of the embed with a number of milliseconds since the epoch.
	 * embed.setTimestamp(1640995200000);
	 * // Set the timestamp of the embed with a Date object.
	 * embed.setTimestamp(new Date('2022-01-01T00:00:00.000Z'));
	 */
	setTimestamp(timestamp?: string | number | Date) {
		this.timestamp = new Date(timestamp ?? Date.now());
		return this;
	}

	/**
	 * Set the thumbnail of the embed.
	 * @param thumbnailUrl The thumbnail URL of the embed.
	 * @returns The embed builder.
	 * @example embed.setThumbnail('https://example.com');
	 */
	setThumbnail(thumbnailUrl?: string) {
		this.thumbnail = { url: thumbnailUrl };
		return this;
	}

	/**
	 * Set the image of the embed.
	 * @param imageUrl The image URL of the embed.
	 * @returns The embed builder.
	 * @example embed.setImage('https://example.com');
	 */
	setImage(imageUrl?: string) {
		this.image = { url: imageUrl };
		return this;
	}

	/**
	 * Set the author of the embed.
	 * @param author The author of the embed.
	 * @returns The embed builder.
	 * @example
	 * // Set the author of the embed with a name.
	 * embed.setAuthor('Author Name');
	 * // Set the author of the embed with a name, icon, and URL.
	 * embed.setAuthor({ name: 'Author Name', icon_url: 'https://example.com', url: 'https://example.com' });
	 */
	setAuthor(author?: string | APIEmbedAuthor) {
		this.author = typeof author === 'string' ? { name: author } : author;
		return this;
	}

	/**
	 * Add a field to the embed.
	 * @param name The name of the field.
	 * @param value The value of the field.
	 * @param inline Whether the field is inline.
	 * @returns The embed builder.
	 * @example
	 * // Add a field to the embed.
	 * embed.addField('Field Name', 'Field Value');
	 * // Add a inline field to the embed.
	 * embed.addField('Field Name', 'Field Value', true);
	 */
	addField(name: string, value: string, inline?: boolean) {
		this.fields.push({ name, value, inline });
		return this;
	}

	/**
	 * Set the fields of the embed.
	 * @param fields The fields of the embed.
	 * @returns The embed builder.
	 * @example embed.setFields([{ name: 'Field Name', value: 'Field Value' }]);
	 */
	setFields(fields: APIEmbedField[] = []) {
		this.fields = fields;
		return this;
	}
}
