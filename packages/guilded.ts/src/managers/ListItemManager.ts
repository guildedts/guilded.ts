import { BaseManager, FetchManyOptions, FetchOptions } from './BaseManager';
import { ListChannel } from '../structures/channel/ListChannel';
import { ListItem } from '../structures/listItem/ListItem';
import { Collection } from '@discordjs/collection';

/**
 * The manager of items that belong to a list channel.
 * @example new ListItemManager(channel);
 */
export class ListItemManager extends BaseManager<string, ListItem> {
	/** @param channel The list channel the items belong to. */
	constructor(public readonly channel: ListChannel) {
		super(channel.client, channel.client.options.maxListItemCache);
	}

	/**
	 * Fetch a item from the list channel, or cache.
	 * @param listItem The item to fetch.
	 * @param options The options to fetch the item with.
	 * @returns The fetched item.
	 * @example items.fetch(item);
	 */
	fetch(listItem: string | ListItem, options?: FetchOptions): Promise<ListItem>;
	/**
	 * Fetch items from the channel.
	 * @param options The options to fetch items with.
	 * @returns The fetched items.
	 * @example items.fetch();
	 */
	fetch(options?: FetchManyOptions): Promise<Collection<string, ListItem>>;
	fetch(arg1?: string | ListItem | FetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'string' || arg1 instanceof ListItem)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(listItem: string | ListItem, options?: FetchOptions) {
		listItem = listItem instanceof ListItem ? listItem.id : listItem;
		const cached = this.cache.get(listItem);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.listItems.fetch(this.channel.id, listItem);
		return new ListItem(this.channel, raw, options?.cache);
	}

	/** @ignore */
	private async fetchMany(options?: FetchManyOptions) {
		const raw = await this.client.api.listItems.fetch(this.channel.id);
		const items = new Collection<string, ListItem>();
		for (const data of raw) {
			const item = new ListItem(this.channel, data, options?.cache);
			items.set(item.id, item);
		}
		return items;
	}

	/**
	 * Add a item to the list channel.
	 * @param message The message of the item.
	 * @param note The note of the item.
	 * @returns The added item.
	 * @example items.add('Hello World!');
	 */
	async add(message: string, note?: string) {
		const raw = await this.client.api.listItems.create(this.channel.id, message, note);
		return new ListItem(this.channel, raw);
	}

	/**
	 * Edit a item in the list channel.
	 * @param listItem The item to edit.
	 * @param message The message of the item.
	 * @param note The note of the item.
	 * @returns The edited item.
	 * @example items.edit(item, 'Hello World!');
	 */
	async edit(listItem: string | ListItem, message: string, note?: string) {
		listItem = listItem instanceof ListItem ? listItem.id : listItem;
		const raw = await this.client.api.listItems.edit(this.channel.id, listItem, message, note);
		return new ListItem(this.channel, raw);
	}

	/**
	 * Remove a item in the list channel.
	 * @param listItem The item to remove.
	 * @example items.remove(item);
	 */
	remove(listItem: string | ListItem) {
		listItem = listItem instanceof ListItem ? listItem.id : listItem;
		return this.client.api.listItems.delete(this.channel.id, listItem);
	}

	/**
	 * Complete a item in the list channel.
	 * @param listItem The item to complete.
	 * @example items.complete(item);
	 */
	complete(listItem: string | ListItem) {
		listItem = listItem instanceof ListItem ? listItem.id : listItem;
		return this.client.api.listItems.complete(this.channel.id, listItem);
	}

	/**
	 * Uncomplete a item in the list channel.
	 * @param listItem The item to uncomplete.
	 * @example items.uncomplete(item);
	 */
	uncomplete(listItem: string | ListItem) {
		listItem = listItem instanceof ListItem ? listItem.id : listItem;
		return this.client.api.listItems.uncomplete(this.channel.id, listItem);
	}
}
