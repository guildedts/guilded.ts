import { APIFetchDocsQuery } from 'guilded-api-typings';
import { BaseManager } from './BaseManager';
import { CacheCollection } from '../structures/CacheCollection';
import { Doc } from '../structures/Doc';
import { DocChannel } from '../structures/channel/DocChannel';

/** The manager of docs that belong to a doc channel. */
export class DocManager extends BaseManager<number, Doc> {
	/** @param channel The doc channel the docs belong to. */
	public constructor(public readonly channel: DocChannel) {
		super(channel.client, channel.client.options.maxDocCache);
	}

	/**
	 * Fetch a doc from the channel, or cache.
	 * @param docId The ID of the doc to fetch.
	 * @param cache Whether to cache the fetched doc.
	 * @returns The fetched doc.
	 */
	public fetch(docId: number, cache?: boolean): Promise<Doc>;
	/**
	 * Fetch docs from the channel.
	 * @param options The options to fetch the docs with.
	 * @param cache Whether to cache the fetched docs.
	 * @returns The fetched docs.
	 */
	public fetch(
		options?: APIFetchDocsQuery,
		cache?: boolean,
	): Promise<CacheCollection<number, Doc>>;
	/** @ignore */
	public fetch(
		arg1: number | APIFetchDocsQuery = {},
		arg2 = this.client.options.cacheDocs ?? true,
	) {
		if (typeof arg1 === 'number') return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1, arg2);
	}

	/** @ignore */
	private async fetchSingle(docId: number, cache: boolean) {
		let doc = this.cache.get(docId);
		if (doc) return doc;
		const raw = await this.client.api.docs.fetch(this.channel.id, docId);
		doc = new Doc(this.channel, raw);
		if (cache) this.cache.set(docId, doc);
		return doc;
	}

	/** @ignore */
	private async fetchMany(options: APIFetchDocsQuery = {}, cache: boolean) {
		const raw = await this.client.api.docs.fetch(this.channel.id, options);
		const docs = new CacheCollection<number, Doc>();
		for (const data of raw) {
			const doc = new Doc(this.channel, data);
			docs.set(data.id, doc);
			if (cache) this.cache.set(data.id, doc);
		}
		return docs;
	}

	/**
	 * Create a doc in the channel.
	 * @param title The title of the doc.
	 * @param content The content of the doc.
	 * @returns The created doc.
	 */
	public async create(title: string, content: string) {
		const raw = await this.client.api.docs.create(this.channel.id, title, content);
		return new Doc(this.channel, raw);
	}

	/**
	 * Edit a doc in the channel.
	 * @param docId The ID of the doc to edit.
	 * @param title The title of the doc.
	 * @param content The content of the doc.
	 * @returns The edited doc.
	 */
	public async edit(docId: number, title: string, content: string) {
		const raw = await this.client.api.docs.edit(this.channel.id, docId, title, content);
		return new Doc(this.channel, raw);
	}

	/**
	 * Delete a doc from channel.
	 * @param docId The ID of the doc to delete.
	 */
	public delete(docId: number) {
		return this.client.api.docs.delete(this.channel.id, docId);
	}
}
