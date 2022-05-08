import { APIGetWebhooksQuery, APIWebhook, APIWebhookPayload, Routes } from 'guilded-api-typings';
import { BaseManager } from '..';
import { CacheCollection, Channel, Webhook } from '../../structures';

/** A manager of webhooks that belong to a channel. */
export class ChannelWebhookManager extends BaseManager<string, Webhook> {
	/** @param channel The channel that owns the webhooks. */
	public constructor(public readonly channel: Channel) {
		super(channel.client, {
			caching: channel.client.options.cacheWebhooks,
			maxCache: channel.client.options.maxWebhookCache,
		});
	}

	/** @ignore */
	public fetch(arg1: string | boolean = this.caching, arg2 = this.caching) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);

		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(webhookId: string, cache = this.caching) {
		const response = await this.client.rest.get<{ webhook: APIWebhook }>(
			Routes.serverWebhook(this.channel.server.id, webhookId),
		);

		const webhook = new Webhook(this.channel, response.webhook);

		if (cache) this.cache.set(webhook.id, webhook);

		return webhook;
	}

	/** @ignore */
	public async fetchMany(cache: boolean = this.caching) {
		const response = await this.client.rest.get<
			{ webhooks: APIWebhook[] },
			APIGetWebhooksQuery
		>(Routes.serverWebhooks(this.channel.server.id), {
			channelId: this.channel.id,
		});

		const webhooks = new CacheCollection<string, Webhook>();

		for (const data of response.webhooks) {
			const webhook = new Webhook(this.channel, data);
			webhooks.set(webhook.id, webhook);
			if (cache) this.cache.set(webhook.id, webhook);
		}

		return webhooks;
	}

	/**
	 * Create a webhook.
	 * @param name The name of the webhook.
	 * @param cache Whether to cache the webhook.
	 * @returns The created webhook.
	 */
	public async create(name: string, cache = this.caching) {
		const response = await this.client.rest.post<{ webhook: APIWebhook }, APIWebhookPayload>(
			Routes.serverWebhooks(this.channel.server.id),
			{
				channelId: this.channel.id,
				name,
			},
		);

		const webhook = new Webhook(this.channel, response.webhook);

		if (cache) this.cache.set(webhook.id, webhook);

		return webhook;
	}

	/**
	 * Edit a webhook.
	 * @param webhookId The ID of the webhook.
	 * @param name The name of the webhook.
	 * @param cache Whether to cache the webhook.
	 * @returns The edited webhook.
	 */
	public async edit(webhookId: string, name: string, cache = this.caching) {
		const response = await this.client.rest.put<{ webhook: APIWebhook }, APIWebhookPayload>(
			Routes.serverWebhook(this.channel.server.id, webhookId),
			{
				channelId: this.channel.id,
				name,
			},
		);

		const webhook = new Webhook(this.channel, response.webhook);

		if (cache) this.cache.set(webhook.id, webhook);

		return webhook;
	}

	/**
	 * Delete a webhook.
	 * @param webhookId The ID of the webhook.
	 * @returns The webhook if cached.
	 */
	public async delete(webhookId: string) {
		await this.client.rest.delete(Routes.serverWebhook(this.channel.server.id, webhookId));

		const webhook = this.cache.get(webhookId);

		this.cache.delete(webhookId);

		return webhook;
	}
}

export declare interface ChannelWebhookManager {
	/**
	 * Fetch a single webhook from this channel, or cache if it's already cached.
	 * @param webhookId The ID of the webhoook.
	 * @param cache Whether to cache the webhook.
	 * @returns The webhook.
	 */
	fetch(webhookId: string, cache?: boolean): Promise<Webhook>;

	/**
	 * Fetch multiple webhooks from this channel.
	 * @param cache Whether to cache the webhooks.
	 * @returns The webhooks.
	 */
	fetch(cache: boolean): Promise<CacheCollection<string, Webhook>>;
}
