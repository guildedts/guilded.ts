import { BaseManager } from './BaseManager';
import { CacheCollection } from '../structures/CacheCollection';
import { ListChannel } from '../structures/channel/ListChannel';
import { ListItem } from '../structures/listItem/ListItem';

/** The manager of items that belong to a list channel. */
export class ListItemManager extends BaseManager<string, ListItem> {
	/** @param channel The list channel the items belong to. */
	public constructor(public readonly channel: ListChannel) {
		super(channel.client, channel.client.options.maxListItemCache);
	}

	/**
	 * Fetch a item from the list channel, or cache.
	 * @param listItemId The ID of the item to fetch.
	 * @param cache Whether to cache the fetched item.
	 * @returns The fetched item.
	 */
	public fetch(listItemId: string, cache?: boolean): Promise<ListItem>;
	/**
	 * Fetch items from the channel.
	 * @param cache Whether to cache the fetched items.
	 * @returns The fetched items.
	 */
	public fetch(cache?: boolean): Promise<CacheCollection<string, ListItem>>;
	/** @ignore */
	public async fetch(arg1?: string | boolean, arg2?: boolean) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(listItemId: string, cache?: boolean) {
		const item = this.cache.get(listItemId);
		if (item) return item;
		const raw = await this.client.api.listItems.fetch(this.channel.id, listItemId);
		return new ListItem(this.channel, raw, cache);
	}

	/** @ignore */
	private async fetchMany(cache?: boolean) {
		const raw = await this.client.api.listItems.fetch(this.channel.id);
		const items = new CacheCollection<string, ListItem>();
		for (const data of raw) {
			const item = new ListItem(this.channel, data, cache);
			items.set(item.id, item);
		}
		return items;
	}

	/**
	 * Add a item to the list channel.
	 * @param message The message of the item.
	 * @param note The note of the item.
	 * @returns The added item.
	 */
	public async add(message: string, note?: string) {
		const raw = await this.client.api.listItems.create(this.channel.id, message, note);
		return new ListItem(this.channel, raw);
	}

	/**
	 * Edit a item in the list channel.
	 * @param listItemId The ID of the item to edit.
	 * @param message The message of the item.
	 * @param note The note of the item.
	 * @returns The edited item.
	 */
	public async edit(listItemId: string, message: string, note?: string) {
		const raw = await this.client.api.listItems.edit(
			this.channel.id,
			listItemId,
			message,
			note,
		);
		return new ListItem(this.channel, raw);
	}

	/**
	 * Remove a item in the list channel.
	 * @param listItemId The ID of the item to remove.
	 */
	public remove(listItemId: string) {
		return this.client.api.listItems.delete(this.channel.id, listItemId);
	}

	/**
	 * Complete a item in the list channel.
	 * @param listItemId The ID of the item to complete.
	 */
	public complete(listItemId: string) {
		return this.client.api.listItems.complete(this.channel.id, listItemId);
	}

	/**
	 * Uncomplete a item in the list channel.
	 * @param listItemId The ID of the item to uncomplete.
	 */
	public uncomplete(listItemId: string) {
		return this.client.api.listItems.uncomplete(this.channel.id, listItemId);
	}
}
