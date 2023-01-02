import {
	WebSocketDocCreateEventData,
	WebSocketDocDeleteEventData,
	WebSocketDocUpdateEventData,
} from 'guilded-api-typings';
import { Client } from '../../structures/Client';
import { Doc } from '../../structures/Doc';
import { DocChannel } from '../../structures/channel/DocChannel';

/**
 * Handle the `DocCreated` event
 * @param client The client
 * @param data The data of the event
 */
export async function created(client: Client, data: WebSocketDocCreateEventData) {
	const channel = (await client.channels.fetch(data.doc.channelId)) as DocChannel;
	const doc = new Doc(channel, data.doc);
	client.emit('docCreate', doc);
}

/**
 * Handle the `DocUpdated` event
 * @param client The client
 * @param data The data of the event
 */
export async function updated(client: Client, data: WebSocketDocUpdateEventData) {
	const channel = (await client.channels.fetch(data.doc.channelId)) as DocChannel;
	const oldDoc = channel.docs.cache.get(data.doc.id);
	const newDoc = new Doc(channel, data.doc);
	client.emit('docEdit', newDoc, oldDoc);
}

/**
 * Handle the `DocDeleted` event
 * @param client The client
 * @param data The data of the event
 */
export async function deleted(client: Client, data: WebSocketDocDeleteEventData) {
	const channel = (await client.channels.fetch(data.doc.channelId)) as DocChannel;
	const doc = new Doc(channel, data.doc);
	if (client.options.disposeCachedDocs ?? true) channel.docs.cache.delete(doc.id);
	client.emit('docDelete', doc);
}
