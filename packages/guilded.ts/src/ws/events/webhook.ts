import { WSEvents } from 'guilded-api-typings';
import { Client } from '../../structures/Client';
import { Webhook } from '../../structures/Webhook';

/**
 * Handle the TeamWebhookCreated event.
 * @param client The client instance.
 * @param data The data of the event.
 */
export async function created(client: Client, data: WSEvents['TeamWebhookCreated']) {
	const channel = await client.channels.fetch(data.webhook.channelId);
	const webhook = new Webhook(channel, data.webhook);
	if (client.options.cacheWebhooks) channel.webhooks.cache.set(webhook.id, webhook);
	client.emit('webhookCreate', webhook);
}

/**
 * Handle the TeamWebhookUpdated event.
 * @param client The client instance.
 * @param data The data of the event.
 */
export async function updated(client: Client, data: WSEvents['TeamWebhookUpdated']) {
	const channel = await client.channels.fetch(data.webhook.channelId);
	const webhook = new Webhook(channel, data.webhook);
	if (client.options.cacheWebhooks) channel.webhooks.cache.set(webhook.id, webhook);
	client.emit('webhookEdit', webhook);
}
