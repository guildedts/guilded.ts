import { APIListItem, APIListItemPayload, APIListItemSummary, Routes } from 'guilded-api-typings';
import { BaseManager } from './BaseManager';
import { CacheCollection } from '../structures/CacheCollection';
import { ListChannel } from '../structures/channel/ListChannel';
import { ListItem } from '../structures/listItem/ListItem';

/** A manager of items that belong to a list channel. */
export class ListItemManager extends BaseManager<string, ListItem> {
	/** @param channel The list channel that owns the items. */
	public constructor(public readonly channel: ListChannel) {
		super(channel.client, channel.client.options.maxListItemCache);
	}

	/** @ignore */
	public async fetch(
		arg1: string | boolean = this.client.options.cacheListItems ?? true,
		arg2 = this.client.options.cacheListItems ?? true,
	) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(listItemId: string, cache: boolean) {
		let item = this.cache.get(listItemId);
		if (item) return item;
		const response = await this.client.rest.get<{ listItem: APIListItem }>(
			Routes.listItem(this.channel.id, listItemId),
		);
		item = new ListItem(this.channel as ListChannel, response.listItem);
		if (cache) this.cache.set(listItemId, item);
		return item;
	}

	/** @ignore */
	private async fetchMany(cache: boolean) {
		const response = await this.client.rest.get<{ listItems: APIListItemSummary[] }>(
			Routes.listItems(this.channel.id),
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
	 * @param content The content to add the item with.
	 * @param note The note to add the item with.
	 * @returns The added item.
	 */
	public async add(content: string, note?: string) {
		const response = await this.client.rest.post<{ listItem: APIListItem }, APIListItemPayload>(
			Routes.listItems(this.channel.id),
			{ message: content, ...(note ? { note: { content: note } } : {}) },
		);
		return new ListItem(this.channel, response.listItem);
	}

	/**
	 * Edit a item in the list channel.
	 * @param listItemId The ID of the item to edit.
	 * @param content The content to edit the item with.
	 * @param note The note to edit the item with.
	 * @returns The edited item.
	 */
	public async edit(listItemId: string, content: string, note?: string) {
		const response = await this.client.rest.put<{ listItem: APIListItem }, APIListItemPayload>(
			Routes.listItem(this.channel.id, listItemId),
			{ message: content, ...(note ? { note: { content: note } } : {}) },
		);
		return new ListItem(this.channel, response.listItem);
	}

	/**
	 * Remove a item in the list channel.
	 * @param listItemId The ID of the item to remove.
	 */
	public async remove(listItemId: string) {
		await this.client.rest.delete(Routes.listItem(this.channel.id, listItemId));
	}

	/**
	 * Complete a item in the list channel.
	 * @param listItemId The ID of the item to complete.
	 */
	public async complete(listItemId: string) {
		await this.client.rest.post(Routes.listItemComplete(this.channel.id, listItemId));
	}

	/**
	 * Uncomplete a item in the list channel.
	 * @param listItemId The ID of the item to uncomplete.
	 */
	public async uncomplete(listItemId: string) {
		await this.client.rest.delete(Routes.listItemComplete(this.channel.id, listItemId));
	}
}

export declare interface ListItemManager {
	/**
	 * Fetch a single item from the list channel, or cache.
	 * @param listItemId The ID of the item to fetch.
	 * @param cache Whether to cache the fetched item.
	 * @returns The fetched item.
	 */
	fetch(listItemId: string, cache?: boolean): Promise<ListItem>;

	/**
	 * Fetch multiple items from the channel.
	 * @param cache Whether to cache the fetched items.
	 * @returns The fetched items.
	 */
	fetch(cache?: boolean): Promise<CacheCollection<string, ListItem>>;
}
