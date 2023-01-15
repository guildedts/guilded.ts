import { APIEmbed, APIEmbedAuthor, APIEmbedField, APIEmbedFooter } from 'guilded-api-typings';
import { ColorResolvable, resolveColor } from '@guildedts/util';

/**
 * The embed builder for Guilded embeds
 * @example
 * new EmbedBuilder()
 *     .setTitle('Embed Title')
 *     .setDescription('This is the embed description.');
 */
export class EmbedBuilder {
	/**
	 * The data of the embed
	 */
	readonly data: APIEmbed = {};

	/**
	 * Set the title of the embed
	 * @param title The title of the embed
	 * @returns This embed builder
	 */
	setTitle(title: string | null) {
		this.data.title = title ?? undefined;
		return this;
	}

	/**
	 * Set the description of the embed
	 * @param description The description of the embed
	 * @returns The embed builder
	 */
	setDescription(description: string | null) {
		this.data.description = description ?? undefined;
		return this;
	}

	/**
	 * Set the URL of the embed
	 * @param url The URL of the embed
	 * @returns The embed builder
	 */
	setUrl(url: string | null) {
		this.data.url = url ?? undefined;
		return this;
	}

	/**
	 * Set the color of the embed
	 * @param color The color of the embed
	 * @returns The embed builder
	 * @example
	 * // Set the color of the embed with a hex color
	 * embed.setColor(0xFFFFFF);
	 *
	 * // Set the color of the embed with RGB values
	 * embed.setColor([255, 255, 255]);
	 *
	 * // Set the color of the embed with a preset color
	 * embed.setColor(Color.White);
	 */
	setColor(color: ColorResolvable | null) {
		this.data.color = color ? resolveColor(color) : undefined;
		return this;
	}

	/**
	 * Set the footer of the embed
	 * @param footer The footer of the embed
	 * @returns The embed builder
	 */
	setFooter(footer: EmbedFooter | null) {
		this.data.footer = footer ? { text: footer.text, icon_url: footer.iconUrl } : undefined;
		return this;
	}

	/**
	 * Set the timestamp of the embed
	 * @param timestamp The timestamp of the embed
	 * @returns The embed builder
	 */
	setTimestamp(timestamp: string | number | Date | null = new Date()) {
		this.data.timestamp = timestamp ? new Date(timestamp).toISOString() : undefined;
		return this;
	}

	/**
	 * Set the thumbnail of the embed
	 * @param thumbnailUrl The thumbnail URL of the embed
	 * @returns The embed builder
	 */
	setThumbnail(thumbnailUrl: string | null) {
		this.data.thumbnail = thumbnailUrl ? { url: thumbnailUrl } : undefined;
		return this;
	}

	/**
	 * Set the image of the embed
	 * @param imageUrl The image URL of the embed
	 * @returns The embed builder
	 */
	setImage(imageUrl: string | null) {
		this.data.image = imageUrl ? { url: imageUrl } : undefined;
		return this;
	}

	/**
	 * Set the author of the embed
	 * @param author The author of the embed
	 * @returns The embed builder
	 */
	setAuthor(author: EmbedAuthor | null) {
		this.data.author = author
			? { name: author.name, url: author.url, icon_url: author.iconUrl }
			: undefined;
		return this;
	}

	/**
	 * Add field(s) to the embed
	 * @param fields The fields to add to the embed
	 * @returns The embed builder
	 */
	addFields(...fields: APIEmbedField[]) {
		if (this.data.fields) this.data.fields.push(...fields);
		else this.data.fields = fields;
		return this;
	}

	/**
	 * Set the fields of the embed
	 * @param fields The fields of the embed
	 * @returns The embed builder
	 */
	setFields(...fields: APIEmbedField[]) {
		this.data.fields = fields;
		return this;
	}

	/**
	 * Transform the embed builder to a plain object
	 */
	toJSON() {
		return this.data;
	}
}

/**
 * Represents an embed footer
 */
export type EmbedFooter = Omit<APIEmbedFooter, 'icon_url'> & {
	/**
	 * The icon URL of the embed footer (max characters: `1024`)
	 */
	iconUrl?: string;
};

/**
 * Represents an embed author
 */
export type EmbedAuthor = Omit<APIEmbedAuthor, 'icon_url'> & {
	/**
	 * The icon URL of the embed author (max characters: `1024`)
	 */
	iconUrl?: string;
};
