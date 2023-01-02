import {
	RESTGetWebhooksQuery,
	APIWebhook,
	RESTPutWebhookJSONBody,
	RESTPostWebhookMessageJSONBody,
	RESTPostWebhookJSONBody,
	Routes,
} from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';
import { RESTManager } from '..';

/**
 * The webhook router for the Guilded REST API
 */
export class WebhookRouter extends BaseRouter {
	/**
	 * Fetch a webhook from Guilded
	 * @param serverId The ID of the server
	 * @param webhookId The ID of the webhook
	 * @returns The fetched webhook
	 */
	async fetchSingle(serverId: string, webhookId: string) {
		const { webhook } = await this.rest.get<{ webhook: APIWebhook }>(
			Routes.webhook(serverId, webhookId),
		);
		return webhook;
	}

	/**
	 * Fetch webhooks from Guilded
	 * @param serverId The ID of the server
	 * @param channelId The ID of the channel
	 * @returns The fetched webhooks
	 */
	async fetchMany(serverId: string, channelId: string) {
		const { webhooks } = await this.rest.get<{ webhooks: APIWebhook[] }, RESTGetWebhooksQuery>(
			Routes.webhooks(serverId),
			{ channelId },
		);
		return webhooks;
	}

	/**
	 * Create a webhook message on Guilded
	 * @param webhookId The ID of the webhook
	 * @param webhookToken The token of the webhook
	 * @param payload The payload of the message
	 */
	async send(webhookId: string, webhookToken: string, payload: RESTPostWebhookMessageJSONBody) {
		const rest = new RESTManager({ proxyUrl: 'https://media.guilded.gg' });
		rest.post(`/${webhookId}/${webhookToken}`, payload);
	}

	/**
	 * Create a webhook on Guilded
	 * @param serverId The ID of the server
	 * @param channelId The ID of the channel
	 * @param name The name of the webhook
	 * @returns The created webhook
	 */
	async create(serverId: string, channelId: string, name: string) {
		const { webhook } = await this.rest.post<{ webhook: APIWebhook }, RESTPostWebhookJSONBody>(
			Routes.webhooks(serverId),
			{ channelId, name },
		);
		return webhook;
	}

	/**
	 * Edit a webhook on Guilded
	 * @param serverId The ID of the server
	 * @param webhookId The ID of the webhook
	 * @param name The name of the webhook
	 * @param channelId The ID of the channel
	 * @returns The edited webhook
	 */
	async edit(serverId: string, webhookId: string, name: string, channelId?: string) {
		const { webhook } = await this.rest.put<{ webhook: APIWebhook }, RESTPutWebhookJSONBody>(
			Routes.webhook(serverId, webhookId),
			{ channelId, name },
		);
		return webhook;
	}

	/**
	 * Delete a webhook from Guilded
	 * @param serverId The ID of the server
	 * @param webhookId The ID of the webhook
	 */
	delete(serverId: string, webhookId: string) {
		return this.rest.delete<void>(Routes.webhook(serverId, webhookId));
	}
}
