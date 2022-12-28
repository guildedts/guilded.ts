import {
	WebSocketChannelCreateEventData,
	WebSocketChannelDeleteEventData,
	WebSocketChannelUpdateEventData,
} from 'guilded-api-typings';
import { Client } from '../../structures/Client';
import { createChannel } from '../../util';

/**
 * Handle the ServerChannelCreated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export function created(client: Client, data: WebSocketChannelCreateEventData) {
	const channel = createChannel(client, data.channel);
	client.emit('channelCreate', channel);
}

/**
 * Handle the ServerChannelUpdated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export function updated(client: Client, data: WebSocketChannelUpdateEventData) {
	const oldChannel = client.channels.cache.get(data.channel.id);
	const newChannel = createChannel(client, data.channel);
	client.emit('channelEdit', newChannel, oldChannel);
}

/**
 * Handle the ServerChannelDeleted event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export function deleted(client: Client, data: WebSocketChannelDeleteEventData) {
	const channel = createChannel(client, data.channel);
	if (client.options.disposeCachedChannels ?? true) client.channels.cache.delete(channel.id);
	client.emit('channelDelete', channel);
}
