import { BaseManager } from '../BaseManager';
import { CacheCollection } from '../../structures/CacheCollection';
import { Channel } from '../../structures/channel/Channel';
import { Webhook } from '../../structures/Webhook';

/** The manager of webhooks that belong to a channel. */
export class ChannelWebhookManager extends BaseManager<string, Webhook> {
	/** @param channel The channel the webhooks belong to. */
	public constructor(public readonly channel: Channel) {
		super(channel.client, channel.client.options.maxWebhookCache);
	}

	/**
	 * Fetch a webhook from the channel, or cache.
	 * @param webhookId The ID of the webhoook to fetch.
	 * @param cache Whether to cache the fetched webhook.
	 * @returns The fetched webhook.
	 */
	public fetch(webhookId: string, cache?: boolean): Promise<Webhook>;
	/**
	 * Fetch multiple webhooks from the channel.
	 * @param cache Whether to cache the fetched webhooks.
	 * @returns The fetched webhooks.
	 */
	public fetch(cache: boolean): Promise<CacheCollection<string, Webhook>>;
	/** @ignore */
	public fetch(
		arg1?: string | boolean,
		arg2?: boolean,
	) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(
		webhookId: string,
		cache?: boolean,
	) {
		const raw = await this.client.api.webhooks.fetchSingle(this.channel.serverId, webhookId);
		return new Webhook(this.channel, raw, cache);
	}

	/** @ignore */
	public async fetchMany(cache?: boolean) {
		const raw = await this.client.api.webhooks.fetchMany(
			this.channel.serverId,
			this.channel.id,
		);
		const webhooks = new CacheCollection<string, Webhook>();
		for (const data of raw) {
			const webhook = new Webhook(this.channel, data, cache);
			webhooks.set(webhook.id, webhook);
		}
		return webhooks;
	}

	/**
	 * Create a webhook in the channel.
	 * @param name The name of the webhook.
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
	 * @param name The name of the webhook.
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
