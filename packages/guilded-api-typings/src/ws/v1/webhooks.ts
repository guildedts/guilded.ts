import { APIWebhook, WebSocketBaseEventPayload, WebSocketEvent } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/websockets/ServerWebhookCreated
 */
export type WebSocketWebhookCreateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.WebhookCreate,
	WebSocketWebhookCreateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ServerWebhookCreated
 */
export interface WebSocketWebhookCreateEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The webhook
	 */
	webhook: APIWebhook;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ServerWebhookUpdated
 */
export type WebSocketWebhookUpdateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.WebhookUpdate,
	WebSocketWebhookUpdateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ServerWebhookUpdated
 */
export type WebSocketWebhookUpdateEventData = WebSocketWebhookCreateEventData;
