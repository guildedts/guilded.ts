import { Collection } from '@discordjs/collection';
import { CalendarEventRsvpStatus } from 'guilded-api-typings';
import { CalendarEvent } from '../../structures/calendarEvent/CalendarEvent';
import { CalendarEventRsvp } from '../../structures/calendarEvent/CalendarEventRsvp';
import { BaseManager, FetchManyOptions, FetchOptions } from '../BaseManager';

/**
 * The manager for calendar event RSVPs
 */
export class CalendarEventRsvpManager extends BaseManager<string, CalendarEventRsvp> {
	/**
	 * @param calendarEvent The calendar event
	 */
	constructor(public readonly calendarEvent: CalendarEvent) {
		super(calendarEvent.client, calendarEvent.client.options.maxCalendarEventRsvpCache);
	}

	/**
	 * Fetch a RSVP from the calendar event
	 * @param calendarEventRsvp The calendar event RSVP
	 * @param options The options to fetch the calendar event RSVP with
	 * @returns The fetched calendar event RSVP
	 */
	fetch(
		calendarEventRsvp: string | CalendarEventRsvp,
		options?: FetchOptions,
	): Promise<CalendarEventRsvp>;
	/**
	 * Fetch RSVPs from the calendar event
	 * @param options The options to fetch calendar event RSVPs with
	 * @returns The fetched calendar event RSVPs
	 */
	fetch(options?: FetchManyOptions): Promise<Collection<string, CalendarEventRsvp>>;
	fetch(arg1?: string | CalendarEventRsvp | FetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'string' || arg1 instanceof CalendarEventRsvp)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	private async fetchSingle(
		calendarEventRsvp: string | CalendarEventRsvp,
		options?: FetchOptions,
	) {
		calendarEventRsvp =
			calendarEventRsvp instanceof CalendarEventRsvp
				? calendarEventRsvp.userId
				: calendarEventRsvp;
		const cached = this.cache.get(calendarEventRsvp);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.calendarEventRsvps.fetch(
			this.calendarEvent.channel.id,
			this.calendarEvent.id,
			calendarEventRsvp,
		);
		return new CalendarEventRsvp(this.calendarEvent, raw, options?.cache);
	}

	private async fetchMany(options?: FetchManyOptions) {
		const raw = await this.client.api.calendarEventRsvps.fetch(
			this.calendarEvent.channel.id,
			this.calendarEvent.id,
		);
		const calendarEventRsvps = new Collection<string, CalendarEventRsvp>();
		for (const data of raw) {
			const calendarEventRsvp = new CalendarEventRsvp(
				this.calendarEvent,
				data,
				options?.cache,
			);
			calendarEventRsvps.set(calendarEventRsvp.userId, calendarEventRsvp);
		}
		return calendarEventRsvps;
	}

	/**
	 * Update a RSVP in the calendar event
	 * @param calendarEventRsvp The calendar event RSVP
	 * @param status The status of the calendar event RSVP
	 * @returns The updated calendar event RSVP
	 */
	async update(calendarEventRsvp: string | CalendarEventRsvp, status: CalendarEventRsvpStatus) {
		calendarEventRsvp =
			calendarEventRsvp instanceof CalendarEventRsvp
				? calendarEventRsvp.userId
				: calendarEventRsvp;
		const raw = await this.client.api.calendarEventRsvps.edit(
			this.calendarEvent.channel.id,
			this.calendarEvent.id,
			calendarEventRsvp,
			status,
		);
		return new CalendarEventRsvp(this.calendarEvent, raw);
	}

	/**
	 * Delete a RSVP from the calendar event
	 * @param calendarEventRsvp The calendar event RSVP
	 */
	delete(calendarEventRsvp: string | CalendarEventRsvp) {
		calendarEventRsvp =
			calendarEventRsvp instanceof CalendarEventRsvp
				? calendarEventRsvp.userId
				: calendarEventRsvp;
		return this.client.api.calendarEventRsvps.delete(
			this.calendarEvent.channel.id,
			this.calendarEvent.id,
			calendarEventRsvp,
		);
	}
}
