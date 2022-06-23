import { APICalendarEventPayload, APIChannel, APIChannelType } from 'guilded-api-typings';
import { CalendarEventManager } from '../../managers/CalendarEventManager';
import { Client } from '../Client';
import { Channel } from './Channel';

/** Represents a calendar channel on Guilded. */
export class CalendarChannel extends Channel {
	public declare readonly type: APIChannelType.Calendar;

	/** The manager of events that belong to the calendar channel. */
	public readonly events: CalendarEventManager;

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
	 */
	public createEvent(payload: APICalendarEventPayload) {
		return this.events.create(payload);
	}
}
