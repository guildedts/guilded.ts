import { Collection } from '@discordjs/collection';
import {
	RESTPatchCalendarEventJSONBody,
	RESTPostCalendarEventJSONBody,
	RESTGetCalendarEventsQuery,
} from 'guilded-api-typings';
import { CalendarEvent } from '../../structures/calendarEvent/CalendarEvent';
import { CalendarChannel } from '../../structures/channel/CalendarChannel';
import { BaseManager, FetchManyOptions, FetchOptions } from '../BaseManager';

/**
 * The manager for calendar events
 */
export class CalendarEventManager extends BaseManager<number, CalendarEvent> {
	/**
	 * @param channel The calendar channel
	 */
	constructor(public readonly channel: CalendarChannel) {
		super(channel.client, channel.client.options.maxCalendarEventCache);
	}

	/**
	 * Fetch a calendar event from the channel
	 * @param calendarEvent The calendar event
	 * @param options The options to fetch the calendar event with
	 * @returns The fetched calendar event
	 */
	fetch(calendarEvent: number | CalendarEvent, options?: FetchOptions): Promise<CalendarEvent>;
	/**
	 * Fetch calendar events from the channel
	 * @param options The options to fetch calendar events with
	 * @returns The fetched calendar events
	 */
	fetch(options?: CalendarEventFetchManyOptions): Promise<Collection<number, CalendarEvent>>;
	fetch(arg1?: number | CalendarEvent | CalendarEventFetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'number' || arg1 instanceof CalendarEvent)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	private async fetchSingle(calendarEvent: number | CalendarEvent, options?: FetchOptions) {
		calendarEvent = calendarEvent instanceof CalendarEvent ? calendarEvent.id : calendarEvent;
		const cached = this.cache.get(calendarEvent);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.calendarEvents.fetch(this.channel.id, calendarEvent);
		return new CalendarEvent(this.channel, raw, options?.cache);
	}

	private async fetchMany(options?: CalendarEventFetchManyOptions) {
		const raw = await this.client.api.calendarEvents.fetch(this.channel.id, options);
		const calendarEvents = new Collection<number, CalendarEvent>();
		for (const data of raw) {
			const calendarEvent = new CalendarEvent(this.channel, data, options?.cache);
			calendarEvents.set(data.id, calendarEvent);
		}
		return calendarEvents;
	}

	/**
	 * Create a calendar event in the channel
	 * @param payload The payload of the calendar event
	 * @returns The created calendar event
	 */
	async create(payload: RESTPostCalendarEventJSONBody) {
		const raw = await this.client.api.calendarEvents.create(this.channel.id, payload);
		return new CalendarEvent(this.channel, raw);
	}

	/**
	 * Edit a calendar event in the channel
	 * @param calendarEvent The calendar event
	 * @param payload The payload of the calendar event
	 * @returns The edited calendar event
	 */
	async edit(calendarEvent: number | CalendarEvent, payload: RESTPatchCalendarEventJSONBody) {
		calendarEvent = calendarEvent instanceof CalendarEvent ? calendarEvent.id : calendarEvent;
		const raw = await this.client.api.calendarEvents.edit(
			this.channel.id,
			calendarEvent,
			payload,
		);
		return new CalendarEvent(this.channel, raw);
	}

	/**
	 * Delete a calendar event from the channel
	 * @param calendarEvent The calendar event
	 */
	delete(calendarEvent: number | CalendarEvent) {
		calendarEvent = calendarEvent instanceof CalendarEvent ? calendarEvent.id : calendarEvent;
		return this.client.api.calendarEvents.delete(this.channel.id, calendarEvent);
	}
}

/**
 * The options for fetching calendar events
 */
export interface CalendarEventFetchManyOptions
	extends FetchManyOptions,
		RESTGetCalendarEventsQuery {}
