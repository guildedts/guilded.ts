import { APIDoc, APIMentions } from 'guilded-api-typings';
import { Base } from './Base';
import { DocChannel } from './channel/DocChannel';

/** Represents a doc on Guilded. */
export class Doc extends Base<number> {
	/** The ID of the server the doc belongs to. */
	public readonly serverId: string;
	/** The ID of the channel the doc belongs to. */
	public readonly channelId: string;
	/** The title of the doc. */
	public readonly title: string;
	/** The content of the doc. */
	public readonly content: string;
	/** The mentions of the doc. */
	public readonly mentions?: APIMentions;
	/** The date the doc was created. */
	public readonly createdAt: Date;
	/** The ID of the user that created the doc. */
	public readonly createdBy: string;
	/** The date the doc was edited. */
	public readonly editedAt?: Date;
	/** The ID of the user that edited the doc. */
	public readonly editedBy?: string;

	/**
	 * @param channel The doc channel the doc belongs to.
	 * @param raw The raw data of the doc.
	 * @param cache Whether to cache the doc.
	 */
	public constructor(
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
	public get isCached() {
		return this.channel.docs.cache.has(this.id);
	}

	/** The server the doc belongs to. */
	public get server() {
		return this.channel.server;
	}

	/** The timestamp the doc was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The server member that created the doc. */
	public get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/** The ID of the user that created the doc. */
	public get authorId() {
		return this.createdBy;
	}

	/** The timestamp the doc was edited. */
	public get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/** The server member that edited the doc. */
	public get editor() {
		return this.editedBy ? this.server?.members.cache.get(this.editedBy) : undefined;
	}

	/**
	 * Fetch the doc.
	 * @param cache Whether to cache the fetched doc.
	 * @returns The fetched doc.
	 */
	public fetch(cache?: boolean) {
		this.channel.docs.cache.delete(this.id);
		return this.channel.docs.fetch(this.id, cache) as Promise<this>;
	}

	/**
	 * Fetch the server the doc belongs to.
	 * @param cache Whether to cache the fetched server.
	 * @returns The fetched server.
	 */
	public async fetchServer(cache?: boolean) {
		return this.channel.fetchServer(cache);
	}

	/**
	 * Fetch the server member that created the doc.
	 * @param cache Whether to cache the fetched server member.
	 * @returns The fetched server member.
	 */
	public async fetchAuthor(cache?: boolean) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, cache);
	}

	/**
	 * Fetch the server member that edited the doc.
	 * @param cache Whether to cache the fetched server member.
	 * @returns The fetched server member.
	 */
	public async fetchEditor(cache?: boolean) {
		const server = await this.fetchServer();
		return this.editedBy ? server.members.fetch(this.editedBy, cache) : undefined;
	}

	/**
	 * Edit the doc.
	 * @param title The title of the doc.
	 * @param content The content of the doc.
	 * @returns The edited doc.
	 */
	public edit(title: string, content: string) {
		return this.channel.docs.edit(this.id, title, content) as Promise<this>;
	}

	/**
	 * Delete the doc.
	 * @returns The deleted doc.
	 */
	public async delete() {
		await this.channel.docs.delete(this.id);
		return this;
	}
}
