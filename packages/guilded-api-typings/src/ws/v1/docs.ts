import { APIDoc, WebSocketBaseEventPayload, WebSocketEvent } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/websockets/DocCreated
 */
export type WebSocketDocCreateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.DocCreate,
	WebSocketDocCreateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/DocCreated
 */
export interface WebSocketDocCreateEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The doc
	 */
	doc: APIDoc;
}

/**
 * https://www.guilded.gg/docs/api/websockets/DocUpdated
 */
export type WebSocketDocUpdateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.DocUpdate,
	WebSocketDocUpdateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/DocUpdated
 */
export type WebSocketDocUpdateEventData = WebSocketDocCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/DocDeleted
 */
export type WebSocketDocDeleteEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.DocDelete,
	WebSocketDocDeleteEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/DocDeleted
 */
export type WebSocketDocDeleteEventData = WebSocketDocCreateEventData;
