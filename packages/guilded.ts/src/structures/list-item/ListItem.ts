import { APIListItem, APIListItemSummary } from 'guilded-api-typings';
import { Base, ListChannel, Note } from '..';

/** Represents a list item on Guilded. */
export class ListItem extends Base {
	/** The ID of the server this list item belongs to. */
	public readonly serverId: string;
	/** The ID of the channel this list item belongs to. */
	public readonly channelId: string;
	/** The content of this list item. */
	public readonly content: string;
	/** The time this list item was created. */
	public readonly createdAt: Date;
	/** The ID of the user who created this list item. */
	public readonly createdBy: string;
	/** The ID of the webhook who created this list item. */
	public readonly createdByWebhookId?: string;
	/** The time this list item was last edited. */
	public readonly editedAt?: Date;
	/** The ID of the user who last edited this list item. */
	public readonly editedBy?: string;
	/** The ID of the parent list item. */
	public readonly parentListItemId?: string;
	/** The time this list item was completed. */
	public readonly completedAt?: Date;
	/** The ID of the user who completed this list item. */
	public readonly completedBy?: string;
	/** The note of this list item. */
	public readonly note?: Note;

	/**
	 * @param channel The channel this list item belongs to.
	 * @param data The data of this list item.
	 */
	public constructor(
		public readonly channel: ListChannel,
		data: APIListItem | APIListItemSummary,
	) {
		super(channel.client, data.id);

		this.serverId = data.serverId;
		this.channelId = data.channelId;
		this.content = data.message;
		this.createdAt = new Date(data.createdAt);
		this.createdBy = data.createdBy;
		this.createdByWebhookId = data.createdByWebhookId;
		this.editedAt = data.updatedAt ? new Date(data.updatedAt) : undefined;
		this.editedBy = data.updatedBy;
		this.parentListItemId = data.parentListItemId;
		this.completedAt = data.completedAt ? new Date(data.completedAt) : undefined;
		this.completedBy = data.completedBy;
		this.note = data.note ? new Note(this, data.note) : undefined;
	}

	/** Whether this list item is cached. */
	public get cached() {
		return this.channel.items.cache.has(this.id);
	}

	/** The server this list item belongs to. */
	public get server() {
		return this.channel.server;
	}

	/** The timestamp this list item was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The author of this list item. */
	public get author() {
		return this.client.users.cache.get(this.createdBy);
	}

	/** The webhook that created this list item. */
	public get webhook() {
		return this.createdByWebhookId
			? this.channel.webhooks.cache.get(this.createdByWebhookId)
			: undefined;
	}

	/** The ID of the author of this list item. */
	public get authorId() {
		return this.createdByWebhookId ?? this.createdBy;
	}

	/** The timestamp this list item was last edited. */
	public get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/** The editor of this list item. */
	public get editor() {
		return this.editedBy ? this.client.users.cache.get(this.editedBy) : undefined;
	}

	/** The parent list item of this list item. */
	public get parentListItem(): ListItem | undefined {
		return this.parentListItemId
			? this.channel.items.cache.get(this.parentListItemId)
			: undefined;
	}

	/** The timestamp this list item was completed. */
	public get completedTimestamp() {
		return this.completedAt?.getTime();
	}

	/** The completer of this list item. */
	public get completer() {
		return this.completedBy ? this.client.users.cache.get(this.completedBy) : undefined;
	}

	/** Whether this list item is completed. */
	public get completed() {
		return !!this.completedAt;
	}

	/** Whether this list item is editable. */
	public get editable() {
		return this.createdBy === this.client.user?.id;
	}

	/**
	 * Fetch this list item.
	 * @param cache Whether to cache the item.
	 * @returns The fetched list item.
	 */
	public fetch(cache = this.channel.items.caching) {
		this.channel.items.cache.delete(this.id);
		return this.channel.items.fetch(this.id, cache);
	}

	/**
	 * Edit this list item.
	 * @param content The new content of this list item.
	 * @param note The new note of this list item.
	 * @param cache Whether to cache the item.
	 * @returns The edited list item.
	 */
	public edit(content: string, note?: string, cache = this.channel.items.caching) {
		return this.channel.items.edit(this.id, content, note, cache);
	}

	/**
	 * Remove this list item.
	 * @returns The removed item if cached.
	 */
	public remove() {
		return this.channel.items.remove(this.id);
	}

	/**
	 * Complete this list item.
	 * @returns The completed list item.
	 */
	public complete() {
		return this.channel.items.complete(this.id);
	}

	/**
	 * Uncomplete this list item.
	 * @returns The uncompleted list item.
	 */
	public uncomplete() {
		return this.channel.items.uncomplete(this.id);
	}
}
