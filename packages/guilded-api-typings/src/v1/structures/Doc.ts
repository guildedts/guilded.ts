import { APIMentions } from './Channel';

/**
 * Represents a doc on Guilded.
 * @see https://www.guilded.gg/docs/api/docs/Doc
 */
export interface APIDoc {
	/** The ID of the doc. */
	id: number;
	/** The ID of the server the doc belongs to. */
	serverId: string;
	/** The ID of the channel the doc belongs to. */
	channelId: string;
	/** The title of the doc. */
	title: string;
	/** The content of the doc. */
	content: string;
	/** The mentions of the doc. */
	mentions?: APIMentions;
	/** The date the doc was created. */
	createdAt: string;
	/** The ID of the user that created the doc. */
	createdBy: string;
	/** The date the doc was edited. */
	updatedAt?: string;
	/** The ID of the user that edited the doc. */
	updatedBy?: string;
}

/**
 * The payload for creating a doc.
 * @see https://www.guilded.gg/docs/api/docs/DocCreate
 * @see https://www.guilded.gg/docs/api/docs/DocUpdate
 */
export interface APIDocPayload {
	/** The title of the doc. */
	title: string;
	/** The content of the doc. */
	content: string;
}

/**
 * The query parameters for fetching docs.
 * @see https://www.guilded.gg/docs/api/docs/DocReadMany
 */
export interface APIFetchDocsQuery {
	/** The date to fetch docs before. */
	before?: Date;
	/** The maximum number of docs to fetch. */
	limit?: number;
}
