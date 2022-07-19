import { APIDoc, APIDocPayload, APIFetchDocsQuery, Routes } from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/**
 * The doc router for the Guilded REST API.
 * @example new DocRouter(rest);
 */
export class DocRouter extends BaseRouter {
	/**
	 * Fetch a doc from Guilded.
	 * @param channelId The ID of the channel the doc belongs to.
	 * @param docId The ID of the doc to fetch.
	 * @returns The fetched doc.
	 * @example docs.fetch('abc', 123);
	 */
	fetch(channelId: string, docId: number): Promise<APIDoc>;
	/**
	 * Fetch docs from Guilded.
	 * @param channelId The ID of the channel the docs belong to.
	 * @param options The options to fetch docs with.
	 * @returns The fetched docs.
	 * @example docs.fetchMany('abc');
	 */
	fetch(channelId: string, options?: APIFetchDocsQuery): Promise<APIDoc[]>;
	/** @ignore */
	fetch(channelId: string, docIdOrOptions?: number | APIFetchDocsQuery) {
		if (typeof docIdOrOptions === 'number') return this.fetchSingle(channelId, docIdOrOptions);
		return this.fetchMany(channelId, docIdOrOptions);
	}

	/** @ignore */
	private async fetchSingle(channelId: string, docId: number) {
		const { doc } = await this.rest.get<{ doc: APIDoc }>(Routes.doc(channelId, docId));
		return doc;
	}

	/** @ignore */
	private async fetchMany(channelId: string, options?: APIFetchDocsQuery) {
		const { docs } = await this.rest.get<{ docs: APIDoc[] }, APIFetchDocsQuery>(
			Routes.docs(channelId),
			options,
		);
		return docs;
	}

	/**
	 * Create a doc on Guilded.
	 * @param channelId The ID of the channel the doc belongs to.
	 * @param title The title of the doc.
	 * @param content The content of the doc.
	 * @returns The created doc.
	 * @example docs.create('abc', 'My Doc', 'This is my doc.');
	 */
	async create(channelId: string, title: string, content: string) {
		const { doc } = await this.rest.post<{ doc: APIDoc }, APIDocPayload>(
			Routes.docs(channelId),
			{ title, content },
		);
		return doc;
	}

	/**
	 * Edit a doc on Guilded.
	 * @param channelId The ID of the channel the doc belongs to.
	 * @param docId The ID of the doc to edit.
	 * @param title The title of the doc.
	 * @param content The content of the doc.
	 * @returns The edited doc.
	 * @example docs.edit('abc', 123, 'My Doc', 'This is my doc.');
	 */
	async edit(channelId: string, docId: number, title: string, content: string) {
		const { doc } = await this.rest.put<{ doc: APIDoc }, APIDocPayload>(
			Routes.doc(channelId, docId),
			{ title, content },
		);
		return doc;
	}

	/**
	 * Delete a doc from Guilded.
	 * @param channelId The ID of the channel the doc belongs to.
	 * @param docId The ID of the doc to delete.
	 * @example docs.delete('abc', 123);
	 */
	delete(channelId: string, docId: number) {
		return this.rest.delete<void>(Routes.doc(channelId, docId));
	}
}
