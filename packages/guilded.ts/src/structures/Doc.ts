import { APIDoc, APIMentions } from 'guilded-api-typings';
import { FetchOptions } from '../managers/BaseManager';
import { Base } from './Base';
import { DocChannel } from './channel/DocChannel';

/**
 * Represents a doc on Guilded.
 * @example new Doc(channel, rawDoc);
 */
export class Doc extends Base<number> {
	/** The ID of the server the doc belongs to. */
	readonly serverId: string;
	/** The ID of the channel the doc belongs to. */
	readonly channelId: string;
	/** The title of the doc. */
	readonly title: string;
	/** The content of the doc. */
	readonly content: string;
	/** The mentions of the doc. */
	readonly mentions?: APIMentions;
	/** The date the doc was created. */
	readonly createdAt: Date;
	/** The ID of the user that created the doc. */
	readonly createdBy: string;
	/** The date the doc was edited. */
	readonly editedAt?: Date;
	/** The ID of the user that edited the doc. */
	readonly editedBy?: string;

	/**
	 * @param channel The doc channel the doc belongs to.
	 * @param raw The raw data of the doc.
	 * @param cache Whether to cache the doc.
	 */
	constructor(
		public readonly channel: DocChannel,
		public readonly raw: APIDoc,
		cache = channel.client.options.cacheDocs ?? true,
	) {
		super(channel.client, raw.id);
		this.serverId = raw.serverId;
		this.channelId = raw.channelId;
		this.title = raw.title;
		this.content = raw.content;
		this.mentions = raw.mentions;
		this.createdAt = new Date(raw.createdAt);
		this.createdBy = raw.createdBy;
		this.editedAt = raw.updatedAt ? new Date(raw.updatedAt) : undefined;
		this.editedBy = raw.updatedBy;
		if (cache) channel.docs.cache.set(this.id, this);
	}

	/** Whether the doc is cached. */
	get isCached() {
		return this.channel.docs.cache.has(this.id);
	}

	/** The server the doc belongs to. */
	get server() {
		return this.channel.server;
	}

	/** The timestamp the doc was created. */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The server member that created the doc. */
	get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/** The ID of the user that created the doc. */
	get authorId() {
		return this.createdBy;
	}

	/** The timestamp the doc was edited. */
	get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/** The server member that edited the doc. */
	get editor() {
		return this.editedBy ? this.server?.members.cache.get(this.editedBy) : undefined;
	}

	/**
	 * Fetch the doc.
	 * @param options The options to fetch the doc with.
	 * @returns The fetched doc.
	 * @example doc.fetch();
	 */
	fetch(options?: FetchOptions) {
		return this.channel.docs.fetch(this, options) as Promise<this>;
	}

	/**
	 * Fetch the server the doc belongs to.
	 * @param options The options to fetch the server with.
	 * @returns The fetched server.
	 * @example doc.fetchServer();
	 */
	fetchServer(options?: FetchOptions) {
		return this.channel.fetchServer(options);
	}

	/**
	 * Fetch the server member that created the doc.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example doc.fetchAuthor();
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Fetch the server member that edited the doc.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example doc.fetchEditor();
	 */
	async fetchEditor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return this.editedBy ? server.members.fetch(this.editedBy, options) : undefined;
	}

	/**
	 * Edit the doc.
	 * @param title The title of the doc.
	 * @param content The content of the doc.
	 * @returns The edited doc.
	 * @example doc.edit('New title', 'New content');
	 */
	edit(title: string, content: string) {
		return this.channel.docs.edit(this, title, content) as Promise<this>;
	}

	/**
	 * Delete the doc.
	 * @returns The deleted doc.
	 * @example doc.delete();
	 */
	async delete() {
		await this.channel.docs.delete(this);
		return this;
	}
}
