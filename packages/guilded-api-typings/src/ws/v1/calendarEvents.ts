import {
	APICalendarEvent,
	APICalendarEventRsvp,
	WebSocketBaseEventPayload,
	WebSocketEvent,
} from '../../v1';

/**
 * https://www.guilded.gg/docs/api/websockets/CalendarEventCreated
 */
export type WebSocketCalendarEventCreateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.CalendarEventCreate,
	WebSocketCalendarEventCreateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/CalendarEventCreated
 */
export interface WebSocketCalendarEventCreateEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The calendar event
	 */
	calendarEvent: APICalendarEvent;
}

/**
 * https://www.guilded.gg/docs/api/websockets/CalendarEventUpdated
 */
export type WebSocketCalendarEventUpdateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.CalendarEventUpdate,
	WebSocketCalendarEventUpdateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/CalendarEventUpdated
 */
export type WebSocketCalendarEventUpdateEventData = WebSocketCalendarEventCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/CalendarEventDeleted
 */
export type WebSocketCalendarEventDeleteEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.CalendarEventDelete,
	WebSocketCalendarEventDeleteEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/CalendarEventDeleted
 */
export type WebSocketCalendarEventDeleteEventData = WebSocketCalendarEventCreateEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/CalendarEventRsvpUpdated
 */
export type WebSocketCalendarEventRsvpUpdateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.CalendarEventRsvpUpdate,
	WebSocketCalendarEventRsvpUpdateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/CalendarEventRsvpUpdated
 */
export interface WebSocketCalendarEventRsvpUpdateEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The calendar event RSVP
	 */
	calendarEventRsvp: APICalendarEventRsvp;
}

/**
 * https://www.guilded.gg/docs/api/websockets/CalendarEventRsvpManyUpdated
 */
export type WebSocketCalendarEventRsvpsUpdateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.CalendarEventRsvpsUpdate,
	WebSocketCalendarEventRsvpsUpdateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/CalendarEventRsvpManyUpdated
 */
export interface WebSocketCalendarEventRsvpsUpdateEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The calendar event RSVPs
	 */
	calendarEventRsvps: APICalendarEventRsvp[];
}

/**
 * https://www.guilded.gg/docs/api/websockets/CalendarEventRsvpDeleted
 */
export type WebSocketCalendarEventRsvpDeleteEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.CalendarEventRsvpDelete,
	WebSocketCalendarEventRsvpDeleteEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/CalendarEventRsvpDeleted
 */
export type WebSocketCalendarEventRsvpDeleteEventData = WebSocketCalendarEventRsvpUpdateEventData;
