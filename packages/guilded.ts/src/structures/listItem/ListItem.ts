import { APIListItem, APIListItemSummary } from 'guilded-api-typings';
import { Base } from '../Base';
import { ListItemNote } from './ListItemNote';
import { ListChannel } from '../channel/ListChannel';
import { FetchOptions } from '../../managers/BaseManager';

/**
 * Represents a list item on Guilded
 */
export class ListItem extends Base {
	/**
	 * The note of the list item
	 */
	readonly note: ListItemNote | null;

	/**
	 * @param channel The list channel
	 * @param data The data of the list item
	 * @param cache Whether to cache the list item
	 */
	public constructor(
		public readonly channel: ListChannel,
		public readonly data: APIListItem | APIListItemSummary,
		cache = channel.client.options.cacheListItems ?? true,
	) {
		super(channel.client);
		this.note = data.note ? new ListItemNote(this, data.note) : null;
		if (cache) channel.items.cache.set(this.id, this);
	}

	/**
	 * Whether the list item is cached
	 */
	get isCached() {
		return this.channel.items.cache.has(this.id);
	}

	/**
	 * The ID of the list item
	 */
	get id() {
		return this.data.id;
	}

	/**
	 * The content of the list item
	 */
	get content() {
		return this.data.message;
	}

	/**
	 * The mentions of the list item
	 */
	get mentions() {
		return this.data.mentions ?? {};
	}

	/**
	 * When the list item was created
	 */
	get createdAt() {
		return new Date(this.data.createdAt);
	}

	/**
	 * The ID of the user that created the list item, if it was created by a user
	 */
	get creatorId() {
		return !this.webhookId ? this.data.createdBy : null;
	}

	/**
	 * The user that created the list item, if it was created by a user
	 */
	get creator() {
		return this.creatorId ? this.client.users.cache.get(this.creatorId) ?? null : null;
	}

	/**
	 * Whether the client user created the list item
	 */
	get isCreator() {
		return this.creatorId === this.client.user?.id;
	}

	/**
	 * The ID of the webhook that created the list item, if it was created by a webhook
	 */
	get webhookId() {
		return this.data.createdByWebhookId ?? null;
	}

	/**
	 * The webhook that created the list item, if it was created by a webhook
	 */
	get webhook() {
		return this.webhookId ? this.channel.webhooks.cache.get(this.webhookId) ?? null : null;
	}

	/**
	 * When the list item was updated, if relevant
	 */
	get updatedAt() {
		return this.data.updatedAt ? new Date(this.data.updatedAt) : null;
	}

	/**
	 * The ID of the user that updated the list item, if relevant
	 */
	get updaterId() {
		return this.data.updatedBy ?? null;
	}

	/**
	 * The user that updated the list item, if relevant
	 */
	get updater() {
		return this.updaterId ? this.client.users.cache.get(this.updaterId) ?? null : null;
	}

	/**
	 * Whether the client user updated the list item
	 */
	get isUpdater() {
		return this.updaterId === this.client.user?.id;
	}

	/**
	 * Whether the list item is updated
	 */
	get isUpdated() {
		return !!this.updatedAt;
	}

	/**
	 * The ID of the parent list item, if the list item is nested
	 */
	get parentId() {
		return this.data.parentListItemId ?? null;
	}

	/**
	 * The parent list item, if the list item is nested
	 */
	get parent() {
		return this.parentId ? this.channel.items.cache.get(this.parentId) ?? null : null;
	}

	/**
	 * Whether the list item is nested
	 */
	get isNested() {
		return !!this.parentId;
	}

	/**
	 * When the list item was completed, if relevant
	 */
	get completedAt() {
		return this.data.completedAt ? new Date(this.data.completedAt) : null;
	}

	/**
	 * The ID of the user that completed the list item, if relevant
	 */
	get completerId() {
		return this.data.completedBy ?? null;
	}

	/**
	 * The user that completed the list item, if relevant
	 */
	get completer() {
		return this.completerId ? this.client.users.cache.get(this.completerId) ?? null : null;
	}

	/**
	 * Whether the client user completed the list item
	 */
	get isCompleter() {
		return this.completerId === this.client.user?.id;
	}

	/**
	 * Whether the list item is completed
	 */
	get isCompleted() {
		return !!this.completedAt;
	}

	/**
	 * Fetch the list item
	 * @param options The options to fetch the list item with
	 * @returns The fetched list item
	 */
	fetch(options?: FetchOptions) {
		return this.channel.items.fetch(this, options) as Promise<this>;
	}

	/**
	 * Fetch the user that created the list item
	 * @returns The fetched user, if created by one
	 */
	async fetchCreator() {
		return this.creatorId
			? this.client.users.fetch(this.channel.serverId, this.creatorId)
			: null;
	}

	/**
	 * Fetch the webhook that created the list item
	 * @param options The options to fetch the webhook with
	 * @returns The fetched webhook, if created by one
	 */
	async fetchWebhook(options?: FetchOptions) {
		return this.webhookId ? this.channel.webhooks.fetch(this.webhookId, options) : null;
	}

	/**
	 * Fetch the user that updated the list item
	 * @returns The fetched user, if relevant
	 */
	async fetchUpdater() {
		return this.updaterId
			? this.client.users.fetch(this.channel.serverId, this.updaterId) ?? null
			: null;
	}

	/**
	 * Fetch the parent list item
	 * @param options The options to fetch the list item with
	 * @returns The fetched list item, if relevant
	 */
	async fetchParent(options?: FetchOptions) {
		return this.parentId ? this.channel.items.fetch(this.parentId, options) : null;
	}

	/**
	 * Fetch the user that completed the list item
	 * @returns The fetched user, if relevant
	 */
	async fetchCompleter() {
		return this.completerId
			? this.client.users.fetch(this.channel.serverId, this.completerId)
			: null;
	}

	/**
	 * Update the list item
	 * @param content The content of the list item
	 * @param note The note of the list item
	 * @returns The updated list item
	 */
	update(content: string, note?: string) {
		return this.channel.items.update(this, content, note) as Promise<this>;
	}

	/**
	 * Delete the list item
	 * @returns The deleted list item
	 */
	async delete() {
		await this.channel.items.delete(this);
		return this;
	}

	/**
	 * Complete the list item
	 * @returns The completed list item
	 */
	async complete() {
		await this.channel.items.complete(this);
		return this;
	}

	/**
	 * Uncomplete the list item
	 * @returns The uncompleted list item
	 */
	async uncomplete() {
		await this.channel.items.uncomplete(this);
		return this;
	}
}
