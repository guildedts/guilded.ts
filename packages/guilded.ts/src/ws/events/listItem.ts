import { WSEvents } from 'guilded-api-typings';
import { Client } from '../../structures/Client';
import { ListItem } from '../../structures/listItem/ListItem';
import { ListChannel } from '../../structures/channel/ListChannel';

/**
 * Handle the ListItemCreated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function created(client: Client, data: WSEvents['ListItemCreated']) {
	const channel = (await client.channels.fetch(data.listItem.channelId)) as ListChannel;
	client.emit('listItemCreate', new ListItem(channel, data.listItem));
}

/**
 * Handle the ListItemUpdated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function updated(client: Client, data: WSEvents['ListItemUpdated']) {
	const channel = (await client.channels.fetch(data.listItem.channelId)) as ListChannel;
	client.emit('listItemEdit', new ListItem(channel, data.listItem));
}

/**
 * Handle the ListItemDeleted event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function deleted(client: Client, data: WSEvents['ListItemDeleted']) {
	const channel = (await client.channels.fetch(data.listItem.channelId)) as ListChannel;
	const listItem = new ListItem(channel, data.listItem);
	channel.items.cache.delete(listItem.id);
	client.emit('listItemDelete', listItem);
}

/**
 * Handle the ListItemCompleted event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function completed(client: Client, data: WSEvents['ListItemCompleted']) {
	const channel = (await client.channels.fetch(data.listItem.channelId)) as ListChannel;
	client.emit('listItemComplete', new ListItem(channel, data.listItem));
}

/**
 * Handle the ListItemUncompleted event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function uncompleted(client: Client, data: WSEvents['ListItemUncompleted']) {
	const channel = (await client.channels.fetch(data.listItem.channelId)) as ListChannel;
	client.emit('listItemUncomplete', new ListItem(channel, data.listItem));
}
