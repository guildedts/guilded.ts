import { APIChannel } from 'guilded-api-typings';
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
	 * @param data The data of the calendar channel
	 * @param cache Whether to cache the calendar channel
	 */
	constructor(client: Client, data: APIChannel, cache?: boolean) {
		super(client, data, cache);
		this.events = new CalendarEventManager(this);
	}
}
