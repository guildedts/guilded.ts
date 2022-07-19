import { APIListItem, APIListItemSummary, APIMentions } from 'guilded-api-typings';
import { Base } from '../Base';
import { Note } from './Note';
import { ListChannel } from '../channel/ListChannel';
import { FetchOptions } from '../../managers/BaseManager';

/**
 * Represents a list item on Guilded.
 * @example new ListItem(channel, rawItem);
 */
export class ListItem extends Base {
	/** The ID of the server the list item belongs to. */
	readonly serverId: string;
	/** The ID of the channel the list item belongs to. */
	readonly channelId: string;
	/** The message of the list item. */
	readonly message: string;
	/** The mentions of the list item. */
	readonly mentions?: APIMentions;
	/** The date the list item was created. */
	readonly createdAt: Date;
	/** The ID of the user that created the list item. */
	readonly createdBy: string;
	/** The ID of the webhook that created the list item. */
	readonly createdByWebhookId?: string;
	/** The date the list item was edited. */
	readonly editedAt?: Date;
	/** The ID of the user that edited the list item. */
	readonly editedBy?: string;
	/** The ID of the list item the list item belongs to. */
	readonly parentId?: string;
	/** The date the list item was completed. */
	readonly completedAt?: Date;
	/** The ID of the user that completed the list item. */
	readonly completedBy?: string;
	/** The note of the list item. */
	readonly note?: Note;

	/**
	 * @param channel The list channel the item belongs to.
	 * @param raw The raw data of the list item.
	 * @param cache Whether to cache the list item.
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
		this.note = raw.note ? new Note(this, raw.note) : undefined;
		if (cache) channel.items.cache.set(this.id, this);
	}

	/** Whether the list item is cached. */
	get isCached() {
		return this.channel.items.cache.has(this.id);
	}

	/** The server the list item belongs to. */
	get server() {
		return this.channel.server;
	}

	/** The timestamp the list item was created. */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The server member that created the list item. */
	get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/** The webhook that created the list item. */
	get webhook() {
		return this.createdByWebhookId
			? this.channel.webhooks.cache.get(this.createdByWebhookId)
			: undefined;
	}

	/** The ID of the user that created the list item. */
	get authorId() {
		return this.createdByWebhookId || this.createdBy;
	}

	/** The timestamp the list item was edited. */
	get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/** The server member that edited the list item. */
	get editor() {
		return this.editedBy ? this.server?.members.cache.get(this.editedBy) : undefined;
	}

	/** The list item the list item belongs to. */
	get parent() {
		return this.parentId ? this.channel.items.cache.get(this.parentId) : undefined;
	}

	/** The timestamp the list item was completed. */
	get completedTimestamp() {
		return this.completedAt?.getTime();
	}

	/** The server member that completed the list item. */
	get completer() {
		return this.completedBy ? this.server?.members.cache.get(this.completedBy) : undefined;
	}

	/** Whether the list item is completed. */
	get isCompleted() {
		return !!this.completedAt;
	}

	/** Whether the list item is editable. */
	get isEditable() {
		return this.createdBy === this.client.user?.id;
	}

	/**
	 * Fetch the list item.
	 * @param options The options to fetch the list item with.
	 * @returns The fetched list item.
	 * @example listItem.fetch();
	 */
	fetch(options?: FetchOptions) {
		return this.channel.items.fetch(this, options) as Promise<this>;
	}

	/**
	 * Fetch the server the list item belongs to.
	 * @param options The options to fetch the server with.
	 * @returns The fetched server.
	 * @example listItem.fetchServer();
	 */
	fetchServer(options?: FetchOptions) {
		return this.channel.fetchServer(options);
	}

	/**
	 * Fetch the server member that created the list item.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example listItem.fetchAuthor();
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Fetch the webhook that created the list item.
	 * @param options The options to fetch the webhook with.
	 * @returns The fetched webhook.
	 * @example listItem.fetchWebhook();
	 */
	fetchWebhook(options?: FetchOptions) {
		return this.createdByWebhookId
			? this.channel.webhooks.fetch(this.createdByWebhookId, options)
			: undefined;
	}

	/**
	 * Fetch the server member that edited the list item.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example listItem.fetchEditor();
	 */
	async fetchEditor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return this.editedBy ? server.members.fetch(this.editedBy, options) : undefined;
	}

	/**
	 * Fetch the list item the list item belongs to.
	 * @param options The options to fetch the list item with.
	 * @returns The fetched list item.
	 * @example listItem.fetchParent();
	 */
	async fetchParent(options?: FetchOptions) {
		return this.parentId ? this.channel.items.fetch(this.parentId, options) : undefined;
	}

	/**
	 * Fetch the server member that completed the list item.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example listItem.fetchCompleter();
	 */
	async fetchCompleter(options?: FetchOptions) {
		const server = await this.fetchServer();
		return this.completedBy ? server.members.fetch(this.completedBy, options) : undefined;
	}

	/**
	 * Edit the list item.
	 * @param message The message of the list item.
	 * @param note The note of the list item.
	 * @returns The edited list item.
	 * @example listItem.edit('Hello World!');
	 */
	edit(message: string, note?: string) {
		return this.channel.items.edit(this, message, note) as Promise<this>;
	}

	/**
	 * Remove the list item.
	 * @returns The removed list item.
	 * @example listItem.remove();
	 */
	async remove() {
		await this.channel.items.remove(this);
		return this;
	}

	/**
	 * Complete the list item.
	 * @returns The completed list item.
	 * @example listItem.complete();
	 */
	async complete() {
		await this.channel.items.complete(this);
		return this;
	}

	/**
	 * Uncomplete the list item.
	 * @returns The uncompleted list item.
	 * @example listItem.uncomplete();
	 */
	async uncomplete() {
		await this.channel.items.uncomplete(this);
		return this;
	}
}
