import { APIWebhook, RESTPutMessageJSONBody } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/webhook/WebhookCreate
 */
export type RESTPostWebhookJSONBody = Pick<APIWebhook, 'name' | 'channelId'>;
/**
 * https://www.guilded.gg/docs/api/webhook/WebhookCreate
 */
export type RESTPostWebhookResult = RESTGetWebhookResult;

/**
 * https://www.guilded.gg/docs/api/webhook/WebhookReadMany
 */
export type RESTGetWebhooksQuery = Pick<APIWebhook, 'channelId'>;
/**
 * https://www.guilded.gg/docs/api/webhook/WebhookReadMany
 */
export interface RESTGetWebhooksResult {
	/**
	 * The webhooks
	 */
	webhooks: APIWebhook[];
}

/**
 * https://www.guilded.gg/docs/api/webhook/WebhookRead
 */
export interface RESTGetWebhookResult {
	/**
	 * The webhook
	 */
	webhook: APIWebhook;
}

/**
 * https://www.guilded.gg/docs/api/webhook/WebhookUpdate
 */
export type RESTPutWebhookJSONBody = Pick<RESTPostWebhookJSONBody, 'name'> &
	Partial<Pick<RESTPostWebhookJSONBody, 'channelId'>>;
/**
 * https://www.guilded.gg/docs/api/webhook/WebhookUpdate
 */
export type RESTPutWebhookResult = RESTGetWebhookResult;

/**
 * https://www.guilded.gg/docs/api/webhook/WebhookDelete
 */
export type RESTDeleteWebhookResult = never;

/**
 * https://guildedapi.com/resources/webhook/#execute-webhook
 */
export interface RESTPostWebhookMessageJSONBody extends RESTPutMessageJSONBody {
	/**
	 * The name of the webhook (`1`-`128` characters)
	 */
	name?: string;
	/**
	 * The avatar of the webhook
	 */
	avatar_url?: string;
}
