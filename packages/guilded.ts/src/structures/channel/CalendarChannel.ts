import { RESTPostCalendarEventJSONBody, APIChannel } from 'guilded-api-typings';
import { CalendarEventManager } from '../../managers/calendarEvent/CalendarEventManager';
import { Client } from '../Client';
import { Channel } from './Channel';

/**
 * Represents a calendar channel on Guilded.
 * @example new CalendarChannel(client, rawChannel);
 */
export class CalendarChannel extends Channel {
	/** The manager of events that belong to the calendar channel. */
	readonly events: CalendarEventManager;

	/**
	 * @param client The client the calendar channel belongs to.
	 * @param raw The raw data of the calendar channel.
	 * @param cache Whether to cache the calendar channel.
	 */
	constructor(client: Client, raw: APIChannel, cache?: boolean) {
		super(client, raw, cache);
		this.events = new CalendarEventManager(this);
	}

	/**
	 * Creates a event in the calendar channel.
	 * @param payload The payload of the calendar event.
	 * @returns The created calendar event.
	 * @example channel.createEvent({ name: 'Event!' });
	 */
	createEvent(payload: RESTPostCalendarEventJSONBody) {
		return this.events.create(payload);
	}
}
