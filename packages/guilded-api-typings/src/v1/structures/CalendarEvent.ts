import { APIMentions } from "./Channel";

/**
 * Represents a calendar event on Guilded.
 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEvent
 */
export interface APICalendarEvent {
	/** The ID of the calendar event. */
	id: number;
	/** The ID of the server the calendar event belongs to. */
	serverId: string;
	/** The ID of the channel the calendar event belongs to. */
	channelId: string;
	/** The name of the calendar event. */
	name: string;
	/** The description of the calendar event. */
	description?: string;
	/** The location of the calendar event. */
	location?: string;
	/** The url of the calendar event. */
	url?: string;
	/** The color of the calendar event. */
	color?: number;
	/** The date the calendar event starts. */
	startsAt: string;
	/** The duration of the calendar event. */
	duration?: number;
	/** Whether the calendar event is private. */
	isPrivate?: boolean;
	/** The mentions of the calendar event. */
	mentions?: APIMentions;
	/** The date the calendar event was created. */
	createdAt: string;
	/** The ID of the user that created the calendar event. */
	createdBy: string;
	/** The cancellation of the calendar event. */
	cancellation?: APICalendarEventCancellation;
}

/**
 * Represents a calendar event cancellation on Guilded.
 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEvent
 */
export interface APICalendarEventCancellation {
    /** The description of the cancellation. */
    description?: string;
    /** The ID of the user that created the cancellation. */
    createdBy?: string;
}

/**
 * The payload for creating a calendar event.
 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventCreate
 */
export interface APICalendarEventPayload extends APICalendarEventEditPayload {
    name: string;
}

/**
 * The payload for editing a calendar event.
 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventUpdate
 */
export interface APICalendarEventEditPayload {
    /** The name of the calendar event. */
    name?: string;
    /** The description of the calendar event. */
    description?: string;
    /** The location of the calendar event. */
    location?: string;
    /** The date the calendar event starts. */
    startsAt?: string;
    /** The url of the calendar event. */
    url?: string;
    /** The color of the calendar event. */
    color?: number;
    /** The duration of the calendar event. */
    duration?: number;
    /** Whether the calendar event is private. */
    isPrivate?: boolean;
}

/**
 * The query parameters for fetching calendar events.
 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventReadMany
 */
export interface APIFetchCalendarEventsQuery {
	/** The date to fetch calendar events before. */
	before?: string;
	/** The date to fetch calendar events after. */
	after?: string;
	/** The maximum number of calendar events to fetch. */
	limit?: number;
}
