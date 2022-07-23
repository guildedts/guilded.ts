import { APIMentions } from './Channel';

/**
 * Represents a list item on Guilded.
 * @see https://www.guilded.gg/docs/api/listItems/ListItem
 */
export interface APIListItem extends APIListItemSummary {
	/** The note of the list item. */
	note?: APIListItemNote;
}

/**
 * Represents a summary of a list item on Guilded.
 * @see https://www.guilded.gg/docs/api/listItems/ListItemSummary
 */
export interface APIListItemSummary {
	/** The ID of the list item. */
	id: string;
	/** The ID of the server the list item belongs to. */
	serverId: string;
	/** The ID of the channel the list item belongs to. */
	channelId: string;
	/** The message of the list item. */
	message: string;
	/** The mentions of the list item. */
	mentions?: APIMentions;
	/** The date the list item was created. */
	createdAt: string;
	/** The ID of the user that created the list item. */
	createdBy: string;
	/** The ID of the webhook that created the list item. */
	createdByWebhookId?: string;
	/** The date the list item was edited. */
	updatedAt?: string;
	/** The ID of the user that edited the list item. */
	updatedBy?: string;
	/** The ID of the parent list item that the list item belongs to. */
	parentListItemId?: string;
	/** The date the list item was created. */
	completedAt?: string;
	/** The ID of the user that completed the list item. */
	completedBy?: string;
	/** The note of the list item. */
	note?: APIListItemNoteSummary;
}

/**
 * Represents a list item note on Guilded.
 * @see https://www.guilded.gg/docs/api/listItems/ListItem
 */
export interface APIListItemNote extends APIListItemNoteSummary {
	/** The content of the list item note. */
	content: string;
}

/**
 * Represents a summary of a note on a list item on Guilded.
 * @see https://www.guilded.gg/docs/api/listItems/ListItemSummary
 */
export interface APIListItemNoteSummary {
	/** The mentions of the list item note. */
	mentions?: APIMentions;
	/** The date the list item note was created. */
	createdAt: string;
	/** The ID of the user that created the list item note. */
	createdBy: string;
	/** The date the list item note was edited. */
	updatedAt?: string;
	/** The ID of the user that edited the list item note. */
	updatedBy?: string;
}

/**
 * The payload for creating a list item.
 * @see https://www.guilded.gg/docs/api/listItems/ListItemCreate
 */
export interface APIListItemPayload {
	/** The message of the list item. */
	message: string;
	/** The note of the list item. */
	note?: APIListItemNotePayload;
}

/**
 * The payload for creating a note.
 * @see https://www.guilded.gg/docs/api/listItems/ListItemCreate
 */
export interface APIListItemNotePayload {
	/** The content of the list item note. */
	content: string;
}
