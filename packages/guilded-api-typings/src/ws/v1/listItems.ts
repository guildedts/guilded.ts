import { APIListItem, WebSocketBaseEventPayload, WebSocketEvent } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/websockets/ListItemCreated
 */
export type WebSocketListItemCreateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ListItemCreate,
	WebSocketListItemCreateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ListItemCreated
 */
export interface WebSocketListItemCreateEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The list item
	 */
	listItem: APIListItem;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ListItemUpdated
 */
export type WebSocketListItemUpdateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ListItemUpdate,
	WebSocketListItemUpdateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ListItemUpdated
 */
export type WebSocketListItemUpdateEventData = WebSocketListItemCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ListItemDeleted
 */
export type WebSocketListItemDeleteEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ListItemDelete,
	WebSocketListItemDeleteEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ListItemDeleted
 */
export type WebSocketListItemDeleteEventData = WebSocketListItemCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ListItemCompleted
 */
export type WebSocketListItemCompleteEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ListItemComplete,
	WebSocketListItemCompleteEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ListItemCompleted
 */
export type WebSocketListItemCompleteEventData = WebSocketListItemCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ListItemUncompleted
 */
export type WebSocketListItemUncompleteEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ListItemUncomplete,
	WebSocketListItemUncompleteEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ListItemUncompleted
 */
export type WebSocketListItemUncompleteEventData = WebSocketListItemCreateEventData;
