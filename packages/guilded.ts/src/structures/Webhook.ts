import { APIEmbed, APIWebhook } from 'guilded-api-typings';
import { Base } from '.';
import fetch from 'node-fetch';
import { Embed } from '@guildedts/builders';
import { ChannelResolvable } from '../managers';

/** Represents a webhook on Guilded. */
export class Webhook extends Base {
	/** The name of the webhook. */
	public readonly name: string;
	/** The ID of the server this webhook belongs to. */
	public readonly serverId: string;
	/** The ID of the channel this webhook belongs to. */
	public readonly channelId: string;
	/** The time this webhook was created. */
	public readonly createdAt: Date;
	/** The ID of the user who created this webhook. */
	public readonly createdBy: string;
	/** The time this webhook was deleted. */
	public readonly deletedAt?: Date;
	/** The token of this webhook. */
	public readonly token?: string;

	/**
	 * @param channel The channel this webhook belongs to.
	 * @param data The data of this webhook.
	 */
	constructor(public readonly channel: ChannelResolvable, data: APIWebhook) {
		super(channel.client, data.id);

		console.log(data);

		this.name = data.name;
		this.serverId = data.serverId;
		this.channelId = data.channelId;
		this.createdAt = new Date(data.createdAt);
		this.createdBy = data.createdBy;
		this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : undefined;
		this.token = data.token;
	}

	/** Whether this webhook is cached. */
	public get cached() {
		return this.channel.webhooks.cache.has(this.id);
	}

	/** The server this webhook belongs to. */
	public get server() {
		return this.channel.server;
	}

	/** The timestamp of when the webhook was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The author of the webhook. */
	public get author() {
		return this.client.users.cache.get(this.createdBy);
	}

	/** The ID of the author of the webhook. */
	public get authorId() {
		return this.createdBy;
	}

	/** The timestamp of when the webhook was deleted. */
	public get deletedTimestamp() {
		return this.deletedAt?.getTime();
	}

	/**
	 * Send a message with this webhook.
	 * @param content The content of the message.
	 * @param embeds The embeds of the message.
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
	 * Edits this webhook.
	 * @param name The new name of this webhook.
	 * @param cache Whether to cache this webhook.
	 * @returns The edited webhook.
	 */
	public edit(name: string, cache = this.channel.webhooks.caching) {
		return this.channel.webhooks.edit(this.id, name, cache);
	}

	/** Deletes this webhook. */
	public delete() {
		return this.channel.webhooks.delete(this.id);
	}
}
