import { APIListItem, APIListItemNote, APIListItemSummary } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/listItems/ListItemCreate
 */
export interface RESTPostListItemJSONBody extends Pick<APIListItem, 'message'> {
	/**
	 * The note of the list item
	 */
	note?: Pick<APIListItemNote, 'content'>;
}
/**
 * https://www.guilded.gg/docs/api/listItems/ListItemCreate
 */
export type RESTPostListItemResult = RESTGetListItemResult;

/**
 * https://www.guilded.gg/docs/api/listItems/ListItemReadMany
 */
export interface RESTGetListItemsResult {
	/**
	 * The list items
	 */
	listItems: APIListItemSummary[];
}

/**
 * https://www.guilded.gg/docs/api/listItems/ListItemRead
 */
export interface RESTGetListItemResult {
	/**
	 * The list item
	 */
	listItem: APIListItem;
}

/**
 * https://www.guilded.gg/docs/api/listItems/ListItemUpdate
 */
export type RESTPutListItemJSONBody = RESTPostListItemJSONBody;
/**
 * https://www.guilded.gg/docs/api/listItems/ListItemUpdate
 */
export type RESTPutListItemResult = RESTGetListItemResult;

/**
 * https://www.guilded.gg/docs/api/listItems/ListItemDelete
 */
export type RESTDeleteListItemResult = never;

/**
 * https://www.guilded.gg/docs/api/listItems/ListItemCompleteCreate
 */
export type RESTPostListItemCompleteResult = never;

/**
 * https://www.guilded.gg/docs/api/listItems/ListItemCompleteDelete
 */
export type RESTDeleteListItemCompleteResult = never;
