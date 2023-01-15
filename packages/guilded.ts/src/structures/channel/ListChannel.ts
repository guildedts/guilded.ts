import { APIChannel } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { ListItemManager } from '../../managers/ListItemManager';
import { ChannelWebhookManager } from '../../managers/channel/ChannelWebhookManager';

/**
 * Represents a list channel on Guilded
 */
export class ListChannel extends Channel {
	/**
	 * The manager for webhooks
	 */
	readonly webhooks: ChannelWebhookManager;
	/**
	 * The manager for list items
	 */
	readonly items: ListItemManager;

	/**
	 * @param client The client
	 * @param data The data of the list channel
	 * @param cache Whether to cache the list channel
	 */
	constructor(client: Client, data: APIChannel, cache?: boolean) {
		super(client, data, cache);
		this.webhooks = new ChannelWebhookManager(this);
		this.items = new ListItemManager(this);
	}
}
