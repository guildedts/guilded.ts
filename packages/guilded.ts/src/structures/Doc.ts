import { APIDoc } from 'guilded-api-typings';
import { Base, DocChannel } from '.';

/** Represents a doc on Guilded. */
export class Doc extends Base<number> {
	/** The ID of the server this doc belongs to. */
	public readonly serverId: string;
	/** The ID of the channel this doc belongs to. */
	public readonly channelId: string;
	/** The title of this doc. */
	public readonly title: string;
	/** The content of this doc. */
	public readonly content: string;
	/** The time this doc was created. */
	public readonly createdAt: Date;
	/** The ID of the user that created this doc. */
	public readonly createdBy: string;
	/** The time this doc was last edited. */
	public editedAt?: Date;
	/** The ID of the user that last edited this doc. */
	public editedBy?: string;

	/**
	 * @param channel The channel this doc belongs to.
	 * @param data The data of this doc.
	 */
	public constructor(public readonly channel: DocChannel, data: APIDoc) {
		super(channel.client, data.id);

		this.serverId = data.serverId;
		this.channelId = data.channelId;
		this.title = data.title;
		this.content = data.content;
		this.createdAt = new Date(data.createdAt);
		this.createdBy = data.createdBy;
		this.editedAt = data.updatedAt ? new Date(data.updatedAt) : undefined;
		this.editedBy = data.updatedBy;
	}

	/** Whether this doc is cached. */
	public get cached() {
		return this.channel.docs.cache.has(this.id);
	}

	/** The server this doc belongs to. */
	public get server() {
		return this.channel.server;
	}

	/** The timestamp of when this doc was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The author of this doc. */
	public get author() {
		return this.client.users.cache.get(this.createdBy);
	}

	/** The ID of the author of this doc. */
	public get authorId() {
		return this.createdBy;
	}

	/** The timestamp of when this doc was last edited. */
	public get editedTimestamp() {
		return this.editedAt ? this.editedAt.getTime() : undefined;
	}

	/** The editor of this doc. */
	public get editor() {
		return this.editedBy ? this.client.users.cache.get(this.editedBy) : undefined;
	}

	/**
	 * Fetch this doc.
	 * @param cache Whether to cache the doc.
	 * @returns The doc.
	 */
	public fetch(cache = this.channel.docs.caching) {
		this.channel.docs.cache.delete(this.id);
		return this.channel.docs.fetch(this.id, cache);
	}

	/**
	 * Edit this doc.
	 * @param title The new title of this doc.
	 * @param content The new content of this doc.
	 * @param cache Whether to cache this doc.
	 * @returns The edited doc.
	 */
	public edit(title: string, content: string, cache = this.channel.docs.caching) {
		return this.channel.docs.edit(this.id, title, content, cache);
	}

	/**
	 * Delete this doc.
	 * @returns The doc.
	 */
	public delete() {
		this.channel.docs.delete(this.id);

		return this;
	}
}
