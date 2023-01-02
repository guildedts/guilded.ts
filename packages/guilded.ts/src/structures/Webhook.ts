import { APIWebhook, RESTPostWebhookMessageJSONBody } from 'guilded-api-typings';
import { Base } from './Base';
import { FetchOptions } from '../managers/BaseManager';
import { Channel } from './channel/Channel';
import { WebhookMessagePayloadResolvable } from '../managers/channel/ChannelWebhookManager';

/**
 * Represents a webhook on Guilded
 */
export class Webhook extends Base {
	/**
	 * The name of the webhook (`1`-`128` characters)
	 */
	readonly name: string;
	/**
	 * The ID of the server
	 */
	readonly serverId: string;
	/**
	 * The ID of the channel
	 */
	readonly channelId: string;
	/**
	 * When the webhook was created
	 */
	readonly createdAt: Date;
	/**
	 * The ID of the user that created the webhook
	 */
	readonly createdBy: string;
	/**
	 * When the webhook was deleted, if relevant
	 */
	readonly deletedAt?: Date;
	/**
	 * The token of the webhook
	 */
	readonly token?: string;

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

	/**
	 * Whether the webhook is cached
	 */
	get isCached() {
		return this.channel.webhooks.cache.has(this.id);
	}

	/**
	 * The server
	 */
	get server() {
		return this.channel.server;
	}

	/**
	 * The timestamp of when the webhook was created
	 */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/**
	 * The server member that created the webhook
	 */
	get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/**
	 * The ID of the user that created the webhook
	 */
	get authorId() {
		return this.createdBy;
	}

	/**
	 * The timestamp of when the webhook was deleted, if relevant
	 */
	get deletedTimestamp() {
		return this.deletedAt?.getTime();
	}

	/**
	 * Fetch the webhook
	 * @param options The options to fetch the webhook with
	 * @returns The fetched webhook
	 */
	fetch(options?: FetchOptions) {
		return this.channel.webhooks.fetch(this, options) as Promise<this>;
	}

	/**
	 * Fetch the server
	 * @param options The options to fetch the server with
	 * @returns The fetched server
	 */
	fetchServer(options?: FetchOptions) {
		return this.channel.fetchServer(options);
	}

	/**
	 * Fetch the server member that created the webhook
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Send a message with the webhook
	 * @param payload The payload of the message
	 */
	send(payload: WebhookMessagePayloadResolvable) {
		return this.client.api.webhooks.send(
			this.id,
			this.token!,
			(typeof payload === 'string'
				? { content: payload }
				: Array.isArray(payload)
				? { embeds: payload }
				: payload) as RESTPostWebhookMessageJSONBody,
		);
	}

	/**
	 * Edit the webhook
	 * @param name The name of the webhook
	 * @param channelId The ID of the channel
	 * @returns The edited webhook
	 */
	edit(name: string, channelId?: string) {
		return this.channel.webhooks.edit(this, name, channelId);
	}

	/**
	 * Delete the webhook
	 * @returns The deleted webhook
	 */
	async delete() {
		await this.channel.webhooks.delete(this);
		return this;
	}
}
