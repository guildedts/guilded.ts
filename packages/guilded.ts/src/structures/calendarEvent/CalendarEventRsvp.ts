import { APICalendarEventRsvp, CalendarEventRsvpStatus } from 'guilded-api-typings';
import { FetchOptions } from '../../managers/BaseManager';
import { Base } from '../Base';
import { CalendarEvent } from './CalendarEvent';

/**
 * Represents a calendar event RSVP on Guilded
 */
export class CalendarEventRsvp extends Base {
	/**
	 * The ID of the calendar event (min value: 1)
	 */
	readonly calendarEventId: number;
	/**
	 * The ID of the channel
	 */
	readonly channelId: string;
	/**
	 * The ID of the server
	 */
	readonly serverId: string;
	/**
	 * The ID of the user
	 */
	readonly userId: string;
	/**
	 * The status of the calendar event RSVP
	 */
	readonly status: CalendarEventRsvpStatus;
	/**
	 * The ID of the user that created the calendar event RSVP
	 */
	readonly createdBy: string;
	/**
	 * When the calendar event RSVP was created
	 */
	readonly createdAt: Date;
	/**
	 * The ID of the user that edited the calendar event RSVP
	 */
	readonly editedBy?: string;
	/**
	 * When the calendar event RSVP was edited, if relevant
	 */
	readonly editedAt?: Date;

	/**
	 * @param calendarEvent The calendar event
	 * @param raw The data of the calendar event RSVP
	 * @param cache Whether to cache the calendar event RSVP
	 */
	constructor(
		public readonly calendarEvent: CalendarEvent,
		public readonly raw: APICalendarEventRsvp,
		cache = calendarEvent.client.options.cacheCalendarEventRsvps ?? true,
	) {
		super(calendarEvent.client, raw.userId);
		this.calendarEventId = raw.calendarEventId;
		this.channelId = raw.channelId;
		this.serverId = raw.serverId;
		this.userId = raw.userId;
		this.status = raw.status;
		this.createdBy = raw.createdBy;
		this.createdAt = new Date(raw.createdAt);
		this.editedBy = raw.updatedBy;
		this.editedAt = raw.updatedAt ? new Date(raw.updatedAt) : undefined;
		if (cache) calendarEvent.rsvps.cache.set(this.id, this);
	}

	/**
	 * Whether the calendar event RSVP is cached
	 */
	get isCached() {
		return this.calendarEvent.rsvps.cache.has(this.id);
	}

	/**
	 * The channel
	 */
	get channel() {
		return this.calendarEvent.channel;
	}

	/**
	 * The server
	 */
	get server() {
		return this.calendarEvent.server;
	}

	/**
	 * The user
	 */
	get user() {
		return this.client.users.cache.get(this.userId);
	}

	/**
	 * The server member that created the calendar event RSVP
	 */
	get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/**
	 * The ID of the user that created the calendar event RSVP
	 */
	get authorId() {
		return this.createdBy;
	}

	/**
	 * The timestamp of when the calendar event RSVP was created
	 */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/**
	 * The server member that edited the calendar event RSVP
	 */
	get editor() {
		return this.editedBy ? this.server?.members.cache.get(this.editedBy) : undefined;
	}

	/**
	 * The timestamp of when the calendar event RSVP was edited
	 */
	get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/**
	 * Fetch the calendar event RSVP
	 * @param options The options to fetch the calendar event RSVP with
	 * @returns The fetched calendar event RSVP
	 */
	fetch(options?: FetchOptions) {
		return this.calendarEvent.rsvps.fetch(this.id, options);
	}

	/**
	 * Fetch the server
	 * @param options The options to fetch the server with
	 * @returns The fetched server
	 */
	fetchServer(options?: FetchOptions) {
		return this.calendarEvent.fetchServer(options);
	}

	/**
	 * Fetch the user
	 * @returns The fetched user
	 */
	fetchUser() {
		return this.client.users.fetch(this.serverId, this.userId);
	}

	/**
	 * Fetch the server member that created the calendar event RSVP
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Fetch the server member that edited the calendar event RSVP
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	async fetchEditor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return this.editedBy ? server.members.fetch(this.editedBy, options) : undefined;
	}

	/**
	 * Edit the calendar event RSVP
	 * @param status The status of the calendar event RSVP
	 * @returns The edited calendar event RSVP
	 */
	edit(status: CalendarEventRsvpStatus) {
		return this.calendarEvent.rsvps.edit(this, status) as Promise<this>;
	}

	/**
	 * Delete the calendar event RSVP
	 * @returns The deleted calendar event RSVP
	 */
	async delete() {
		await this.calendarEvent.rsvps.delete(this);
		return this;
	}
}

export { CalendarEventRsvpStatus };
