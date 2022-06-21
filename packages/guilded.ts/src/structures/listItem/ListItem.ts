import { APIListItem, APIListItemSummary, APIMentions } from 'guilded-api-typings';
import { Base } from '../Base';
import { Note } from './Note';
import { ListChannel } from '../channel/ListChannel';

/** Represents a list item on Guilded. */
export class ListItem extends Base {
	/** The ID of the server the list item belongs to. */
	public readonly serverId: string;
	/** The ID of the channel the list item belongs to. */
	public readonly channelId: string;
	/** The message of the list item. */
	public readonly message: string;
	/** The mentions of the list item. */
	public readonly mentions?: APIMentions;
	/** The date the list item was created. */
	public readonly createdAt: Date;
	/** The ID of the user that created the list item. */
	public readonly createdBy: string;
	/** The ID of the webhook that created the list item. */
	public readonly createdByWebhookId?: string;
	/** The date the list item was edited. */
	public readonly editedAt?: Date;
	/** The ID of the user that edited the list item. */
	public readonly editedBy?: string;
	/** The ID of the list item the list item belongs to. */
	public readonly parentId?: string;
	/** The date the list item was completed. */
	public readonly completedAt?: Date;
	/** The ID of the user that completed the list item. */
	public readonly completedBy?: string;
	/** The note of the list item. */
	public readonly note?: Note;

	/**
	 * @param channel The list channel the item belongs to.
	 * @param raw The raw data of the list item.
	 * @param cache Whether to cache the list item.
	 */
	public constructor(
		public readonly channel: ListChannel,
		public readonly raw: APIListItem | APIListItemSummary,
		cache = channel.client.options.cacheListItems ?? true
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
	public get isCached() {
		return this.channel.items.cache.has(this.id);
	}

	/** The server the list item belongs to. */
	public get server() {
		return this.channel.server;
	}

	/** The timestamp the list item was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The server member that created the list item. */
	public get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/** The webhook that created the list item. */
	public get webhook() {
		return this.createdByWebhookId
			? this.channel.webhooks.cache.get(this.createdByWebhookId)
			: undefined;
	}

	/** The ID of the user that created the list item. */
	public get authorId() {
		return this.createdByWebhookId || this.createdBy;
	}

	/** The timestamp the list item was edited. */
	public get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/** The server member that edited the list item. */
	public get editor() {
		return this.editedBy ? this.server?.members.cache.get(this.editedBy) : undefined;
	}

	/** The list item the list item belongs to. */
	public get parent() {
		return this.parentId ? this.channel.items.cache.get(this.parentId) : undefined;
	}

	/** The timestamp the list item was completed. */
	public get completedTimestamp() {
		return this.completedAt?.getTime();
	}

	/** The server member that completed the list item. */
	public get completer() {
		return this.completedBy ? this.server?.members.cache.get(this.completedBy) : undefined;
	}

	/** Whether the list item is completed. */
	public get isCompleted() {
		return !!this.completedAt;
	}

	/** Whether the list item is editable. */
	public get isEditable() {
		return this.createdBy === this.client.user?.id;
	}

	/**
	 * Fetch the list item.
	 * @param cache Whether to cache the fetched list item.
	 * @returns The fetched list item.
	 */
	public fetch(cache?: boolean) {
		this.channel.items.cache.delete(this.id);
		return this.channel.items.fetch(this.id, cache) as Promise<this>;
	}

	/**
	 * Fetch the server the list item belongs to.
	 * @param cache Whether to cache the fetched server.
	 * @returns The fetched server.
	 */
	public async fetchServer(cache?: boolean) {
		return this.channel.fetchServer(cache);
	}

	/**
	 * Fetch the server member that created the list item.
	 * @param cache Whether to cache the fetched server member.
	 * @returns The fetched server member.
	 */
	public async fetchAuthor(cache?: boolean) {
		const server = await this.fetchServer(cache);
		return server.members.fetch(this.createdBy, cache);
	}

	/**
	 * Fetch the webhook that created the list item.
	 * @param cache Whether to cache the fetched webhook.
	 * @returns The fetched webhook.
	 */
	public async fetchWebhook(cache?: boolean) {
		return this.createdByWebhookId ? this.channel.webhooks.fetch(this.createdByWebhookId, cache) : undefined;
	}

	/**
	 * Fetch the server member that edited the list item.
	 * @param cache Whether to cache the fetched server member.
	 * @returns The fetched server member.
	 */
	public async fetchEditor(cache?: boolean) {
		const server = await this.fetchServer(cache);
		return this.editedBy ? server.members.fetch(this.editedBy, cache) : undefined;
	}

	/**
	 * Fetch the list item the list item belongs to.
	 * @param cache Whether to cache the fetched list item.
	 * @returns The fetched list item.
	 */
	public async fetchParent(cache?: boolean) {
		return this.parentId ? this.channel.items.fetch(this.parentId, cache) : undefined;
	}

	/**
	 * Fetch the server member that completed the list item.
	 * @param cache Whether to cache the fetched server member.
	 * @returns The fetched server member.
	 */
	public async fetchCompleter(cache?: boolean) {
		const server = await this.fetchServer(cache);
		return this.completedBy ? server.members.fetch(this.completedBy, cache) : undefined;
	}

	/**
	 * Edit the list item.
	 * @param content The content of the list item.
	 * @param note The note of the list item.
	 * @returns The edited list item.
	 */
	public edit(content: string, note?: string) {
		return this.channel.items.edit(this.id, content, note) as Promise<this>;
	}

	/**
	 * Remove the list item.
	 * @returns The removed list item.
	 */
	public async remove() {
		await this.channel.items.remove(this.id);
		return this;
	}

	/**
	 * Complete the list item.
	 * @returns The completed list item.
	 */
	public async complete() {
		await this.channel.items.complete(this.id);
		return this;
	}

	/**
	 * Uncomplete the list item.
	 * @returns The uncompleted list item.
	 */
	public async uncomplete() {
		await this.channel.items.uncomplete(this.id);
		return this;
	}
}
