import {
	APIDoc,
	RESTPostDocJSONBody,
	RESTGetDocsQuery,
	Routes,
	RESTPutDocJSONBody,
} from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/**
 * The doc router for the Guilded REST API
 */
export class DocRouter extends BaseRouter {
	/**
	 * Fetch a doc from Guilded
	 * @param channelId The ID of the channel
	 * @param docId The ID of the doc
	 * @returns The fetched doc
	 */
	fetch(channelId: string, docId: number): Promise<APIDoc>;
	/**
	 * Fetch docs from Guilded
	 * @param channelId The ID of the channel
	 * @param options The options to fetch docs with
	 * @returns The fetched docs
	 */
	fetch(channelId: string, options?: RESTGetDocsQuery): Promise<APIDoc[]>;
	fetch(channelId: string, docIdOrOptions?: number | RESTGetDocsQuery) {
		if (typeof docIdOrOptions === 'number') return this.fetchSingle(channelId, docIdOrOptions);
		return this.fetchMany(channelId, docIdOrOptions);
	}

	private async fetchSingle(channelId: string, docId: number) {
		const { doc } = await this.rest.get<{ doc: APIDoc }>(Routes.doc(channelId, docId));
		return doc;
	}

	private async fetchMany(channelId: string, options?: RESTGetDocsQuery) {
		const { docs } = await this.rest.get<{ docs: APIDoc[] }, RESTGetDocsQuery>(
			Routes.docs(channelId),
			options,
		);
		return docs;
	}

	/**
	 * Create a doc on Guilded
	 * @param channelId The ID of the channel
	 * @param title The title of the doc
	 * @param content The content of the doc
	 * @returns The created doc
	 */
	async create(channelId: string, title: string, content: string) {
		const { doc } = await this.rest.post<{ doc: APIDoc }, RESTPostDocJSONBody>(
			Routes.docs(channelId),
			{ title, content },
		);
		return doc;
	}

	/**
	 * Edit a doc on Guilded
	 * @param channelId The ID of the channel
	 * @param docId The ID of the doc
	 * @param title The title of the doc
	 * @param content The content of the doc
	 * @returns The edited doc
	 */
	async edit(channelId: string, docId: number, title: string, content: string) {
		const { doc } = await this.rest.put<{ doc: APIDoc }, RESTPutDocJSONBody>(
			Routes.doc(channelId, docId),
			{ title, content },
		);
		return doc;
	}

	/**
	 * Delete a doc from Guilded
	 * @param channelId The ID of the channel
	 * @param docId The ID of the doc
	 */
	delete(channelId: string, docId: number) {
		return this.rest.delete<void>(Routes.doc(channelId, docId));
	}
}
