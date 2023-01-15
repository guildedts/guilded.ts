import { BaseManager, FetchManyOptions, FetchOptions } from './BaseManager';
import { ListChannel } from '../structures/channel/ListChannel';
import { ListItem } from '../structures/listItem/ListItem';
import { Collection } from '@discordjs/collection';

/**
 * The manager for list items
 */
export class ListItemManager extends BaseManager<string, ListItem> {
	/**
	 * @param channel The list channel
	 */
	constructor(public readonly channel: ListChannel) {
		super(channel.client, channel.client.options.maxListItemCache);
	}

	/**
	 * Fetch a list item from the channel
	 * @param listItem The list item
	 * @param options The options to fetch the list item with
	 * @returns The fetched list item
	 */
	fetch(listItem: string | ListItem, options?: FetchOptions): Promise<ListItem>;
	/**
	 * Fetch list items from the channel
	 * @param options The options to fetch the list items with
	 * @returns The fetched list items
	 */
	fetch(options?: FetchManyOptions): Promise<Collection<string, ListItem>>;
	fetch(arg1?: string | ListItem | FetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'string' || arg1 instanceof ListItem)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	private async fetchSingle(listItem: string | ListItem, options?: FetchOptions) {
		listItem = listItem instanceof ListItem ? listItem.id : listItem;
		const cached = this.cache.get(listItem);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.listItems.fetch(this.channel.id, listItem);
		return new ListItem(this.channel, raw, options?.cache);
	}

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
	 * Create a list item to the channel
	 * @param content The content of the list item
	 * @param note The note of the list item
	 * @returns The created list item
	 */
	async create(content: string, note?: string) {
		const raw = await this.client.api.listItems.create(this.channel.id, content, note);
		return new ListItem(this.channel, raw);
	}

	/**
	 * Update a list item in the channel
	 * @param listItem The list item
	 * @param content The content of the list item
	 * @param note The note of the list item
	 * @returns The updated list item
	 */
	async update(listItem: string | ListItem, content: string, note?: string) {
		listItem = listItem instanceof ListItem ? listItem.id : listItem;
		const raw = await this.client.api.listItems.edit(this.channel.id, listItem, content, note);
		return new ListItem(this.channel, raw);
	}

	/**
	 * Delete a list item from the channel
	 * @param listItem The list item
	 */
	delete(listItem: string | ListItem) {
		listItem = listItem instanceof ListItem ? listItem.id : listItem;
		return this.client.api.listItems.delete(this.channel.id, listItem);
	}

	/**
	 * Complete a list item in the channel
	 * @param listItem The list item
	 */
	complete(listItem: string | ListItem) {
		listItem = listItem instanceof ListItem ? listItem.id : listItem;
		return this.client.api.listItems.complete(this.channel.id, listItem);
	}

	/**
	 * Uncomplete a list item in the channel
	 * @param listItem The list item
	 */
	uncomplete(listItem: string | ListItem) {
		listItem = listItem instanceof ListItem ? listItem.id : listItem;
		return this.client.api.listItems.uncomplete(this.channel.id, listItem);
	}
}
