import { BaseManager, FetchManyOptions, FetchOptions } from '../BaseManager';
import { Channel } from '../../structures/channel/Channel';
import { Webhook } from '../../structures/Webhook';
import Collection from '@discordjs/collection';

/** The manager of webhooks that belong to a channel. */
export class ChannelWebhookManager extends BaseManager<string, Webhook> {
	/** @param channel The channel the webhooks belong to. */
	public constructor(public readonly channel: Channel) {
		super(channel.client, channel.client.options.maxWebhookCache);
	}

	/**
	 * Fetch a webhook from the channel, or cache.
	 * @param webhook The webhoook to fetch.
	 * @param options The options to fetch the webhook with.
	 * @returns The fetched webhook.
	 */
	public fetch(webhook: string | Webhook, options?: FetchOptions): Promise<Webhook>;
	/**
	 * Fetch multiple webhooks from the channel.
	 * @param options The options to fetch webhooks with.
	 * @returns The fetched webhooks.
	 */
	public fetch(options?: FetchManyOptions): Promise<Collection<string, Webhook>>;
	/** @ignore */
	public fetch(arg1?: string | Webhook | FetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'string' || arg1 instanceof Webhook)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(webhook: string | Webhook, options?: FetchOptions) {
		webhook = webhook instanceof Webhook ? webhook.id : webhook;
		const cached = this.cache.get(webhook);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.webhooks.fetchSingle(this.channel.serverId, webhook);
		return new Webhook(this.channel, raw, options?.cache);
	}

	/** @ignore */
	public async fetchMany(options?: FetchManyOptions) {
		const raw = await this.client.api.webhooks.fetchMany(
			this.channel.serverId,
			this.channel.id,
		);
		const webhooks = new Collection<string, Webhook>();
		for (const data of raw) {
			const webhook = new Webhook(this.channel, data, options?.cache);
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
	 * @param webhook The webhook to edit.
	 * @param name The name of the webhook.
	 * @param channelId The ID of the channel to move the webhook to.
	 * @returns The edited webhook.
	 */
	public async edit(webhook: string | Webhook, name: string, channelId?: string) {
		webhook = webhook instanceof Webhook ? webhook.id : webhook;
		const raw = await this.client.api.webhooks.edit(
			this.channel.serverId,
			webhook,
			name,
			channelId,
		);
		return new Webhook(this.channel, raw);
	}

	/**
	 * Delete a webhook in the channel.
	 * @param webhook The webhook to delete.
	 */
	public delete(webhook: string | Webhook) {
		webhook = webhook instanceof Webhook ? webhook.id : webhook;
		return this.client.api.webhooks.delete(this.channel.serverId, webhook);
	}
}
