import { APIDoc } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/docs/DocCreate
 */
export type RESTPostDocJSONBody = Pick<APIDoc, 'title' | 'content'>;
/**
 * https://www.guilded.gg/docs/api/docs/DocCreate
 */
export type RESTPostDocResult = RESTGetDocResult;

/**
 * https://www.guilded.gg/docs/api/docs/DocReadMany
 */
export interface RESTGetDocsQuery {
	/**
	 * The date that will be used to filter out results for the current page
	 */
	before?: Date;
	/**
	 * The max size of the page (range: `1`-`100`)
	 *
	 * @default 25
	 */
	limit?: number;
}
/**
 * https://www.guilded.gg/docs/api/docs/DocReadMany
 */
export interface RESTGetDocsResult {
	/**
	 * The docs
	 */
	docs: APIDoc[];
}

/**
 * https://www.guilded.gg/docs/api/docs/DocRead
 */
export interface RESTGetDocResult {
	/**
	 * The doc
	 */
	doc: APIDoc;
}

/**
 * https://www.guilded.gg/docs/api/docs/DocUpdate
 */
export type RESTPutDocJSONBody = RESTPostDocJSONBody;
/**
 * https://www.guilded.gg/docs/api/docs/DocUpdate
 */
export type RESTPutDocResult = RESTGetDocResult;

/**
 * https://www.guilded.gg/docs/api/docs/DocDelete
 */
export type RESTDeleteDocResult = never;
