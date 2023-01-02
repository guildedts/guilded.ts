import {
	APICalendarEventRsvp,
	RESTPutCalendarEventRsvpJSONBody,
	CalendarEventRsvpStatus,
	Routes,
} from 'guilded-api-typings';
import { BaseRouter } from '../BaseRouter';

/**
 * The calendar event RSVP router for the Guilded REST API
 */
export class CalendarEventRsvpRouter extends BaseRouter {
	/**
	 * Fetch a calendar event RSVP from Guilded
	 * @param channelId The ID of the channel
	 * @param calendarEventId The ID of the calendar event
	 * @param userId The ID of the user
	 * @returns The fetched calendar event RSVP
	 */
	fetch(
		channelId: string,
		calendarEventId: number,
		userId: string,
	): Promise<APICalendarEventRsvp>;
	/**
	 * Fetch calendar event RSVPs from Guilded
	 * @param channelId The ID of the channel
	 * @param calendarEventId The ID of the calendar event
	 * @returns The fetched calendar event RSVPs
	 */
	fetch(channelId: string, calendarEventId: number): Promise<APICalendarEventRsvp[]>;
	fetch(channelId: string, calendarEventId: number, userId?: string) {
		if (userId) return this.fetchSingle(channelId, calendarEventId, userId);
		return this.fetchMany(channelId, calendarEventId);
	}

	private async fetchSingle(channelId: string, calendarEventId: number, userId: string) {
		const { calendarEventRsvp } = await this.rest.get<{
			calendarEventRsvp: APICalendarEventRsvp;
		}>(Routes.calendarEventRsvp(channelId, calendarEventId, userId));
		return calendarEventRsvp;
	}

	private async fetchMany(channelId: string, calendarEventId: number) {
		const { calendarEventRsvps } = await this.rest.get<{
			calendarEventRsvps: APICalendarEventRsvp[];
		}>(Routes.calendarEventRsvps(channelId, calendarEventId));
		return calendarEventRsvps;
	}

	/**
	 * Edit a calendar event RSVP on Guilded
	 * @param channelId The ID of the channel
	 * @param calendarEventId The ID of the calendar event
	 * @param userId The ID of the user
	 * @param status The status of the RSVP
	 * @returns The edited calendar event RSVP
	 */
	async edit(
		channelId: string,
		calendarEventId: number,
		userId: string,
		status: CalendarEventRsvpStatus,
	) {
		const { calendarEventRsvp } = await this.rest.put<
			{ calendarEventRsvp: APICalendarEventRsvp },
			RESTPutCalendarEventRsvpJSONBody
		>(Routes.calendarEventRsvp(channelId, calendarEventId, userId), { status });
		return calendarEventRsvp;
	}

	/**
	 * Delete a calendar event RSVP from Guilded
	 * @param channelId The ID of the channel
	 * @param calendarEventId The ID of the calendar event
	 * @param userId The ID of the user
	 */
	delete(channelId: string, calendarEventId: number, userId: string) {
		return this.rest.delete<void>(Routes.calendarEventRsvp(channelId, calendarEventId, userId));
	}
}
