import {
	WebSocketWebhookCreateEventData,
	WebSocketWebhookUpdateEventData,
} from 'guilded-api-typings';
import { Client } from '../../structures/Client';
import { Webhook } from '../../structures/Webhook';
import { ListChannel } from '../../structures/channel/ListChannel';
import { ChatChannel } from '../../structures/channel/ChatChannel';

/**
 * Handle the `ServerWebhookCreated` event
 * @param client The client
 * @param data The data of the event
 */
export async function created(client: Client, data: WebSocketWebhookCreateEventData) {
	const channel = (await client.channels.fetch(data.webhook.channelId)) as
		| ChatChannel
		| ListChannel;
	const webhook = new Webhook(channel, data.webhook);
	client.emit('webhookCreate', webhook);
}

/**
 * Handle the `ServerWebhookUpdated` event
 * @param client The client
 * @param data The data of the event
 */
export async function updated(client: Client, data: WebSocketWebhookUpdateEventData) {
	const channel = (await client.channels.fetch(data.webhook.channelId)) as
		| ChatChannel
		| ListChannel;
	const oldWebhook = channel.webhooks.cache.get(data.webhook.id);
	const newWebhook = new Webhook(channel, data.webhook);
	client.emit('webhookEdit', newWebhook, oldWebhook);
}
