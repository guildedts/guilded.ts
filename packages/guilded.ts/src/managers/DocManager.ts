import { RESTGetDocsQuery } from 'guilded-api-typings';
import { BaseManager, FetchManyOptions, FetchOptions } from './BaseManager';
import { Doc } from '../structures/Doc';
import { DocChannel } from '../structures/channel/DocChannel';
import { Collection } from '@discordjs/collection';

/**
 * The manager of docs that belong to a doc channel.
 * @example new DocManager(channel);
 */
export class DocManager extends BaseManager<number, Doc> {
	/** @param channel The doc channel the docs belong to. */
	constructor(public readonly channel: DocChannel) {
		super(channel.client, channel.client.options.maxDocCache);
	}

	/**
	 * Fetch a doc from the channel, or cache.
	 * @param doc The doc to fetch.
	 * @param options The options to fetch the doc with.
	 * @returns The fetched doc.
	 * @example docs.fetch(doc);
	 */
	fetch(doc: number | Doc, options?: FetchOptions): Promise<Doc>;
	/**
	 * Fetch docs from the channel.
	 * @param options The options to fetch the docs with.
	 * @returns The fetched docs.
	 * @example docs.fetch();
	 */
	fetch(options?: DocFetchManyOptions): Promise<Collection<number, Doc>>;
	fetch(arg1?: number | Doc | DocFetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'number' || arg1 instanceof Doc) return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(doc: number | Doc, options?: FetchOptions) {
		doc = doc instanceof Doc ? doc.id : doc;
		const cached = this.cache.get(doc);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.docs.fetch(this.channel.id, doc);
		return new Doc(this.channel, raw, options?.cache);
	}

	/** @ignore */
	private async fetchMany(options?: DocFetchManyOptions) {
		const raw = await this.client.api.docs.fetch(this.channel.id, options);
		const docs = new Collection<number, Doc>();
		for (const data of raw) {
			const doc = new Doc(this.channel, data, options?.cache);
			docs.set(data.id, doc);
		}
		return docs;
	}

	/**
	 * Create a doc in the channel.
	 * @param title The title of the doc.
	 * @param content The content of the doc.
	 * @returns The created doc.
	 * @example docs.create('Title', 'Content');
	 */
	async create(title: string, content: string) {
		const raw = await this.client.api.docs.create(this.channel.id, title, content);
		return new Doc(this.channel, raw);
	}

	/**
	 * Edit a doc in the channel.
	 * @param doc The doc to edit.
	 * @param title The title of the doc.
	 * @param content The content of the doc.
	 * @returns The edited doc.
	 * @example docs.edit(doc, 'Title', 'Content');
	 */
	async edit(doc: number | Doc, title: string, content: string) {
		doc = doc instanceof Doc ? doc.id : doc;
		const raw = await this.client.api.docs.edit(this.channel.id, doc, title, content);
		return new Doc(this.channel, raw);
	}

	/**
	 * Delete a doc from the channel.
	 * @param doc The doc to delete.
	 * @example docs.delete(doc);
	 */
	delete(doc: number | Doc) {
		doc = doc instanceof Doc ? doc.id : doc;
		return this.client.api.docs.delete(this.channel.id, doc);
	}
}

/** The options for fetching docs. */
export interface DocFetchManyOptions extends FetchManyOptions, RESTGetDocsQuery {}
