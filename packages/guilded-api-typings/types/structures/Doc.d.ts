/**
 * The API doc object.
 * @see https://www.guilded.gg/docs/api/docs/Doc
 */
export interface APIDoc {
	id: string;
	serverId: string;
	channelId: string;
	title: string;
	content: string;
	createdAt: string;
	createdBy: string;
	updatedAt?: string;
	updatedBy?: string;
}
/**
 * The payload for creating a doc.
 * @see https://www.guilded.gg/docs/api/docs/DocCreate
 */
export interface APIDocPayload {
	title: string;
	content: string;
}
/**
 * The query parameters for getting docs.
 * @see https://www.guilded.gg/docs/api/docs/DocReadMany
 */
export interface APIGetDocsQuery {
	before?: string;
	limit?: number;
}
//# sourceMappingURL=Doc.d.ts.map
