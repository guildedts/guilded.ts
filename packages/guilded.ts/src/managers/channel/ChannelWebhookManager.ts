import { BaseManager } from '../BaseManager';
import { CacheCollection } from '../../structures/CacheCollection';
import { Channel } from '../../structures/channel/Channel';
import { Webhook } from '../../structures/Webhook';

/** A manager of webhooks that belong to a channel. */
export class ChannelWebhookManager extends BaseManager<string, Webhook> {
	/** @param channel The channel that owns the webhooks. */
	public constructor(public readonly channel: Channel) {
		super(channel.client, channel.client.options.maxWebhookCache);
	}

	/** @ignore */
	public fetch(
		arg1: string | boolean = this.client.options.cacheWebhooks ?? true,
		arg2 = this.client.options.cacheWebhooks ?? true,
	) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(
		webhookId: string,
		cache = this.client.options.cacheWebhooks ?? true,
	) {
		const raw = await this.client.api.webhooks.fetchSingle(this.channel.serverId, webhookId);
		const webhook = new Webhook(this.channel, raw);
		if (cache) this.cache.set(webhookId, webhook);
		return webhook;
	}

	/** @ignore */
	public async fetchMany(cache: boolean = this.client.options.cacheWebhooks ?? true) {
		const raw = await this.client.api.webhooks.fetchMany(
			this.channel.serverId,
			this.channel.id,
		);
		const webhooks = new CacheCollection<string, Webhook>();
		for (const data of raw) {
			const webhook = new Webhook(this.channel, data);
			webhooks.set(webhook.id, webhook);
			if (cache) this.cache.set(webhook.id, webhook);
		}
		return webhooks;
	}

	/**
	 * Create a webhook in the channel.
	 * @param name The name to create the webhook with.
	 * @returns The created webhook.
	 */
	public async create(name: string) {
		const raw = await this.client.api.webhooks.create(
			this.channel.serverId,
			this.channel.id,
			name,
		);
		return new Webhook(this.channel, raw);
	}

	/**
	 * Edit a webhook in the channel.
	 * @param webhookId The ID of the webhook to edit.
	 * @param name The name to edit the webhook with.
	 * @param channelId The ID of the channel to move the webhook to.
	 * @returns The edited webhook.
	 */
	public async edit(webhookId: string, name: string, channelId?: string) {
		const raw = await this.client.api.webhooks.edit(
			this.channel.serverId,
			webhookId,
			name,
			channelId,
		);
		return new Webhook(this.channel, raw);
	}

	/**
	 * Delete a webhook in the channel.
	 * @param webhookId The ID of the webhook to delete.
	 */
	public delete(webhookId: string) {
		return this.client.api.webhooks.delete(this.channel.serverId, webhookId);
	}
}

export declare interface ChannelWebhookManager {
	/**
	 * Fetch a single webhook from the channel, or cache.
	 * @param webhookId The ID of the webhoook to fetch.
	 * @param cache Whether to cache the fetched webhook.
	 * @returns The fetched webhook.
	 */
	fetch(webhookId: string, cache?: boolean): Promise<Webhook>;

	/**
	 * Fetch multiple webhooks from the channel.
	 * @param cache Whether to cache the fetched webhooks.
	 * @returns The fetched webhooks.
	 */
	fetch(cache: boolean): Promise<CacheCollection<string, Webhook>>;
}
