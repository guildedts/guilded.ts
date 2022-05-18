import { APIEmbed, APIWebhook } from 'guilded-api-typings';
import { Embed } from '@guildedts/builders';
import fetch from 'node-fetch';
import { Base } from './Base';
import { ChannelResolvable } from '../managers/channel/ChannelManager';

/** Represents a webhook on Guilded. */
export class Webhook extends Base {
	/** The name of the webhook. */
	public readonly name: string;
	/** The ID of the server the webhook belongs to. */
	public readonly serverId: string;
	/** The ID of the channel the webhook belongs to. */
	public readonly channelId: string;
	/** The date the webhook was created. */
	public readonly createdAt: Date;
	/** The ID of the user that created the webhook. */
	public readonly createdBy: string;
	/** The date the webhook was deleted. */
	public readonly deletedAt?: Date;
	/** The token of the webhook. */
	public readonly token?: string;

	/**
	 * @param channel The channel the webhook belongs to.
	 * @param raw The raw data of the webhook.
	 */
	constructor(public readonly channel: ChannelResolvable, public readonly raw: APIWebhook) {
		super(channel.client, raw.id);
		this.name = raw.name;
		this.serverId = raw.serverId;
		this.channelId = raw.channelId;
		this.createdAt = new Date(raw.createdAt);
		this.createdBy = raw.createdBy;
		this.deletedAt = raw.deletedAt ? new Date(raw.deletedAt) : undefined;
		this.token = raw.token;
	}

	/** Whether the webhook is cached. */
	public get isCached() {
		return this.channel.webhooks.cache.has(this.id);
	}

	/** The server the webhook belongs to. */
	public get server() {
		return this.channel.server;
	}

	/** The timestamp the webhook was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The author of the webhook. */
	public get author() {
		return this.client.users.cache.get(this.createdBy);
	}

	/** The ID of the author. */
	public get authorId() {
		return this.createdBy;
	}

	/** The timestamp the webhook was deleted. */
	public get deletedTimestamp() {
		return this.deletedAt?.getTime();
	}

	/**
	 * Send a message with the webhook.
	 * @param content The content to create the message with.
	 * @param embeds The embeds to create the message with.
	 */
	public async send(content: string, embeds?: (APIEmbed | Embed)[]) {
		await fetch(`https://media.guilded.gg/webhooks/${this.id}/${this.token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ content, embeds }),
		});
	}

	/**
	 * Edite the webhook.
	 * @param name The name to edit the webhook with.
	 * @returns The edited webhook.
	 */
	public edit(name: string) {
		return this.channel.webhooks.edit(this.id, name);
	}

	/** Deletes the webhook. */
	public async delete() {
		await this.channel.webhooks.delete(this.id);
		return this;
	}
}
