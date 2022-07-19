import { APIListItem, APIListItemPayload, Routes } from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/**
 * The list item router for the Guilded REST API.
 * @example new ListItemRouter(rest);
 */
export class ListItemRouter extends BaseRouter {
	/**
	 * Fetch a list item from Guilded.
	 * @param channelId The ID of the channel the list item belongs to.
	 * @param listItemId The ID of the list item to fetch.
	 * @returns The fetched list item.
	 * @example listItems.fetch('abc', 'abc');
	 */
	fetch(channelId: string, listItemId: string): Promise<APIListItem>;
	/**
	 * Fetch list items from Guilded.
	 * @param channelId The ID of the channel the list items belong to.
	 * @returns The fetched list items.
	 * @example listItems.fetch('abc');
	 */
	fetch(channelId: string): Promise<APIListItem[]>;
	/** @ignore */
	fetch(channelId: string, listItemId?: string) {
		if (listItemId) return this.fetchSingle(channelId, listItemId);
		return this.fetchMany(channelId);
	}

	/** @ignore */
	private async fetchSingle(channelId: string, listItemId: string) {
		const { listItem } = await this.rest.get<{ listItem: APIListItem }>(
			Routes.listItem(channelId, listItemId),
		);
		return listItem;
	}

	/** @ignore */
	private async fetchMany(channelId: string) {
		const { listItems } = await this.rest.get<{ listItems: APIListItem[] }>(
			Routes.listItems(channelId),
		);
		return listItems;
	}

	/**
	 * Create a list item on Guilded.
	 * @param channelId The ID of the channel the list item belongs to.
	 * @param message The message of the list item.
	 * @param note The note of the list item.
	 * @returns The created list item.
	 * @example listItems.create('abc', 'Random item');
	 */
	async create(channelId: string, message: string, note?: string) {
		const { listItem } = await this.rest.post<{ listItem: APIListItem }, APIListItemPayload>(
			Routes.listItems(channelId),
			{ message, note: note ? { content: note } : undefined },
		);
		return listItem;
	}

	/**
	 * Edit a list item on Guilded.
	 * @param channelId The ID of the channel the list item belongs to.
	 * @param listItemId The ID of the list item to edit.
	 * @param message The message of theb list item.
	 * @param note The note of the list item.
	 * @returns The edited list item.
	 * @example listItems.edit('abc', 'abc', 'Random item');
	 */
	async edit(channelId: string, listItemId: string, message: string, note?: string) {
		const { listItem } = await this.rest.put<{ listItem: APIListItem }, APIListItemPayload>(
			Routes.listItem(channelId, listItemId),
			{ message, note: note ? { content: note } : undefined },
		);
		return listItem;
	}

	/**
	 * Delete a list item from Guilded.
	 * @param channelId The ID of the channel the list item belongs to.
	 * @param listItemId The ID of the list item to delete.
	 * @example listItems.delete('abc', 'abc');
	 */
	delete(channelId: string, listItemId: string) {
		return this.rest.post<void>(Routes.listItem(channelId, listItemId));
	}

	/**
	 * Complete a list item on Guilded.
	 * @param channelId The ID of the channel the list item belongs to.
	 * @param listItemId The ID of the list item to complete.
	 * @example listItems.complete('abc', 'abc');
	 */
	complete(channelId: string, listItemId: string) {
		return this.rest.put<void>(Routes.listItemComplete(channelId, listItemId));
	}

	/**
	 * Uncomplete a list item on Guilded.
	 * @param channelId The ID of the channel the list item belongs to.
	 * @param listItemId The ID of the list item to uncomplete.
	 * @example listItems.uncomplete('abc', 'abc');
	 */
	uncomplete(channelId: string, listItemId: string) {
		return this.rest.delete<void>(Routes.listItemComplete(channelId, listItemId));
	}
}
