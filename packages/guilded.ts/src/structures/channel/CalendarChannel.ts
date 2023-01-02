import { RESTPostCalendarEventJSONBody, APIChannel } from 'guilded-api-typings';
import { CalendarEventManager } from '../../managers/calendarEvent/CalendarEventManager';
import { Client } from '../Client';
import { Channel } from './Channel';

/**
 * Represents a calendar channel on Guilded
 */
export class CalendarChannel extends Channel {
	/**
	 * The manager for calendar events
	 */
	readonly events: CalendarEventManager;

	/**
	 * @param client The client
	 * @param raw The data of the calendar channel
	 * @param cache Whether to cache the calendar channel
	 */
	constructor(client: Client, raw: APIChannel, cache?: boolean) {
		super(client, raw, cache);
		this.events = new CalendarEventManager(this);
	}

	/**
	 * Create a calendar event in the channel
	 * @param payload The payload of the calendar event
	 * @returns The created calendar event
	 */
	createEvent(payload: RESTPostCalendarEventJSONBody) {
		return this.events.create(payload);
	}
}
