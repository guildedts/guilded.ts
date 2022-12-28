/**
 * https://www.guilded.gg/docs/api/webhook/Webhook
 */
export interface APIWebhook {
	/**
	 * The ID of the webhook
	 */
	id: string;
	/**
	 * The name of the webhook (`1`-`128` characters)
	 */
	name: string;
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The ID of the channel
	 */
	channelId: string;
	/**
	 * When the webhook was created
	 */
	createdAt: string;
	/**
	 * The ID of the user that created the webhook
	 */
	createdBy: string;
	/**
	 * When the webhook was deleted
	 */
	deletedAt?: string;
	/**
	 * The token of the webhook
	 */
	token?: string;
}
