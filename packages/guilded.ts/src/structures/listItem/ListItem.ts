import { APIListItem, APIListItemSummary, APIMentions } from 'guilded-api-typings';
import { Base } from '../Base';
import { ListItemNote } from './ListItemNote';
import { ListChannel } from '../channel/ListChannel';
import { FetchOptions } from '../../managers/BaseManager';

/**
 * Represents a list item on Guilded
 */
export class ListItem extends Base {
	/**
	 * The ID of the server
	 */
	readonly serverId: string;
	/**
	 * The ID of the channel
	 */
	readonly channelId: string;
	/**
	 * The message of the list item
	 */
	readonly message: string;
	/**
	 * The mentions of the list item
	 */
	readonly mentions?: APIMentions;
	/**
	 * When the list item was created
	 */
	readonly createdAt: Date;
	/**
	 * The ID of the user that created the list item
	 *
	 * **Note:** If this list item has {@link createdByWebhookId}, this field will still be populated, but can be ignored
	 */
	readonly createdBy: string;
	/**
	 * The ID of the webhook that created the list item, if it was created by a webhook
	 */
	readonly createdByWebhookId?: string;
	/**
	 * When the list item was edited, if relevant
	 */
	readonly editedAt?: Date;
	/**
	 * The ID of the user that edited the list item, if relevant
	 */
	readonly editedBy?: string;
	/**
	 * The ID of the parent list item, if the list item is nested
	 */
	readonly parentId?: string;
	/**
	 * When the list item was completed, if relevant
	 */
	readonly completedAt?: Date;
	/**
	 * The ID of the user that completed the list item
	 */
	readonly completedBy?: string;
	/**
	 * The note of the list item
	 */
	readonly note?: ListItemNote;

	/**
	 * @param channel The list channel
	 * @param raw The data of the list item
	 * @param cache Whether to cache the list item
	 */
	public constructor(
		public readonly channel: ListChannel,
		public readonly raw: APIListItem | APIListItemSummary,
		cache = channel.client.options.cacheListItems ?? true,
	) {
		super(channel.client, raw.id);
		this.serverId = raw.serverId;
		this.channelId = raw.channelId;
		this.message = raw.message;
		this.mentions = raw.mentions;
		this.createdAt = new Date(raw.createdAt);
		this.createdBy = raw.createdBy;
		this.createdByWebhookId = raw.createdByWebhookId;
		this.editedAt = raw.updatedAt ? new Date(raw.updatedAt) : undefined;
		this.editedBy = raw.updatedBy;
		this.parentId = raw.parentListItemId;
		this.completedAt = raw.completedAt ? new Date(raw.completedAt) : undefined;
		this.completedBy = raw.completedBy;
		this.note = raw.note ? new ListItemNote(this, raw.note) : undefined;
		if (cache) channel.items.cache.set(this.id, this);
	}

	/**
	 * Whether the list item is cached
	 */
	get isCached() {
		return this.channel.items.cache.has(this.id);
	}

	/**
	 * The server
	 */
	get server() {
		return this.channel.server;
	}

	/**
	 * The timestamp of when the list item was created
	 */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/**
	 * The server member that created the list item
	 */
	get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/**
	 * The webhook that created the list item, if it was created by a webhook
	 */
	get webhook() {
		return this.createdByWebhookId
			? this.channel.webhooks.cache.get(this.createdByWebhookId)
			: undefined;
	}

	/**
	 * The ID of the user that created the list item
	 */
	get authorId() {
		return this.createdByWebhookId || this.createdBy;
	}

	/**
	 * The timestamp of when the list item was edited, if relevant
	 */
	get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/**
	 * The server member that edited the list item, if relevant
	 */
	get editor() {
		return this.editedBy ? this.server?.members.cache.get(this.editedBy) : undefined;
	}

	/**
	 * The parent list item, if the list item is nested
	 */
	get parent() {
		return this.parentId ? this.channel.items.cache.get(this.parentId) : undefined;
	}

	/**
	 * The timestamp of when the list item was completed, if relevant
	 */
	get completedTimestamp() {
		return this.completedAt?.getTime();
	}

	/**
	 * The server member that completed the list item, if relevant
	 */
	get completer() {
		return this.completedBy ? this.server?.members.cache.get(this.completedBy) : undefined;
	}

	/**
	 * Whether the list item is completed
	 */
	get isCompleted() {
		return !!this.completedAt;
	}

	/**
	 * Whether the list item is editable
	 */
	get isEditable() {
		return this.createdBy === this.client.user?.id;
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
	 * Fetch the server
	 * @param options The options to fetch the server with
	 * @returns The fetched server
	 */
	fetchServer(options?: FetchOptions) {
		return this.channel.fetchServer(options);
	}

	/**
	 * Fetch the server member that created the list item
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Fetch the webhook that created the list item
	 * @param options The options to fetch the webhook with
	 * @returns The fetched webhook
	 */
	fetchWebhook(options?: FetchOptions) {
		return this.createdByWebhookId
			? this.channel.webhooks.fetch(this.createdByWebhookId, options)
			: undefined;
	}

	/**
	 * Fetch the server member that edited the list item
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	async fetchEditor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return this.editedBy ? server.members.fetch(this.editedBy, options) : undefined;
	}

	/**
	 * Fetch the parent list item
	 * @param options The options to fetch the list item with
	 * @returns The fetched list item
	 */
	async fetchParent(options?: FetchOptions) {
		return this.parentId ? this.channel.items.fetch(this.parentId, options) : undefined;
	}

	/**
	 * Fetch the server member that completed the list item
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	async fetchCompleter(options?: FetchOptions) {
		const server = await this.fetchServer();
		return this.completedBy ? server.members.fetch(this.completedBy, options) : undefined;
	}

	/**
	 * Edit the list item
	 * @param message The message of the list item
	 * @param note The note of the list item
	 * @returns The edited list item
	 */
	edit(message: string, note?: string) {
		return this.channel.items.edit(this, message, note) as Promise<this>;
	}

	/**
	 * Remove the list item
	 * @returns The removed list item
	 */
	async remove() {
		await this.channel.items.remove(this);
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
