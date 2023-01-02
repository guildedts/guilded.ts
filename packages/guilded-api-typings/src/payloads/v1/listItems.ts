import { APIMentions } from './channels';

/**
 * https://www.guilded.gg/docs/api/listItems/ListItem
 */
export interface APIListItem extends APIListItemSummary {
	note?: APIListItemNote;
}

/**
 * https://www.guilded.gg/docs/api/listItems/ListItemSummary
 */
export interface APIListItemSummary {
	/**
	 * The ID of the list item
	 */
	id: string;
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The ID of the channel
	 */
	channelId: string;
	/**
	 * The message of the list item
	 */
	message: string;
	/**
	 * The mentions of the list item
	 */
	mentions?: APIMentions;
	/**
	 * When the list item was created
	 */
	createdAt: string;
	/**
	 * The ID of the user that created the list item
	 *
	 * Note: If this list item has {@link createdByWebhookId}, this field will still be populated, but can be ignored
	 */
	createdBy: string;
	/**
	 * The ID of the webhook that created the list item, if it was created by a webhook
	 */
	createdByWebhookId?: string;
	/**
	 * When the list item was updated, if relevant
	 */
	updatedAt?: string;
	/**
	 * The ID of the user that updated the list item, if relevant
	 */
	updatedBy?: string;
	/**
	 * The ID of the parent list item, if the list item is nested
	 */
	parentListItemId?: string;
	/**
	 * When the list item was completed, if relevant
	 */
	completedAt?: string;
	/**
	 * The ID of the user that completed the list item
	 */
	completedBy?: string;
	/**
	 * The note of the list item
	 */
	note?: APIListItemNoteSummary;
}

/**
 * https://www.guilded.gg/docs/api/listItems/ListItem
 */
export interface APIListItemNote extends APIListItemNoteSummary {
	/**
	 * The mentions of the list item note
	 */
	mentions?: APIMentions;
	/**
	 * The content of the list item note
	 */
	content: string;
}

/**
 * https://www.guilded.gg/docs/api/listItems/ListItemSummary
 */
export interface APIListItemNoteSummary {
	/**
	 * When the list item note was created
	 */
	createdAt: string;
	/**
	 * The ID of the user that created the list item note
	 */
	createdBy: string;
	/**
	 * When the list item note was updated, if relevant
	 */
	updatedAt?: string;
	/**
	 * The ID of the user that updated the list item note
	 */
	updatedBy?: string;
}
