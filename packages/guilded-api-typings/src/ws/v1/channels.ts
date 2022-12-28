import { APIChannel, WebSocketBaseEventPayload, WebSocketEvent } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/websockets/ServerChannelCreated
 */
export type WebSocketChannelCreateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ChannelCreate,
	WebSocketChannelCreateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ServerChannelCreated
 */
export interface WebSocketChannelCreateEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The channel
	 */
	channel: APIChannel;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ServerChannelUpdated
 */
export type WebSocketChannelUpdateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ChannelUpdate,
	WebSocketChannelUpdateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ServerChannelUpdated
 */
export type WebSocketChannelUpdateEventData = WebSocketChannelCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ServerChannelDeleted
 */
export type WebSocketChannelDeleteEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ChannelDelete,
	WebSocketChannelDeleteEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ServerChannelDeleted
 */
export type WebSocketChannelDeleteEventData = WebSocketChannelCreateEventData;
