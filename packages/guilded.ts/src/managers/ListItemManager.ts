import { APIListItem, APIListItemPayload, APIListItemSummary, Routes } from 'guilded-api-typings';
import { BaseManager } from '.';
import { CacheCollection, ListChannel, ListItem } from '../structures';

/** A manager of list items that belong to a list channel. */
export class ListItemManager extends BaseManager<string, ListItem> {
	/** @param channel The channel that owns the list items. */
	public constructor(public readonly channel: ListChannel) {
		super(channel.client, {
			caching: channel.client.options.cacheListItems,
			maxCache: channel.client.options.maxListItemCache,
		});
	}

	/** @ignore */
	public async fetch(arg1: string | boolean = this.caching, arg2 = this.caching) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);

		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(listItemId: string, cache = this.caching) {
		let item = this.cache.get(listItemId);
		if (item) return item;

		const response = await this.client.rest.get<{ listItem: APIListItem }>(
			Routes.channelListItem(this.channel.id, listItemId),
		);

		item = new ListItem(this.channel as ListChannel, response.listItem);

		if (cache) this.cache.set(listItemId, item);

		return item;
	}

	/** @ignore */
	private async fetchMany(cache = this.caching) {
		const response = await this.client.rest.get<{ listItems: APIListItemSummary[] }>(
			Routes.channelListItems(this.channel.id),
		);

		const items = new CacheCollection<string, ListItem>();

		for (const data of response.listItems) {
			const item = new ListItem(this.channel as ListChannel, data);
			items.set(item.id, item);
			if (cache) this.cache.set(item.id, item);
		}

		return items;
	}

	/**
	 * Add a item to the list channel.
	 * @param content The content of the item.
	 * @param note The note of the item.
	 * @param cache Whether to cache the item.
	 * @returns The created item.
	 */
	public async add(content: string, note?: string, cache = this.caching) {
		const response = await this.client.rest.post<{ listItem: APIListItem }, APIListItemPayload>(
			Routes.channelListItems(this.channel.id),
			{ message: content, ...(note ? { note: { content: note } } : {}) },
		);

		const item = new ListItem(this.channel as ListChannel, response.listItem);

		if (cache) this.cache.set(item.id, item);

		return item;
	}

	/**
	 * Edit an item in the list channel.
	 * @param listItemId The id of the item to edit.
	 * @param content The new content of the item.
	 * @param note The new note of the item.
	 * @returns The edited item.
	 */
	public async edit(listItemId: string, content: string, note?: string, cache = this.caching) {
		const response = await this.client.rest.put<{ listItem: APIListItem }, APIListItemPayload>(
			Routes.channelListItem(this.channel.id, listItemId),
			{ message: content, ...(note ? { note: { content: note } } : {}) },
		);

		const item = new ListItem(this.channel as ListChannel, response.listItem);

		if (cache) this.cache.set(item.id, item);

		return item;
	}

	/**
	 * Remove an item from the list channel.
	 * @param listItemId The id of the item to remove.
	 * @returns The removed item if cached.
	 */
	public async remove(listItemId: string) {
		await this.client.rest.delete(Routes.channelListItem(this.channel.id, listItemId));

		const item = this.cache.get(listItemId);

		this.cache.delete(listItemId);

		return item;
	}

	/**
	 * Complete an item in the list channel.
	 * @param listItemId The id of the item to complete.
	 * @returns The completed item if cached.
	 */
	public async complete(listItemId: string) {
		await this.client.rest.post(Routes.channelListItemComplete(this.channel.id, listItemId));

		const item = this.cache.get(listItemId);

		this.cache.delete(listItemId);

		return item;
	}

	/**
	 * Uncomplete an item in the list channel.
	 * @param listItemId The id of the item to uncomplete.
	 * @returns The uncompleted item if cached.
	 */
	public async uncomplete(listItemId: string) {
		await this.client.rest.delete(Routes.channelListItemComplete(this.channel.id, listItemId));

		const item = this.cache.get(listItemId);

		this.cache.delete(listItemId);

		return item;
	}
}

export declare interface ListItemManager {
	/**
	 * Fetch a single item from this list channel, or cache if it's already cached.
	 * @param listItemId The ID of the item.
	 * @param cache Whether to cache the item.
	 * @returns The item.
	 */
	fetch(listItemId: string, cache?: boolean): Promise<ListItem>;

	/**
	 * Fetch multiple items from this channel.
	 * @param cache Whether to cache the items.
	 * @returns The messages.
	 */
	fetch(cache?: boolean): Promise<CacheCollection<string, ListItem>>;
}
