import { APIChannel } from 'guilded-api-typings';
import { Channel, Client } from '..';
import { ListItemManager } from '../../managers';

/** Represents a list channel on Guilded. */
export class ListChannel extends Channel {
	/** The type of this channel. */
	public declare readonly type: 'list';

	/** A manager of list items that belong to this list channel. */
	public readonly items: ListItemManager;

	/**
	 * @param client The client that owns this list channel.
	 * @param data The data of the list channel.
	 */
	public constructor(client: Client, data: APIChannel) {
		super(client, data);

		this.items = new ListItemManager(this);
	}

	/**
	 * Add a new list item to this list channel.
	 * @param content The content of the list item.
	 * @param note The note of the list item.
	 * @returns The created list item.
	 */
	public async addItem(content: string, note?: string) {
		return this.items.add(content, note);
	}
}
