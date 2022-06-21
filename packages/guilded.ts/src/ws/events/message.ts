import { WSEvents } from 'guilded-api-typings';
import { ChatBasedChannel } from '../../managers/channel/ChannelManager';
import { Client } from '../../structures/Client';
import { Message } from '../../structures/Message';

/**
 * Handle the ChatMessageCreated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function created(client: Client, data: WSEvents['ChatMessageCreated']) {
	const channel = (await client.channels.fetch(data.message.channelId)) as ChatBasedChannel;
	client.emit('messageCreate', new Message(channel, data.message));
}

/**
 * Handle the ChatMessageUpdated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function updated(client: Client, data: WSEvents['ChatMessageUpdated']) {
	const channel = (await client.channels.fetch(data.message.channelId)) as ChatBasedChannel;
	client.emit('messageEdit', new Message(channel, data.message));
}

/**
 * Handle the ChatMessageDeleted event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function deleted(client: Client, data: WSEvents['ChatMessageDeleted']) {
	const channel = (await client.channels.fetch(data.message.channelId)) as ChatBasedChannel;
	const message = channel.messages.cache.get(data.message.id);
	if (message) message.deletedAt = new Date(data.message.deletedAt);
	client.emit('messageDelete', message ?? data.message);
}
