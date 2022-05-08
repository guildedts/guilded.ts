import { APIDoc, APIDocPayload, APIGetDocsQuery, Routes } from 'guilded-api-typings';
import { BaseManager } from '.';
import { CacheCollection, Doc, DocChannel } from '../structures';

/** A manager of docs that belong to a doc channel. */
export class DocManager extends BaseManager<number, Doc> {
	/** @param channel The channel that owns the docs. */
	public constructor(public readonly channel: DocChannel) {
		super(channel.client, {
			caching: channel.client.options.cacheDocs,
			maxCache: channel.client.options.maxDocCache,
		});
	}

	/** @ignore */
	public async fetch(arg1: number | APIGetDocsQuery = {}, arg2 = this.caching) {
		if (typeof arg1 === 'number') return this.fetchSingle(arg1, arg2);

		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(docId: number, cache = this.caching) {
		let doc = this.cache.get(docId);
		if (doc) return doc;

		const response = await this.client.rest.get<{ doc: APIDoc }>(
			Routes.channelDoc(this.channel.id, docId),
		);

		doc = new Doc(this.channel, response.doc);

		if (cache) this.cache.set(docId, doc);

		return doc;
	}

	/** @ignore */
	private async fetchMany(options: APIGetDocsQuery = {}, cache = this.caching) {
		const response = await this.client.rest.get<{ docs: APIDoc[] }, APIGetDocsQuery>(
			Routes.channelDocs(this.channel.id),
			options,
		);

		const docs = new CacheCollection<number, Doc>();

		for (const data of response.docs) {
			const doc = new Doc(this.channel, data);
			docs.set(doc.id, doc);
			if (cache) this.cache.set(doc.id, doc);
		}

		return docs;
	}

	/**
	 * Create a doc in this channel.
	 * @param title The title of the doc.
	 * @param content The content of the doc.
	 * @param cache Whether to cache the doc.
	 * @returns The created doc.
	 */
	public async create(title: string, content: string, cache = this.caching) {
		const response = await this.client.rest.post<{ doc: APIDoc }, APIDocPayload>(
			Routes.channelDocs(this.channel.id),
			{ title, content },
		);

		const doc = new Doc(this.channel, response.doc);

		if (cache) this.cache.set(doc.id, doc);

		return doc;
	}

	/**
	 * Edit a doc in this channel.
	 * @param docId The ID of the doc to edit.
	 * @param title The new title of the doc.
	 * @param content The new content of the doc.
	 * @param cache Whether to cache the doc.
	 * @returns The edited doc.
	 */
	public async edit(docId: number, title: string, content: string, cache = this.caching) {
		const response = await this.client.rest.put<{ doc: APIDoc }, APIDocPayload>(
			Routes.channelDoc(this.channel.id, docId),
			{ title, content },
		);

		const doc = new Doc(this.channel, response.doc);

		if (cache) this.cache.set(doc.id, doc);

		return doc;
	}

	/**
	 * Delete a doc in this channel.
	 * @param docId The ID of the doc to delete.
	 * @returns The deleted doc if cached.
	 */
	public async delete(docId: number) {
		await this.client.rest.delete<{ doc: APIDoc }>(Routes.channelDoc(this.channel.id, docId));

		const doc = this.cache.get(docId);

		if (doc) this.cache.delete(doc.id);

		return doc;
	}
}

export declare interface DocManager {
	/**
	 * Fetch a single doc from this channel, or cache if it's already cached.
	 * @param docId The ID of the doc.
	 * @param cache Whether to cache the doc.
	 * @returns The doc.
	 */
	fetch(docId: number, cache?: boolean): Promise<Doc>;

	/**
	 * Fetch multiple docs from this channel.
	 * @param options The options to fetch the docs with.
	 * @returns The docs.
	 */
	fetch(options?: APIGetDocsQuery, cache?: boolean): Promise<CacheCollection<number, Doc>>;
}
