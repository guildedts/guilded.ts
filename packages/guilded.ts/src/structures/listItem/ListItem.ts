import { APIListItem, APIListItemSummary } from 'guilded-api-typings';
import { Base } from '../Base';
import { Note } from './Note';
import { ListChannel } from '../channel/ListChannel';

/** Represents a list item on Guilded. */
export class ListItem extends Base {
	/** The ID of the server the list item belongs to. */
	public readonly serverId: string;
	/** The ID of the channel the list item belongs to. */
	public readonly channelId: string;
	/** The content of the list item. */
	public readonly content: string;
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
	/** The ID of the parent list item. */
	public readonly parentListItemId?: string;
	/** The date the list item was completed. */
	public readonly completedAt?: Date;
	/** The ID of the user that completed the list item. */
	public readonly completedBy?: string;
	/** The note of the list item. */
	public readonly note?: Note;

	/**
	 * @param channel The list channel the item belongs to.
	 * @param raw The raw data of the list item.
	 */
	public constructor(
		public readonly channel: ListChannel,
		public readonly raw: APIListItem | APIListItemSummary,
	) {
		super(channel.client, raw.id);
		this.serverId = raw.serverId;
		this.channelId = raw.channelId;
		this.content = raw.message;
		this.createdAt = new Date(raw.createdAt);
		this.createdBy = raw.createdBy;
		this.createdByWebhookId = raw.createdByWebhookId;
		this.editedAt = raw.updatedAt ? new Date(raw.updatedAt) : undefined;
		this.editedBy = raw.updatedBy;
		this.parentListItemId = raw.parentListItemId;
		this.completedAt = raw.completedAt ? new Date(raw.completedAt) : undefined;
		this.completedBy = raw.completedBy;
		this.note = raw.note ? new Note(this, raw.note) : undefined;
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

	/** The author of the list item. */
	public get author() {
		return this.client.users.cache.get(this.createdBy);
	}

	/** The webhook that created the list item. */
	public get webhook() {
		return this.createdByWebhookId
			? this.channel.webhooks.cache.get(this.createdByWebhookId)
			: undefined;
	}

	/** The ID of the author that created the list item. */
	public get authorId() {
		return this.createdByWebhookId ?? this.createdBy;
	}

	/** The timestamp the list item was edited. */
	public get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/** The editor of the list item. */
	public get editor() {
		return this.editedBy ? this.client.users.cache.get(this.editedBy) : undefined;
	}

	/** The parent list item. */
	public get parentListItem(): ListItem | undefined {
		return this.parentListItemId
			? this.channel.items.cache.get(this.parentListItemId)
			: undefined;
	}

	/** The timestamp the list item was completed. */
	public get completedTimestamp() {
		return this.completedAt?.getTime();
	}

	/** The completer of the list item. */
	public get completer() {
		return this.completedBy ? this.client.users.cache.get(this.completedBy) : undefined;
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
		return this.channel.items.fetch(this.id, cache);
	}

	/**
	 * Edit the list item.
	 * @param content The content to edit the list item with.
	 * @param note The note to edit the list item with.
	 * @returns The edited list item.
	 */
	public edit(content: string, note?: string) {
		return this.channel.items.edit(this.id, content, note);
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
