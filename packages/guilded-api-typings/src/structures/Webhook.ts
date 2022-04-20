/**
 * The API webhook object.
 * @see https://www.guilded.gg/docs/api/webhook/Webhook
 */
export interface APIWebhook {
    id: string;
    name: string;
    serverId: string;
    channelId: string;
    createdAt: string;
    createdBy: string;
    deletedAt?: string;
    token?: string;
}

/**
 * The payload for creating a webhook.
 * @see https://www.guilded.gg/docs/api/webhook/WebhookCreate
 */
export interface APIWebhookPayload {
    name: string;
    channelId: string;
}

/**
 * The query parameters for getting webhooks.
 * @see https://www.guilded.gg/docs/api/webhook/WebhookReadMany
 */
export interface APIGetWebhooksQuery {
    channelId: string;
}
