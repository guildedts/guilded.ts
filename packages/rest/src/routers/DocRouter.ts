import { APIDoc, APIDocPayload, APIFetchDocsQuery, Routes } from "guilded-api-typings";
import { BaseRouter } from "./BaseRouter";

/** The doc router for the Guilded REST API. */
export class DocRouter extends BaseRouter {
	/** @ignore */
	public fetch(channelId: string, docIdOrOptions?: number | APIFetchDocsQuery) {
		if (typeof docIdOrOptions === 'number')
			return this.fetchSingle(channelId, docIdOrOptions);
		return this.fetchMany(channelId, docIdOrOptions);
	}

	/** @ignore */
	private async fetchSingle(channelId: string, docId: number) {
		const { doc } = await this.rest.get<{ doc: APIDoc }>(
			Routes.doc(channelId, docId),
		);
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
     * @param title The title to create the doc with.
     * @param content The content to create the doc with.
     * @returns The created doc.
     */
    public async create(channelId: string, title: string, content: string) {
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
     * @param title The title to edit the doc with.
     * @param content The content to edit the doc with.
     * @returns The edited doc.
     */
    public async edit(channelId: string, docId: number, title: string, content: string) {
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
     */
    public delete(channelId: string, docId: number) {
        return this.rest.delete<void>(Routes.doc(channelId, docId));
    }
}

export declare interface DocRouter {
	/**
	 * Fetch a doc from Guilded.
	 * @param channelId The ID of the channel the doc belongs to.
	 * @param docId The ID of the doc to fetch.
	 * @returns The fetched doc.
	 */
	fetch(channelId: string, docId: number): Promise<APIDoc>;

	/**
	 * Fetch docs from Guilded.
	 * @param channelId The ID of the channel the docs belong to.
	 * @param options The options to fetch docs with.
	 * @returns The fetched docs.
	 */
	fetch(channelId: string, options?: APIFetchDocsQuery): Promise<APIDoc[]>;
}
