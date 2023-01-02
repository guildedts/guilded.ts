import {
	APIListItem,
	RESTPostListItemJSONBody,
	RESTPutListItemJSONBody,
	Routes,
} from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/**
 * The list item router for the Guilded REST API
 */
export class ListItemRouter extends BaseRouter {
	/**
	 * Fetch a list item from Guilded
	 * @param channelId The ID of the channel
	 * @param listItemId The ID of the list item
	 * @returns The fetched list item
	 */
	fetch(channelId: string, listItemId: string): Promise<APIListItem>;
	/**
	 * Fetch list items from Guilded
	 * @param channelId The ID of the channel
	 * @returns The fetched list items
	 */
	fetch(channelId: string): Promise<APIListItem[]>;
	fetch(channelId: string, listItemId?: string) {
		if (listItemId) return this.fetchSingle(channelId, listItemId);
		return this.fetchMany(channelId);
	}

	private async fetchSingle(channelId: string, listItemId: string) {
		const { listItem } = await this.rest.get<{ listItem: APIListItem }>(
			Routes.listItem(channelId, listItemId),
		);
		return listItem;
	}

	private async fetchMany(channelId: string) {
		const { listItems } = await this.rest.get<{ listItems: APIListItem[] }>(
			Routes.listItems(channelId),
		);
		return listItems;
	}

	/**
	 * Create a list item on Guilded
	 * @param channelId The ID of the channel
	 * @param message The message of the list item
	 * @param note The note of the list item
	 * @returns The created list item
	 */
	async create(channelId: string, message: string, note?: string) {
		const { listItem } = await this.rest.post<
			{ listItem: APIListItem },
			RESTPostListItemJSONBody
		>(Routes.listItems(channelId), { message, note: note ? { content: note } : undefined });
		return listItem;
	}

	/**
	 * Edit a list item on Guilded
	 * @param channelId The ID of the channel
	 * @param listItemId The ID of the list item
	 * @param message The message of the list item
	 * @param note The note of the list item
	 * @returns The edited list item
	 */
	async edit(channelId: string, listItemId: string, message: string, note?: string) {
		const { listItem } = await this.rest.put<
			{ listItem: APIListItem },
			RESTPutListItemJSONBody
		>(Routes.listItem(channelId, listItemId), {
			message,
			note: note ? { content: note } : undefined,
		});
		return listItem;
	}

	/**
	 * Delete a list item from Guilded
	 * @param channelId The ID of the channel
	 * @param listItemId The ID of the list item
	 */
	delete(channelId: string, listItemId: string) {
		return this.rest.post<void>(Routes.listItem(channelId, listItemId));
	}

	/**
	 * Complete a list item on Guilded
	 * @param channelId The ID of the channel
	 * @param listItemId The ID of the list item
	 */
	complete(channelId: string, listItemId: string) {
		return this.rest.put<void>(Routes.listItemComplete(channelId, listItemId));
	}

	/**
	 * Uncomplete a list item on Guilded
	 * @param channelId The ID of the channel
	 * @param listItemId The ID of the list item
	 */
	uncomplete(channelId: string, listItemId: string) {
		return this.rest.delete<void>(Routes.listItemComplete(channelId, listItemId));
	}
}
