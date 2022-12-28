import { APIMentions } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEvent
 */
export interface APICalendarEvent {
	/**
	 * The ID of the calendar event (min value: `1`)
	 */
	id: number;
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The ID of the channel
	 */
	channelId: string;
	/**
	 * The name of the calendar event (`1`-`60` characters)
	 */
	name: string;
	/**
	 * The description of the calendar event (`1`-`8000` characters)
	 */
	description?: string;
	/**
	 * The location of the calendar event (`1`-`8000` characters)
	 */
	location?: string;
	/**
	 * The URL of the calendar event
	 */
	url?: string;
	/**
	 * The color of the calendar event (range: `0x0`-`0xffffff`)
	 */
	color?: number;
	/**
	 * The number of RSVPs allowed before waitlisting (min value: `1`)
	 */
	rsvpLimit?: number;
	/**
	 * When the calendar event starts
	 */
	startsAt: string;
	/**
	 * The duration of the calendar event **in minutes** (min value: `1`)
	 */
	duration?: number;
	/**
	 * Whether the calendar event is private
	 *
	 * @default false
	 */
	isPrivate?: boolean;
	/**
	 * The mentions of the calendar event
	 */
	mentions?: APIMentions;
	/**
	 * When the calendar event was created
	 */
	createdAt: string;
	/**
	 * The ID of the user that created the calendar event
	 */
	createdBy: string;
	/**
	 * The cancellation of the calendar event
	 */
	cancellation?: APICalendarEventCancellation;
}

/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEvent
 */
export interface APICalendarEventCancellation {
	/**
	 * The description of the calendar event cancellation (`1`-`140` characters)
	 */
	description?: string;
	/**
	 * The ID of the user that created the calendar event cancellation
	 */
	createdBy: string;
}

/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvp
 */
export interface APICalendarEventRsvp {
	/**
	 * The ID of the calendar event (min value: `1`)
	 */
	calendarEventId: number;
	/**
	 * The ID of the channel
	 */
	channelId: string;
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The ID of the user
	 */
	userId: string;
	/**
	 * The status of the calendar event RSVP
	 */
	status: CalendarEventRsvpStatus;
	/**
	 * The ID of the user that created the calendar event RSVP
	 */
	createdBy: string;
	/**
	 * When the calendar event RSVP was created
	 */
	createdAt: string;
	/**
	 * The ID of the user that updated the calendar event RSVP
	 */
	updatedBy?: string;
	/**
	 * When the calendar event RSVP was updated, if relevant
	 */
	updatedAt?: string;
}

/**
 * https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvp
 */
export enum CalendarEventRsvpStatus {
	/**
	 * Is going
	 */
	Going = 'going',
	/**
	 * Maybe going
	 */
	Maybe = 'maybe',
	/**
	 * Is not going
	 */
	Declined = 'declined',
	/**
	 * Invited
	 */
	Invited = 'invited',
	/**
	 * Waitlisted
	 */
	Waitlisted = 'waitlisted',
	/**
	 * Not responded
	 */
	NotResponded = 'not responded',
}
