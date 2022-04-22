/**
 * The API doc object.
 * @see https://www.guilded.gg/docs/api/docs/Doc
 */
export interface APIDoc {
	/** The ID of the doc. */
	id: string;
	/** The ID of the server the doc was created on. */
	serverId: string;
	/** The ID of the channel the doc was created in. */
	channelId: string;
	/** The title of the doc. */
	title: string;
	/** The content of the doc. */
	content: string;
	/** The time the doc was created. */
	createdAt: string;
	/** The ID of the user who created the doc. */
	createdBy: string;
	/** The time the doc was edited. */
	updatedAt?: string;
	/** The ID of the user who edited the doc. */
	updatedBy?: string;
}

/**
 * The payload for creating a doc.
 * @see https://www.guilded.gg/docs/api/docs/DocCreate
 */
export interface APIDocPayload {
	/** The title of the doc. */
	title: string;
	/** The content of the doc. */
	content: string;
}

/**
 * The query parameters for getting docs.
 * @see https://www.guilded.gg/docs/api/docs/DocReadMany
 */
export interface APIGetDocsQuery {
	/** The time string to get docs before. */
	before?: string;
	/** The kind of docs to get. */
	limit?: number;
}
