import { APIWebhook, RESTPostWebhookMessageJSONBody } from 'guilded-api-typings';
import { Base } from './Base';
import { FetchOptions } from '../managers/BaseManager';
import { WebhookMessagePayloadResolvable } from '../managers/channel/ChannelWebhookManager';
import { ChatChannel } from './channel/ChatChannel';
import { ListChannel } from './channel/ListChannel';

/**
 * Represents a webhook on Guilded
 */
export class Webhook extends Base {
	/**
	 * @param channel The channel the webhook belongs to.
	 * @param data The raw data of the webhook.
	 * @param cache Whether to cache the webhook.
	 */
	constructor(
		public readonly channel: ChatChannel | ListChannel,
		public readonly data: APIWebhook,
		cache = channel.client.options.cacheWebhooks ?? true,
	) {
		super(channel.client);
		if (cache) channel.webhooks.cache.set(this.id, this);
	}

	/**
	 * Whether the webhook is cached
	 */
	get isCached() {
		return this.channel.webhooks.cache.has(this.id);
	}

	/**
	 * The ID of the webhook
	 */
	get id() {
		return this.data.id;
	}

	/**
	 * The name of the webhook (`1`-`128` characters)
	 */
	get name() {
		return this.data.name;
	}

	/**
	 * When the webhook was created
	 */
	get createdAt() {
		return new Date(this.data.createdAt);
	}

	/**
	 * The ID of the user that created the webhook
	 */
	get creatorId() {
		return this.data.createdBy;
	}

	/**
	 * The user that created the webhook
	 */
	get creator() {
		return this.client.users.cache.get(this.creatorId) ?? null;
	}

	/**
	 * Whether the client user created the webhook
	 */
	get isCreator() {
		return this.creatorId === this.client.user?.id;
	}

	/**
	 * When the webhook was deleted, if relevant
	 */
	get deletedAt() {
		return this.data.deletedAt ? new Date(this.data.deletedAt) : null;
	}

	/**
	 * The token of the webhook
	 */
	get token() {
		return this.data.token ?? null;
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
	 * Fetch the user that created the webhook
	 * @returns The fetched user
	 */
	async fetchCreator() {
		return this.client.users.fetch(this.channel.serverId, this.creatorId);
	}

	/**
	 * Send a message with the webhook
	 * @param options The options to create the message with
	 */
	send(options: WebhookMessagePayloadResolvable) {
		return this.client.api.webhooks.send(
			this.id,
			this.token!,
			(typeof options === 'string'
				? { content: options }
				: Array.isArray(options)
				? { embeds: options }
				: options) as RESTPostWebhookMessageJSONBody,
		);
	}

	/**
	 * Update the webhook
	 * @param name The name of the webhook
	 * @param channelId The ID of the channel
	 * @returns The updated webhook
	 */
	update(name: string, channelId?: string) {
		return this.channel.webhooks.update(this, name, channelId);
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
