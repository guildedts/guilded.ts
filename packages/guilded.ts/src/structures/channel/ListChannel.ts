import { APIChannel } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { ListItemManager } from '../../managers/ListItemManager';

/** Represents a list channel on Guilded. */
export class ListChannel extends Channel {
	/** The type of channel. */
	public declare readonly type: 'list';

	/** A manager of items that belong to the list channel. */
	public readonly items: ListItemManager;

	/**
	 * @param client The client that owns the list channel.
	 * @param raw The raw data of the list channel.
	 */
	constructor(client: Client, raw: APIChannel) {
		super(client, raw);
		this.items = new ListItemManager(this);
	}

	/**
	 * Add a new list item to this list channel.
	 * @param content The content of the list item.
	 * @param note The note of the list item.
	 * @returns The created list item.
	 */
	public addItem(content: string, note?: string) {
		return this.items.add(content, note);
	}
}
