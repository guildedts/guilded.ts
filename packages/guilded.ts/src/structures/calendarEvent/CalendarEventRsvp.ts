import { APICalendarEventRsvp, CalendarEventRsvpStatus } from 'guilded-api-typings';
import { FetchOptions } from '../../managers/BaseManager';
import { Base } from '../Base';
import { CalendarEvent } from './CalendarEvent';

/**
 * Represents a calendar event RSVP on Guilded.
 * @example new CalendarEventRsvp(calendarEvent, rawCalendarEventRsvp);
 */
export class CalendarEventRsvp extends Base {
	/** The ID of the calendar event the RSVP belongs to. */
	readonly calendarEventId: number;
	/** The ID of the channel the calendar event RSVP belongs to. */
	readonly channelId: string;
	/** The ID of the server the calendar event RSVP belongs to. */
	readonly serverId: string;
	/** The ID of the user the calendar event RSVP belongs to. */
	readonly userId: string;
	/** The status of the calendar event RSVP. */
	readonly status: CalendarEventRsvpStatus;
	/** The ID of the user that created the calendar event RSVP. */
	readonly createdBy: string;
	/** The date the calendar event RSVP was created. */
	readonly createdAt: Date;
	/** The ID of the user that edited the calendar event RSVP. */
	readonly editedBy?: string;
	/** The date the calendar event RSVP was edited. */
	readonly editedAt?: Date;

	/**
	 * @param calendarEvent The calendar event the RSVP belongs to.
	 * @param raw The raw data of the calendar event RSVP.
	 * @param cache Whether to cache the calendar event RSVP.
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

	/** Whether the calendar event RSVP is cached. */
	get isCached() {
		return this.calendarEvent.rsvps.cache.has(this.id);
	}

	/** The channel the calendar event RSVP belongs to. */
	get channel() {
		return this.calendarEvent.channel;
	}

	/** The server the calendar event RSVP belongs to. */
	get server() {
		return this.calendarEvent.server;
	}

	/** The user the calendar event RSVP belongs to. */
	get user() {
		return this.client.users.cache.get(this.userId);
	}

	/** The server member that created the calendar event RSVP. */
	get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/** The ID of the user that created the calendar event RSVP. */
	get authorId() {
		return this.createdBy;
	}

	/** The timestamp the calendar event RSVP was created. */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The server member that edited the calendar event RSVP. */
	get editor() {
		return this.editedBy ? this.server?.members.cache.get(this.editedBy) : undefined;
	}

	/** The timestamp the calendar event RSVP was edited. */
	get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/**
	 * Fetch the calendar event RSVP.
	 * @param options The options to fetch the calendar event RSVP with.
	 * @returns The fetched calendar event RSVP.
	 * @example calendarEventRsvp.fetch();
	 */
	fetch(options?: FetchOptions) {
		return this.calendarEvent.rsvps.fetch(this.id, options);
	}

	/**
	 * Fetch the server the calendar event RSVP belongs to.
	 * @param options The options to fetch the server with.
	 * @returns The fetched server.
	 * @example calendarEventRsvp.fetchServer();
	 */
	fetchServer(options?: FetchOptions) {
		return this.calendarEvent.fetchServer(options);
	}

	/**
	 * Fetch the user the calendar event RSVP belongs to.
	 * @returns The fetched user.
	 * @example calendarEventRsvp.fetchUser();
	 */
	fetchUser() {
		return this.client.users.fetch(this.serverId, this.userId);
	}

	/**
	 * Fetch the server member that created the calendar event RSVP.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example calendarEventRsvp.fetchAuthor();
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Fetch the server member that edited the calendar event RSVP.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example calendarEventRsvp.fetchEditor();
	 */
	async fetchEditor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return this.editedBy ? server.members.fetch(this.editedBy, options) : undefined;
	}

	/**
	 * Edit the calendar event RSVP.
	 * @param status The status of the calendar event RSVP.
	 * @returns The edited calendar event RSVP.
	 * @example calendarEventRsvp.edit('going');
	 */
	edit(status: CalendarEventRsvpStatus) {
		return this.calendarEvent.rsvps.edit(this, status) as Promise<this>;
	}

	/**
	 * Delete the calendar event RSVP.
	 * @returns The deleted calendar event RSVP.
	 * @example calendarEventRsvp.delete();
	 */
	async delete() {
		await this.calendarEvent.rsvps.delete(this);
		return this;
	}
}

export { CalendarEventRsvpStatus };
