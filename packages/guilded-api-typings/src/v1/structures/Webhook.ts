/**
 * The API webhook object.
 * @see https://www.guilded.gg/docs/api/webhook/Webhook
 */
export interface APIWebhook {
	/** The ID of the webhook. */
	id: string;
	/** The name of the webhook. */
	name: string;
	/** The ID of the server the webhook is from. */
	serverId: string;
	/** The ID of the channel the webhook is from. */
	channelId: string;
	/** The time the webhook was created. */
	createdAt: string;
	/** The ID of the user who created the webhook. */
	createdBy: string;
	/** The time the webhook was deleted. */
	deletedAt?: string;
	/** The token of the webhook. */
	token?: string;
}

/**
 * The payload for creating a webhook.
 * @see https://www.guilded.gg/docs/api/webhook/WebhookCreate
 */
export interface APIWebhookPayload {
	/** The name of the webhook. */
	name: string;
	/** The ID of the channel the webhook will be in. */
	channelId: string;
}

/**
 * The query parameters for getting webhooks.
 * @see https://www.guilded.gg/docs/api/webhook/WebhookReadMany
 */
export interface APIGetWebhooksQuery {
	/** The ID of the channel to get webhooks from. */
	channelId: string;
}
