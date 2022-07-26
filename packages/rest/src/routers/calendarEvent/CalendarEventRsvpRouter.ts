import {
	APICalendarEventRsvp,
	APICalendarEventRsvpEditPayload,
	CalendarEventRsvpStatus,
	Routes,
} from 'guilded-api-typings';
import { BaseRouter } from '../BaseRouter';

/**
 * The calendar event RSVP router for the Guilded REST API.
 * @example new CalendarEventRsvpRouter(rest);
 */
export class CalendarEventRsvpRouter extends BaseRouter {
	/**
	 * Fetch a calendar event RSVP from Guilded.
	 * @param channelId The ID of the channel the calendar event RSVP belongs to.
	 * @param calendarEventId The ID of the calendar event the RSVP belongs to.
	 * @param userId The ID of the user the RSVP belongs to.
	 * @returns The fetched calendar event RSVP.
	 * @example calendarEvents.fetch('abc', 123, 'abc');
	 */
	fetch(
		channelId: string,
		calendarEventId: number,
		userId: string,
	): Promise<APICalendarEventRsvp>;
	/**
	 * Fetch calendar event RSVPs from Guilded.
	 * @param channelId The ID of the channel the calendar event RSVPs belong to.
	 * @param calendarEventId The ID of the calendar event the RSVPs belong to.
	 * @returns The fetched calendar event RSVPs.
	 * @example calendarEvents.fetch('abc', 123);
	 */
	fetch(channelId: string, calendarEventId: number): Promise<APICalendarEventRsvp[]>;
	/** @ignore */
	fetch(channelId: string, calendarEventId: number, userId?: string) {
		if (userId) return this.fetchSingle(channelId, calendarEventId, userId);
		return this.fetchMany(channelId, calendarEventId);
	}

	/** @ignore */
	private async fetchSingle(channelId: string, calendarEventId: number, userId: string) {
		const { calendarEventRsvp } = await this.rest.get<{
			calendarEventRsvp: APICalendarEventRsvp;
		}>(Routes.calendarEventRsvp(channelId, calendarEventId, userId));
		return calendarEventRsvp;
	}

	/** @ignore */
	private async fetchMany(channelId: string, calendarEventId: number) {
		const { calendarEventRsvps } = await this.rest.get<{
			calendarEventRsvps: APICalendarEventRsvp[];
		}>(Routes.calendarEventRsvps(channelId, calendarEventId));
		return calendarEventRsvps;
	}

	/**
	 * Edit a calendar event RSVP on Guilded.
	 * @param channelId The ID of the channel the calendar event RSVP belongs to.
	 * @param calendarEventId The ID of the calendar event the RSVP belongs to.
	 * @param userId The ID of the user the RSVP belongs to.
	 * @param status The status of the RSVP.
	 * @returns The edited calendar event RSVP.
	 * @example calendarEventRsvps.edit('abc', 123, 'abc', 'going');
	 */
	async edit(
		channelId: string,
		calendarEventId: number,
		userId: string,
		status: CalendarEventRsvpStatus,
	) {
		const { calendarEventRsvp } = await this.rest.put<
			{ calendarEventRsvp: APICalendarEventRsvp },
			APICalendarEventRsvpEditPayload
		>(Routes.calendarEventRsvp(channelId, calendarEventId, userId), { status });
		return calendarEventRsvp;
	}

	/**
	 * Delete a calendar event RSVP from Guilded.
	 * @param channelId The ID of the channel the calendar event RSVP belongs to.
	 * @param calendarEventId The ID of the calendar event the RSVP belongs to.
	 * @param userId The ID of the user the RSVP belongs to.
	 * @example calendarEventRsvps.delete('abc', 123, 'abc');
	 */
	delete(channelId: string, calendarEventId: number, userId: string) {
		return this.rest.delete<void>(Routes.calendarEventRsvp(channelId, calendarEventId, userId));
	}
}
