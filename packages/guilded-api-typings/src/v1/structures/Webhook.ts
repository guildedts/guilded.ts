/**
 * Represents a webhook on Guilded.
 * @see https://www.guilded.gg/docs/api/webhook/Webhook
 */
export interface APIWebhook {
	/** The ID of the webhook. */
	id: string;
	/** The name of the webhook. */
	name: string;
	/** The ID of the server the webhook belongs to. */
	serverId: string;
	/** The ID of the channel the webhook belongs to. */
	channelId: string;
	/** The date the webhook was created. */
	createdAt: string;
	/** The ID of the user that created the webhook. */
	createdBy: string;
	/** The date the webhook was deleted. */
	deletedAt?: string;
	/** The token of the webhook. */
	token?: string;
}

/**
 * The payload for creating a webhook.
 * @see https://www.guilded.gg/docs/api/webhook/WebhookCreate
 */
export interface APIWebhookPayload extends APIWebhookEditPayload {
	/** The ID of the channel the webhook belongs to. */
	channelId: string;
}

/**
 * The payload for editing a webhook.
 * @see https://www.guilded.gg/docs/api/webhook/WebhookUpdate
 */
export interface APIWebhookEditPayload {
	/** The name of the webhook. */
	name: string;
	/** The ID of the channel the webhook belongs to. */
	channelId?: string;
}

/**
 * The options for fetching webhooks.
 * @see https://www.guilded.gg/docs/api/webhook/WebhookReadMany
 */
export interface APIhWebhookFetchManyOptions {
	/** The ID of the channel the webhooks belong to. */
	channelId: string;
}
