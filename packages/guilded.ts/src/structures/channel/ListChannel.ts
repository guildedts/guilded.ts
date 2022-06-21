import { APIChannel, APIChannelType } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { ListItemManager } from '../../managers/ListItemManager';

/** Represents a list channel on Guilded. */
export class ListChannel extends Channel {
	public declare readonly type: APIChannelType.List;

	/** The manager of items that belong to the list channel. */
	public readonly items: ListItemManager;

	/**
	 * @param client The client the list channel belongs to.
	 * @param raw The raw data of the list channel.
	 * @param cache Whether to cache the list channel.
	 */
	constructor(client: Client, raw: APIChannel, cache?: boolean) {
		super(client, raw, cache);
		this.items = new ListItemManager(this);
	}

	/**
	 * Create a item in the list channel.
	 * @param message The message of the list item.
	 * @param note The note of the list item.
	 * @returns The created list item.
	 */
	public addItem(message: string, note?: string) {
		return this.items.add(message, note);
	}
}
