import {
	APIFetchWebhooksQuery,
	APIWebhook,
	APIWebhookEditPayload,
	APIWebhookPayload,
	Routes,
} from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/**
 * The webhook router for the Guilded REST API.
 * @example new WebhookRouter(rest);
 */
export class WebhookRouter extends BaseRouter {
	/**
	 * Fetch a webhook from Guilded.
	 * @param serverId The ID of the server the webhook belongs to.
	 * @param webhookId The ID of the webhook to fetch.
	 * @returns The fetched webhook.
	 * @example webhooks.fetchSingle('abc', 'abc');
	 */
	async fetchSingle(serverId: string, webhookId: string) {
		const { webhook } = await this.rest.get<{ webhook: APIWebhook }>(
			Routes.webhook(serverId, webhookId),
		);
		return webhook;
	}

	/**
	 * Fetch webhooks from Guilded.
	 * @param serverId The ID of the server the webhooks belong to.
	 * @param channelId The ID of the channel to fetch webhooks from.
	 * @returns The fetched webhooks.
	 * @example webhooks.fetchMany('abc', 'abc');
	 */
	async fetchMany(serverId: string, channelId: string) {
		const { webhooks } = await this.rest.get<{ webhooks: APIWebhook[] }, APIFetchWebhooksQuery>(
			Routes.webhooks(serverId),
			{ channelId },
		);
		return webhooks;
	}

	/**
	 * Create a webhook on Guilded.
	 * @param serverId The ID of the server the webhook belongs to.
	 * @param channelId The ID of the channel the webhook belongs to.
	 * @param name The name of the webhook.
	 * @returns The created webhook.
	 * @example webhooks.create('abc', 'abc', 'Webhook');
	 */
	async create(serverId: string, channelId: string, name: string) {
		const { webhook } = await this.rest.post<{ webhook: APIWebhook }, APIWebhookPayload>(
			Routes.webhooks(serverId),
			{ channelId, name },
		);
		return webhook;
	}

	/**
	 * Edit a webhook on Guilded.
	 * @param serverId The ID of the server the webhook belongs to.
	 * @param webhookId The ID of the webhook to edit.
	 * @param name The name of the webhook.
	 * @param channelId The ID of the channel the webhook belongs to.
	 * @returns The edited webhook.
	 * @example webhooks.edit('abc', 'abc', 'Webhook');
	 */
	async edit(serverId: string, webhookId: string, name: string, channelId?: string) {
		const { webhook } = await this.rest.put<{ webhook: APIWebhook }, APIWebhookEditPayload>(
			Routes.webhook(serverId, webhookId),
			{ channelId, name },
		);
		return webhook;
	}

	/**
	 * Delete a webhook from Guilded.
	 * @param serverId The ID of the server the webhook belongs to.
	 * @param webhookId The ID of the webhook to delete.
	 * @example webhooks.delete('abc', 'abc');
	 */
	delete(serverId: string, webhookId: string) {
		return this.rest.delete<void>(Routes.webhook(serverId, webhookId));
	}
}
