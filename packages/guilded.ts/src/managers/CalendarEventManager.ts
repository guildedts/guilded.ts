import Collection from '@discordjs/collection';
import {
	APICalendarEventEditPayload,
	APICalendarEventPayload,
	APIFetchCalendarEventsQuery,
} from 'guilded-api-typings';
import { CalendarEvent } from '../structures/CalendarEvent';
import { CalendarChannel } from '../structures/channel/CalendarChannel';
import { BaseManager, FetchManyOptions, FetchOptions } from './BaseManager';

/** The manager of calendar events that belong to a calendar channel. */
export class CalendarEventManager extends BaseManager<number, CalendarEvent> {
	/** @param channel The calendar channel the events belong to. */
	public constructor(public readonly channel: CalendarChannel) {
		super(channel.client, channel.client.options.maxCalendarEventCache);
	}

	/**
	 * Fetch a calendar event from the channel, or cache.
	 * @param calendarEvent The calendar event to fetch.
	 * @param options The options to fetch the calendar event with.
	 * @returns The fetched calendar event.
	 */
	public fetch(
		calendarEvent: number | CalendarEvent,
		options?: FetchOptions,
	): Promise<CalendarEvent>;
	/**
	 * Fetch calendar events from the channel.
	 * @param options The options to fetch calendar events with.
	 * @returns The fetched calendar events.
	 */
	public fetch(options?: FetchCalendarEventsOptions): Promise<Collection<number, CalendarEvent>>;
	/** @ignore */
	public fetch(arg1?: number | CalendarEvent | FetchCalendarEventsOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'number' || arg1 instanceof CalendarEvent)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(calendarEvent: number | CalendarEvent, options?: FetchOptions) {
		calendarEvent = calendarEvent instanceof CalendarEvent ? calendarEvent.id : calendarEvent;
		const cached = this.cache.get(calendarEvent);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.calendarEvents.fetch(this.channel.id, calendarEvent);
		return new CalendarEvent(this.channel, raw, options?.cache);
	}

	/** @ignore */
	private async fetchMany(options?: FetchCalendarEventsOptions) {
		const raw = await this.client.api.calendarEvents.fetch(this.channel.id, options);
		const calendarEvents = new Collection<number, CalendarEvent>();
		for (const data of raw) {
			const calendarEvent = new CalendarEvent(this.channel, data, options?.cache);
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
	 * @param calendarEvent The calendar event to edit.
	 * @param payload The payload of the calendar event.
	 * @returns The edited calendar event.
	 */
	public async edit(calendarEvent: number | CalendarEvent, payload: APICalendarEventEditPayload) {
		calendarEvent = calendarEvent instanceof CalendarEvent ? calendarEvent.id : calendarEvent;
		const raw = await this.client.api.calendarEvents.edit(
			this.channel.id,
			calendarEvent,
			payload,
		);
		return new CalendarEvent(this.channel, raw);
	}

	/**
	 * Delete a calendar event from the channel.
	 * @param calendarEvent The calendar event to delete.
	 */
	public delete(calendarEvent: number | CalendarEvent) {
		calendarEvent = calendarEvent instanceof CalendarEvent ? calendarEvent.id : calendarEvent;
		return this.client.api.calendarEvents.delete(this.channel.id, calendarEvent);
	}
}

/** The options for fetching calendar events. */
export interface FetchCalendarEventsOptions extends FetchManyOptions, APIFetchCalendarEventsQuery {}
