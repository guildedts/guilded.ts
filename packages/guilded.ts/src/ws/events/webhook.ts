import {
	WebSocketWebhookCreateEventData,
	WebSocketWebhookUpdateEventData,
} from 'guilded-api-typings';
import { Client } from '../../structures/Client';
import { Webhook } from '../../structures/Webhook';

/**
 * Handle the ServerWebhookCreated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function created(client: Client, data: WebSocketWebhookCreateEventData) {
	const channel = await client.channels.fetch(data.webhook.channelId);
	const webhook = new Webhook(channel, data.webhook);
	client.emit('webhookCreate', webhook);
}

/**
 * Handle the ServerWebhookUpdated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function updated(client: Client, data: WebSocketWebhookUpdateEventData) {
	const channel = await client.channels.fetch(data.webhook.channelId);
	const oldWebhook = channel.webhooks.cache.get(data.webhook.id);
	const newWebhook = new Webhook(channel, data.webhook);
	client.emit('webhookEdit', newWebhook, oldWebhook);
}
