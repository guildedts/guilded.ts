import { APIDoc, APIMentions } from 'guilded-api-typings';
import { FetchOptions } from '../managers/BaseManager';
import { Base } from './Base';
import { DocChannel } from './channel/DocChannel';

/**
 * Represents a doc on Guilded
 */
export class Doc extends Base<number> {
	/**
	 * The ID of the server
	 */
	readonly serverId: string;
	/**
	 * The ID of the channel
	 */
	readonly channelId: string;
	/**
	 * The title of the doc (min characters: 1)
	 */
	readonly title: string;
	/**
	 * The content of the doc
	 */
	readonly content: string;
	/**
	 * The mentions of the doc
	 */
	readonly mentions?: APIMentions;
	/**
	 * When the doc was created
	 */
	readonly createdAt: Date;
	/**
	 * The ID of the user that created the doc
	 */
	readonly createdBy: string;
	/**
	 * When the doc was edited, if relevant
	 */
	readonly editedAt?: Date;
	/**
	 * The ID of the user that edited the doc, if relevant
	 */
	readonly editedBy?: string;

	/**
	 * @param channel The doc channel
	 * @param raw The data of the doc
	 * @param cache Whether to cache the doc
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

	/**
	 * Whether the doc is cached
	 */
	get isCached() {
		return this.channel.docs.cache.has(this.id);
	}

	/**
	 * The server
	 */
	get server() {
		return this.channel.server;
	}

	/**
	 * The timestamp of when the doc was created
	 */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/**
	 * The server member that created the doc
	 */
	get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/**
	 * The ID of the user that created the doc
	 */
	get authorId() {
		return this.createdBy;
	}

	/**
	 * The timestamp of when the doc was edited, if relevant
	 */
	get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/**
	 * The server member that edited the doc, if relevant
	 */
	get editor() {
		return this.editedBy ? this.server?.members.cache.get(this.editedBy) : undefined;
	}

	/**
	 * Fetch the doc
	 * @param options The options to fetch the doc with
	 * @returns The fetched doc
	 */
	fetch(options?: FetchOptions) {
		return this.channel.docs.fetch(this, options) as Promise<this>;
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
	 * Fetch the server member that created the doc
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Fetch the server member that edited the doc
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	async fetchEditor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return this.editedBy ? server.members.fetch(this.editedBy, options) : undefined;
	}

	/**
	 * Edit the doc
	 * @param title The title of the doc
	 * @param content The content of the doc
	 * @returns The edited doc
	 */
	edit(title: string, content: string) {
		return this.channel.docs.edit(this, title, content) as Promise<this>;
	}

	/**
	 * Delete the doc
	 * @returns The deleted doc
	 */
	async delete() {
		await this.channel.docs.delete(this);
		return this;
	}
}
