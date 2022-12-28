import { APICalendarEvent, APICalendarEventRsvp } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventCreate
 */
export interface RESTPostCalendarEventJSONBody
	extends Pick<
		APICalendarEvent,
		| 'name'
		| 'description'
		| 'location'
		| 'url'
		| 'color'
		| 'rsvpLimit'
		| 'duration'
		| 'isPrivate'
	> {
	/**
	 * When the calendar event starts
	 */
	startsAt?: Date;
}
/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventCreate
 */
export type RESTPostCalendarEventResult = RESTGetCalendarEventResult;

/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventReadMany
 */
export interface RESTGetCalendarEventsQuery {
	/**
	 * The date that will be used to filter out results for the current page
	 */
	before?: Date;
	/**
	 * The date that will be used to filter out results for the current page
	 */
	after?: Date;
	/**
	 * The max size of the page (range: `1`-`500`)
	 *
	 * @default 25
	 */
	limit?: number;
}
/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventReadMany
 */
export interface RESTGetCalendarEventsResult {
	/**
	 * The calendar events
	 */
	calendarEvents: APICalendarEvent[];
}

/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRead
 */
export interface RESTGetCalendarEventResult {
	/**
	 * The calendar event
	 */
	calendarEvent: APICalendarEvent;
}

/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventUpdate
 */
export type RESTPatchCalendarEventJSONBody = Partial<RESTPostCalendarEventJSONBody>;
/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventUpdate
 */
export type RESTPatchCalendarEventResult = RESTGetCalendarEventResult;

/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventDelete
 */
export type RESTDeleteCalendarEventResult = never;

/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvpRead
 */
export interface RESTGetCalendarEventRsvpResult {
	/**
	 * The calendar event RSVP
	 */
	calendarEventRsvp: APICalendarEventRsvp;
}

/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvpUpdate
 */
export type RESTPutCalendarEventRsvpJSONBody = Pick<APICalendarEventRsvp, 'status'>;
/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvpUpdate
 */
export type RESTPutCalendarEventRsvpResult = RESTGetCalendarEventRsvpResult;

/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvpDelete
 */
export type RESTDeleteCalendarEventRsvpResult = never;

/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvpReadMany
 */
export interface RESTGetCalendarEventRsvpsResult {
	/**
	 * The calendar event RSVPs
	 */
	calendarEventRsvps: APICalendarEventRsvp[];
}
