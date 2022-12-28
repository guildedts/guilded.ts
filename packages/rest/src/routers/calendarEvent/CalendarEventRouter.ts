import {
	APICalendarEvent,
	RESTPatchCalendarEventJSONBody,
	RESTPostCalendarEventJSONBody,
	RESTGetCalendarEventsQuery,
	Routes,
} from 'guilded-api-typings';
import { BaseRouter } from '../BaseRouter';

/**
 * The calendar event router for the Guilded REST API.
 * @example new CalendarEventRouter(rest);
 */
export class CalendarEventRouter extends BaseRouter {
	/**
	 * Fetch a calendar event from Guilded.
	 * @param channelId The ID of the channel the calendar event belongs to.
	 * @param calendarEventId The ID of the calendar event to fetch.
	 * @returns The fetched calendar event.
	 * @example calendarEvents.fetch('abc', 123);
	 */
	fetch(channelId: string, calendarEventId: number): Promise<APICalendarEvent>;
	/**
	 * Fetch calendar events from Guilded.
	 * @param channelId The ID of the channel the calendar events belong to.
	 * @param options The options to fetch calendar events with.
	 * @returns The fetched calendar events.
	 * @example calendarEvents.fetch('abc');
	 */
	fetch(channelId: string, options?: RESTGetCalendarEventsQuery): Promise<APICalendarEvent[]>;
	/** @ignore */
	fetch(channelId: string, calendarEventIdOrOptions?: number | RESTGetCalendarEventsQuery) {
		if (typeof calendarEventIdOrOptions === 'number')
			return this.fetchSingle(channelId, calendarEventIdOrOptions);
		return this.fetchMany(channelId, calendarEventIdOrOptions);
	}

	/** @ignore */
	private async fetchSingle(channelId: string, calendarEventId: number) {
		const { calendarEvent } = await this.rest.get<{ calendarEvent: APICalendarEvent }>(
			Routes.calendarEvent(channelId, calendarEventId),
		);
		return calendarEvent;
	}

	/** @ignore */
	private async fetchMany(channelId: string, options?: RESTGetCalendarEventsQuery) {
		const { calendarEvents } = await this.rest.get<
			{ calendarEvents: APICalendarEvent[] },
			RESTGetCalendarEventsQuery
		>(Routes.calendarEvents(channelId), options);
		return calendarEvents;
	}

	/**
	 * Create a calendar event on Guilded.
	 * @param channelId The ID of the channel the calendar event belongs to.
	 * @param payload The payload of the calendar event.
	 * @returns The created calendar event.
	 * @example calendarEvents.create('abc', { name: 'Event!' });
	 */
	async create(channelId: string, payload: RESTPostCalendarEventJSONBody) {
		const { calendarEvent } = await this.rest.post<
			{ calendarEvent: APICalendarEvent },
			RESTPostCalendarEventJSONBody
		>(Routes.calendarEvents(channelId), payload);
		return calendarEvent;
	}

	/**
	 * Edit a calendar event on Guilded.
	 * @param channelId The ID of the channel the calendar event belongs to.
	 * @param calendarEventId The ID of the calendar event to edit.
	 * @param payload The payload of the calendar event.
	 * @returns The edited calendar event.
	 * @example calendarEvents.edit('abc', 123, { name: 'Event!' });
	 */
	async edit(
		channelId: string,
		calendarEventId: number,
		payload: RESTPatchCalendarEventJSONBody,
	) {
		const { calendarEvent } = await this.rest.patch<
			{ calendarEvent: APICalendarEvent },
			RESTPatchCalendarEventJSONBody
		>(Routes.calendarEvent(channelId, calendarEventId), payload);
		return calendarEvent;
	}

	/**
	 * Delete a calendar event from Guilded.
	 * @param channelId The ID of the channel the calendar event belongs to.
	 * @param calendarEventId The ID of the calendar event to delete.
	 * @example calendarEvents.delete('abc', 123);
	 */
	delete(channelId: string, calendarEventId: number) {
		return this.rest.delete<void>(Routes.calendarEvent(channelId, calendarEventId));
	}
}
