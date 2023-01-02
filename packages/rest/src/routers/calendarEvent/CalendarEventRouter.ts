import {
	APICalendarEvent,
	RESTPatchCalendarEventJSONBody,
	RESTPostCalendarEventJSONBody,
	RESTGetCalendarEventsQuery,
	Routes,
} from 'guilded-api-typings';
import { BaseRouter } from '../BaseRouter';

/**
 * The calendar event router for the Guilded REST API
 */
export class CalendarEventRouter extends BaseRouter {
	/**
	 * Fetch a calendar event from Guilded
	 * @param channelId The ID of the channel
	 * @param calendarEventId The ID of the calendar event
	 * @returns The fetched calendar event
	 */
	fetch(channelId: string, calendarEventId: number): Promise<APICalendarEvent>;
	/**
	 * Fetch calendar events from Guilded
	 * @param channelId The ID of the channel
	 * @param options The options to fetch calendar events with
	 * @returns The fetched calendar events
	 */
	fetch(channelId: string, options?: RESTGetCalendarEventsQuery): Promise<APICalendarEvent[]>;
	fetch(channelId: string, calendarEventIdOrOptions?: number | RESTGetCalendarEventsQuery) {
		if (typeof calendarEventIdOrOptions === 'number')
			return this.fetchSingle(channelId, calendarEventIdOrOptions);
		return this.fetchMany(channelId, calendarEventIdOrOptions);
	}

	private async fetchSingle(channelId: string, calendarEventId: number) {
		const { calendarEvent } = await this.rest.get<{ calendarEvent: APICalendarEvent }>(
			Routes.calendarEvent(channelId, calendarEventId),
		);
		return calendarEvent;
	}

	private async fetchMany(channelId: string, options?: RESTGetCalendarEventsQuery) {
		const { calendarEvents } = await this.rest.get<
			{ calendarEvents: APICalendarEvent[] },
			RESTGetCalendarEventsQuery
		>(Routes.calendarEvents(channelId), options);
		return calendarEvents;
	}

	/**
	 * Create a calendar event on Guilded
	 * @param channelId The ID of the channel
	 * @param payload The payload of the calendar event
	 * @returns The created calendar event
	 */
	async create(channelId: string, payload: RESTPostCalendarEventJSONBody) {
		const { calendarEvent } = await this.rest.post<
			{ calendarEvent: APICalendarEvent },
			RESTPostCalendarEventJSONBody
		>(Routes.calendarEvents(channelId), payload);
		return calendarEvent;
	}

	/**
	 * Edit a calendar event on Guilded
	 * @param channelId The ID of the channel
	 * @param calendarEventId The ID of the calendar event
	 * @param payload The payload of the calendar event
	 * @returns The edited calendar event
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
	 * Delete a calendar event from Guilded
	 * @param channelId The ID of the channel
	 * @param calendarEventId The ID of the calendar event
	 */
	delete(channelId: string, calendarEventId: number) {
		return this.rest.delete<void>(Routes.calendarEvent(channelId, calendarEventId));
	}
}
