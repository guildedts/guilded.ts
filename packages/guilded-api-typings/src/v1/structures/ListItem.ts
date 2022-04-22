/**
 * The API list item object.
 * @see https://www.guilded.gg/docs/api/listItems/ListItem
 */
export interface APIListItem extends APIListItemSummary {
	/** The note of the list item. */
	note?: {
		/** The content of the note. */
		content: string;
	} & APIListItemNote;
}

/**
 * The API list item summary object.
 * @see https://www.guilded.gg/docs/api/listItems/ListItemSummary
 */
export interface APIListItemSummary {
	/** The ID of the list item. */
	id: string;
	/** The ID of the server the list item was created on. */
	serverId: string;
	/** The ID of the channel the list item was created in. */
	channelId: string;
	/** The message of the list item. */
	message: string;
	/** The time the list item was created. */
	createdAt: string;
	/** The ID of the user who created the list item. */
	createdBy: string;
	/** The ID of the webhook that created the list item. */
	creartedByWebhookId?: string;
	/** The time the list item was edited. */
	updatedAt?: string;
	/** The ID of the user who edited the list item. */
	updatedBy?: string;
	/** The ID of the parent list item. */
	parentListItemId?: string;
	/** The time the list item was created. */
	completedAt?: string;
	/** The ID of the user who completed the list item. */
	completedBy?: string;
	/** The note of the list item. */
	note?: APIListItemNote;
}

/**
 * The API list item note object.
 * @see https://www.guilded.gg/docs/api/listItems/ListItem
 */
export interface APIListItemNote {
	/** The time the note was created. */
	createdAt: string;
	/** The ID of the user who created the note. */
	createdBy: string;
	/** The time the note was edited. */
	updatedAt?: string;
	/** The ID of the user who edited the note. */
	updatedBy?: string;
}

/**
 * The payload for creating a list item.
 * @See https://www.guilded.gg/docs/api/listItems/ListItemCreate
 */
export interface APIListItemPayload {
	/** The message of the list item. */
	message: string;
	/** The note of the list item. */
	note?: APIListItemNotePayload;
}

/**
 * The API list item note payload object.
 * @see https://www.guilded.gg/docs/api/listItems/ListItemCreate
 */
export interface APIListItemNotePayload {
	/** The content of the note. */
	content: string;
}
