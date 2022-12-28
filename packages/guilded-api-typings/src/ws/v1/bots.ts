import { WebSocketBaseEventPayload, WebSocketEvent, APIServer } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/websockets/BotServerMembershipCreated
 */
export type WebSocketServerAddEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ServerAdd,
	WebSocketServerAddEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/BotServerMembershipCreated
 */
export interface WebSocketServerAddEventData {
	/**
	 * The server
	 */
	server: APIServer;
	/**
	 * The ID of the user that added the bot to the server
	 */
	createdBy: string;
}

/**
 * https://www.guilded.gg/docs/api/websockets/BotServerMembershipDeleted
 */
export type WebSocketServerRemoveEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ServerRemove,
	WebSocketServerRemoveEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/BotServerMembershipDeleted
 */
export interface WebSocketServerRemoveEventData {
	/**
	 * The server
	 */
	server: APIServer;
	/**
	 * The ID of the user that removed the bot from the server
	 */
	deletedBy: string;
}
