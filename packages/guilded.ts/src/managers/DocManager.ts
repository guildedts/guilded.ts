import { APIDoc, APIDocPayload, APIFetchDocsQuery, Routes } from 'guilded-api-typings';
import { BaseManager } from './BaseManager';
import { CacheCollection } from '../structures/CacheCollection';
import { Doc } from '../structures/Doc';
import { DocChannel } from '../structures/channel/DocChannel';

/** A manager of docs that belong to a doc channel. */
export class DocManager extends BaseManager<number, Doc> {
	/** @param channel The doc channel that owns the docs. */
	public constructor(public readonly channel: DocChannel) {
		super(channel.client, channel.client.options.maxDocCache);
	}

	/** @ignore */
	public async fetch(
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
		const response = await this.client.rest.get<{ doc: APIDoc }>(
			Routes.doc(this.channel.id, docId),
		);
		doc = new Doc(this.channel, response.doc);
		if (cache) this.cache.set(docId, doc);
		return doc;
	}

	/** @ignore */
	private async fetchMany(options: APIFetchDocsQuery = {}, cache: boolean) {
		const response = await this.client.rest.get<{ docs: APIDoc[] }, APIFetchDocsQuery>(
			Routes.docs(this.channel.id),
			options,
		);
		const docs = new CacheCollection<number, Doc>();
		for (const data of response.docs) {
			const doc = new Doc(this.channel, data);
			docs.set(data.id, doc);
			if (cache) this.cache.set(data.id, doc);
		}
		return docs;
	}

	/**
	 * Create a doc in the channel.
	 * @param title The title to create the doc with.
	 * @param content The content to create the doc with.
	 * @returns The created doc.
	 */
	public async create(title: string, content: string) {
		const response = await this.client.rest.post<{ doc: APIDoc }, APIDocPayload>(
			Routes.docs(this.channel.id),
			{ title, content },
		);
		return new Doc(this.channel, response.doc);
	}

	/**
	 * Edit a doc in the channel.
	 * @param docId The ID of the doc to edit.
	 * @param title The title to edit the doc with.
	 * @param content The content to edit the doc with.
	 * @returns The edited doc.
	 */
	public async edit(docId: number, title: string, content: string) {
		const response = await this.client.rest.put<{ doc: APIDoc }, APIDocPayload>(
			Routes.doc(this.channel.id, docId),
			{ title, content },
		);
		return new Doc(this.channel, response.doc);
	}

	/**
	 * Delete a doc in the channel.
	 * @param docId The ID of the doc to delete.
	 */
	public async delete(docId: number) {
		await this.client.rest.delete<{ doc: APIDoc }>(Routes.doc(this.channel.id, docId));
	}
}

export declare interface DocManager {
	/**
	 * Fetch a single doc from the channel, or cache.
	 * @param docId The ID of the doc to fetch.
	 * @param cache Whether to cache the fetched doc.
	 * @returns The fetched doc.
	 */
	fetch(docId: number, cache?: boolean): Promise<Doc>;

	/**
	 * Fetch multiple docs from the channel.
	 * @param options The options to fetch the docs with.
	 * @param cache Whether to cache the fetched docs.
	 * @returns The fetched docs.
	 */
	fetch(options?: APIFetchDocsQuery, cache?: boolean): Promise<CacheCollection<number, Doc>>;
}
