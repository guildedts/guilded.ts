import { APIChannel } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { ListItemManager } from '../../managers/ListItemManager';

/**
 * Represents a list channel on Guilded.
 * @example new ListChannel(client, rawChannel);
 */
export class ListChannel extends Channel {
	/**
	 * The manager of items that belong to the list channel
	 */
	readonly items: ListItemManager;

	/**
	 * @param client The client
	 * @param raw The data of the list channel
	 * @param cache Whether to cache the list channel
	 */
	constructor(client: Client, raw: APIChannel, cache?: boolean) {
		super(client, raw, cache);
		this.items = new ListItemManager(this);
	}

	/**
	 * Create a list item in the channel
	 * @param message The message of the list item
	 * @param note The note of the list item
	 * @returns The created list item
	 */
	addItem(message: string, note?: string) {
		return this.items.add(message, note);
	}
}
