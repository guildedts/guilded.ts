import { BaseManager, FetchManyOptions, FetchOptions } from '../BaseManager';
import { Webhook } from '../../structures/Webhook';
import { Collection } from '@discordjs/collection';
import { APIEmbed, RESTPostWebhookMessageJSONBody } from 'guilded-api-typings';
import { EmbedBuilder } from '@guildedts/builders';
import { ChatChannel } from '../../structures/channel/ChatChannel';
import { ListChannel } from '../../structures/channel/ListChannel';

/**
 * The manager for webhooks
 */
export class ChannelWebhookManager extends BaseManager<string, Webhook> {
	/**
	 * @param channel The channel
	 */
	constructor(public readonly channel: ChatChannel | ListChannel) {
		super(channel.client, channel.client.options.maxWebhookCache);
	}

	/**
	 * Fetch a webhook from the channel
	 * @param webhook The webhoook
	 * @param options The options to fetch the webhook with
	 * @returns The fetched webhook
	 */
	fetch(webhook: string | Webhook, options?: FetchOptions): Promise<Webhook>;
	/**
	 * Fetch webhooks from the channel
	 * @param options The options to fetch webhooks with
	 * @returns The fetched webhooks
	 */
	fetch(options?: FetchManyOptions): Promise<Collection<string, Webhook>>;
	fetch(arg1?: string | Webhook | FetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'string' || arg1 instanceof Webhook)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	private async fetchSingle(webhook: string | Webhook, options?: FetchOptions) {
		webhook = webhook instanceof Webhook ? webhook.id : webhook;
		const cached = this.cache.get(webhook);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.webhooks.fetchSingle(this.channel.serverId, webhook);
		return new Webhook(this.channel, raw, options?.cache);
	}

	private async fetchMany(options?: FetchManyOptions) {
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
	 * Create a webhook in the channel
	 * @param name The name of the webhook
	 * @returns The created webhook
	 */
	async create(name: string) {
		const raw = await this.client.api.webhooks.create(
			this.channel.serverId,
			this.channel.id,
			name,
		);
		return new Webhook(this.channel, raw);
	}

	/**
	 * Update a webhook in the channel
	 * @param webhook The webhook
	 * @param name The name of the webhook
	 * @param channelId The ID of the channel
	 * @returns The updated webhook
	 */
	async update(webhook: string | Webhook, name: string, channelId?: string) {
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
	 * Delete a webhook from the channel
	 * @param webhook The webhook
	 */
	delete(webhook: string | Webhook) {
		webhook = webhook instanceof Webhook ? webhook.id : webhook;
		return this.client.api.webhooks.delete(this.channel.serverId, webhook);
	}
}

/**
 * The payload for creating a webhook message
 */
export interface WebhookMessagePayload extends Omit<RESTPostWebhookMessageJSONBody, 'embeds'> {
	/**
	 * The embeds of the message
	 */
	embeds?: (EmbedBuilder | APIEmbed)[];
}

/**
 * The resolvable payload for creating a webhook message
 */
export type WebhookMessagePayloadResolvable =
	| string
	| (EmbedBuilder | APIEmbed)[]
	| WebhookMessagePayload;
