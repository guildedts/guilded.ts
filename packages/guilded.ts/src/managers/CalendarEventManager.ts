import {
	APICalendarEventEditPayload,
	APICalendarEventPayload,
	APIFetchCalendarEventsQuery,
} from 'guilded-api-typings';
import { CacheCollection } from '../structures/CacheCollection';
import { CalendarEvent } from '../structures/CalendarEvent';
import { CalendarChannel } from '../structures/channel/CalendarChannel';
import { BaseManager } from './BaseManager';

/** The manager of calendar events that belong to a calendar channel. */
export class CalendarEventManager extends BaseManager<number, CalendarEvent> {
	/** @param channel The calendar channel the events belong to. */
	public constructor(public readonly channel: CalendarChannel) {
		super(channel.client, channel.client.options.maxCalendarEventCache);
	}

	/**
	 * Fetch a calendar event from the channel, or cache.
	 * @param calendarEventId The ID of the calendar event to fetch.
	 * @param cache Whether to cache the fetched calendar event.
	 * @returns The fetched calendar event.
	 */
	public fetch(calendarEventId: number, cache?: boolean): Promise<CalendarEvent>;
	/**
	 * Fetch calendar events from the channel.
	 * @param options The options to fetch the calendar events with.
	 * @param cache Whether to cache the fetched calendar events.
	 * @returns The fetched calendar events.
	 */
	public fetch(
		options?: APIFetchCalendarEventsQuery,
		cache?: boolean,
	): Promise<CacheCollection<number, CalendarEvent>>;
	/** @ignore */
	public fetch(arg1?: number | APIFetchCalendarEventsQuery, arg2?: boolean) {
		if (typeof arg1 === 'number') return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1, arg2);
	}

	/** @ignore */
	private async fetchSingle(calendarEventId: number, cache?: boolean) {
		const calendarEvent = this.cache.get(calendarEventId);
		if (calendarEvent) return calendarEvent;
		const raw = await this.client.api.calendarEvents.fetch(this.channel.id, calendarEventId);
		return new CalendarEvent(this.channel, raw, cache);
	}

	/** @ignore */
	private async fetchMany(options?: APIFetchCalendarEventsQuery, cache?: boolean) {
		const raw = await this.client.api.calendarEvents.fetch(this.channel.id, options);
		const calendarEvents = new CacheCollection<number, CalendarEvent>();
		for (const data of raw) {
			const calendarEvent = new CalendarEvent(this.channel, data, cache);
			calendarEvents.set(data.id, calendarEvent);
		}
		return calendarEvents;
	}

	/**
	 * Create a calendar event in the channel.
	 * @param payload The payload of the calendar event.
	 * @returns The created calendar event.
	 */
	public async create(payload: APICalendarEventPayload) {
		const raw = await this.client.api.calendarEvents.create(this.channel.id, payload);
		return new CalendarEvent(this.channel, raw);
	}

	/**
	 * Edit a calendar event in the channel.
	 * @param calendarEventId The ID of the calendar event to edit.
	 * @param payload The payload of the calendar event.
	 * @returns The edited calendar event.
	 */
	public async edit(calendarEventId: number, payload: APICalendarEventEditPayload) {
		const raw = await this.client.api.calendarEvents.edit(
			this.channel.id,
			calendarEventId,
			payload,
		);
		return new CalendarEvent(this.channel, raw);
	}

	/**
	 * Delete a calendar event from the channel.
	 * @param calendarEventId The ID of the calendar event to delete.
	 */
	public delete(calendarEventId: number) {
		return this.client.api.calendarEvents.delete(this.channel.id, calendarEventId);
	}
}
