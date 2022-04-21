/**
 * The API list item object.
 * @see https://www.guilded.gg/docs/api/listItems/ListItem
 */
export interface APIListItem extends APIListItemSummary {
	note?: {
		content: string;
	} & APIListItemNote;
}
/**
 * The API list item summary object.
 * @see https://www.guilded.gg/docs/api/listItems/ListItemSummary
 */
export interface APIListItemSummary {
	id: string;
	serverId: string;
	channelId: string;
	message: string;
	createdAt: string;
	createdBy: string;
	creartedByWebhookId?: string;
	updatedAt?: string;
	updatedBy?: string;
	parentListItemId?: string;
	completedAt?: string;
	completedBy?: string;
	note?: APIListItemNote;
}
/**
 * The API list item note object.
 * @see https://www.guilded.gg/docs/api/listItems/ListItem
 */
export interface APIListItemNote {
	createdAt: string;
	createdBy: string;
	updatedAt?: string;
	updatedBy?: string;
}
/**
 * The payload for creating a list item.
 * @See https://www.guilded.gg/docs/api/listItems/ListItemCreate
 */
export interface APIListItemPayload {
	message: string;
	note?: APIListItemNotePayload;
}
/**
 * The API list item note payload object.
 * @see https://www.guilded.gg/docs/api/listItems/ListItemCreate
 */
export interface APIListItemNotePayload {
	content: string;
}
//# sourceMappingURL=ListItem.d.ts.map
