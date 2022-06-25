import { APIEmbed, APIWebhook } from 'guilded-api-typings';
import { Embed } from '@guildedts/builders';
import fetch from 'node-fetch';
import { Base } from './Base';
import { FetchOptions } from '../managers/BaseManager';
import { Channel } from './channel/Channel';

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
	 * @param cache Whether to cache the webhook.
	 */
	constructor(
		public readonly channel: Channel,
		public readonly raw: APIWebhook,
		cache = channel.client.options.cacheWebhooks ?? true,
	) {
		super(channel.client, raw.id);
		this.name = raw.name;
		this.serverId = raw.serverId;
		this.channelId = raw.channelId;
		this.createdAt = new Date(raw.createdAt);
		this.createdBy = raw.createdBy;
		this.deletedAt = raw.deletedAt ? new Date(raw.deletedAt) : undefined;
		this.token = raw.token;
		if (cache) channel.webhooks.cache.set(this.id, this);
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

	/** The server member that created the webhook. */
	public get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/** The ID of the user that created the webhook. */
	public get authorId() {
		return this.createdBy;
	}

	/** The timestamp the webhook was deleted. */
	public get deletedTimestamp() {
		return this.deletedAt?.getTime();
	}

	/**
	 * Fetch the webhook.
	 * @param options The options to fetch the webhook with.
	 * @returns The fetched webhook.
	 */
	public fetch(options?: FetchOptions) {
		return this.channel.webhooks.fetch(this, options) as Promise<this>;
	}

	/**
	 * Fetch the server the webhook belongs to.
	 * @param options The options to fetch the server with.
	 * @returns The fetched server.
	 */
	public async fetchServer(options?: FetchOptions) {
		return this.channel.fetchServer(options);
	}

	/**
	 * Fetch the server member that created the webhook.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 */
	public async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Send a message with the webhook.
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
	 * Edit the webhook.
	 * @param name The name of the webhook.
	 * @param channelId The ID of the channel the webhook belongs to.
	 * @returns The edited webhook.
	 */
	public edit(name: string, channelId?: string) {
		return this.channel.webhooks.edit(this, name, channelId);
	}

	/**
	 * Delete the webhook.
	 * @returns The deleted webhook.
	 */
	public async delete() {
		await this.channel.webhooks.delete(this);
		return this;
	}
}
