import { WSEvents } from 'guilded-api-typings';
import { Client } from '../../structures/Client';
import { createChannel } from '../../util';

/**
 * Handle the TeamChannelCreated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function created(client: Client, data: WSEvents['TeamChannelCreated']) {
	client.emit('channelCreate', createChannel(client, data.channel));
}

/**
 * Handle the TeamChannelUpdated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function updated(client: Client, data: WSEvents['TeamChannelUpdated']) {
	client.emit('channelEdit', createChannel(client, data.channel));
}

/**
 * Handle the TeamChannelDeleted event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function deleted(client: Client, data: WSEvents['TeamChannelDeleted']) {
	const channel = createChannel(client, data.channel);
	client.channels.cache.delete(channel.id);
	client.emit('channelDelete', channel);
}
