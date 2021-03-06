import { Collection } from '@discordjs/collection';
import { CalendarEventRsvpStatus } from 'guilded-api-typings';
import { CalendarEvent } from '../../structures/calendarEvent/CalendarEvent';
import { CalendarEventRsvp } from '../../structures/calendarEvent/CalendarEventRsvp';
import { BaseManager, FetchManyOptions, FetchOptions } from '../BaseManager';

/**
 * The manager of RSVPs that belong to a calendar event.
 * @example new CalendarEventRsvpManager(calendarEvent);
 */
export class CalendarEventRsvpManager extends BaseManager<string, CalendarEventRsvp> {
	/** @param calendarEvent The calendar event the RSVPs belong to. */
	constructor(public readonly calendarEvent: CalendarEvent) {
		super(calendarEvent.client, calendarEvent.client.options.maxCalendarEventRsvpCache);
	}

	/**
	 * Fetch a RSVP from the calendar event, or cache.
	 * @param calendarEventRsvp The calendar event RSVP to fetch.
	 * @param options The options to fetch the calendar event RSVP with.
	 * @returns The fetched calendar event RSVP.
	 * @example calanderEventRsvps.fetch(calendarEventRsvp);
	 */
	fetch(
		calendarEventRsvp: string | CalendarEventRsvp,
		options?: FetchOptions,
	): Promise<CalendarEventRsvp>;
	/**
	 * Fetch RSVPs from the calendar event.
	 * @param options The options to fetch calendar event RSVPs with.
	 * @returns The fetched calendar event RSVPs.
	 * @example calanderEventRsvps.fetch();
	 */
	fetch(options?: FetchManyOptions): Promise<Collection<string, CalendarEventRsvp>>;
	fetch(arg1?: string | CalendarEventRsvp | FetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'string' || arg1 instanceof CalendarEventRsvp)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(
		calendarEventRsvp: string | CalendarEventRsvp,
		options?: FetchOptions,
	) {
		calendarEventRsvp =
			calendarEventRsvp instanceof CalendarEventRsvp
				? calendarEventRsvp.id
				: calendarEventRsvp;
		const cached = this.cache.get(calendarEventRsvp);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.calendarEventRsvps.fetch(
			this.calendarEvent.channelId,
			this.calendarEvent.id,
			calendarEventRsvp,
		);
		return new CalendarEventRsvp(this.calendarEvent, raw, options?.cache);
	}

	/** @ignore */
	private async fetchMany(options?: FetchManyOptions) {
		const raw = await this.client.api.calendarEventRsvps.fetch(
			this.calendarEvent.channelId,
			this.calendarEvent.id,
		);
		const calendarEventRsvps = new Collection<string, CalendarEventRsvp>();
		for (const data of raw) {
			const calendarEventRsvp = new CalendarEventRsvp(
				this.calendarEvent,
				data,
				options?.cache,
			);
			calendarEventRsvps.set(calendarEventRsvp.id, calendarEventRsvp);
		}
		return calendarEventRsvps;
	}

	/**
	 * Edit a RSVP in the calendar event.
	 * @param calendarEventRsvp The calendar event RSVP to edit.
	 * @param status The status of the RSVP.
	 * @returns The edited calendar event RSVP.
	 * @example calanderEventRsvps.edit(calendarEventRsvp, 'going');
	 */
	async edit(calendarEventRsvp: string | CalendarEventRsvp, status: CalendarEventRsvpStatus) {
		calendarEventRsvp =
			calendarEventRsvp instanceof CalendarEventRsvp
				? calendarEventRsvp.id
				: calendarEventRsvp;
		const raw = await this.client.api.calendarEventRsvps.edit(
			this.calendarEvent.channelId,
			this.calendarEvent.id,
			calendarEventRsvp,
			status,
		);
		return new CalendarEventRsvp(this.calendarEvent, raw);
	}

	/**
	 * Delete a RSVP from the calendar event.
	 * @param calendarEventRsvp The calendar event RSVP to delete.
	 * @example calanderEventRsvps.delete(calendarEventRsvp);
	 */
	delete(calendarEventRsvp: string | CalendarEventRsvp) {
		calendarEventRsvp =
			calendarEventRsvp instanceof CalendarEventRsvp
				? calendarEventRsvp.id
				: calendarEventRsvp;
		return this.client.api.calendarEventRsvps.delete(
			this.calendarEvent.channelId,
			this.calendarEvent.id,
			calendarEventRsvp,
		);
	}
}
