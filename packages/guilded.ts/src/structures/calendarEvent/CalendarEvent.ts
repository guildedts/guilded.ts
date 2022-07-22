import {
	APICalendarEvent,
	APICalendarEventCancellation,
	APICalendarEventEditPayload,
	APIMentions,
} from 'guilded-api-typings';
import { FetchOptions } from '../../managers/BaseManager';
import { CalendarEventRsvpManager } from '../../managers/calendarEvent/CalendarEventRsvpManager';
import { Base } from '../Base';
import { CalendarChannel } from '../channel/CalendarChannel';

/**
 * Represents a calendar event on Guilded.
 * @example new CalendarEvent(channel, rawEvent);
 */
export class CalendarEvent extends Base<number> {
	/** The ID of the server the calendar event belongs to. */
	readonly serverId: string;
	/** The ID of the channel the calendar event belongs to. */
	readonly channelId: string;
	/** The name of the calendar event. */
	readonly name: string;
	/** The description of the calendar event. */
	readonly description?: string;
	/** The location of the calendar event. */
	readonly location?: string;
	/** The url of the calendar event. */
	readonly url?: string;
	/** The color of the calendar event. */
	readonly color?: number;
	/** The limit of RSVPs of the calendar event. */
	readonly rsvpLimit?: number;
	/** The date the calendar event starts. */
	readonly startsAt: Date;
	/** The duration of the calendar event. */
	readonly duration?: number;
	/** Whether the calendar event is private. */
	readonly isPrivate?: boolean;
	/** The mentions of the calendar event. */
	readonly mentions?: APIMentions;
	/** The date the calendar event was created. */
	readonly createdAt: Date;
	/** The ID of the user that created the calendar event. */
	readonly createdBy: string;
	/** The cancellation of the calendar event. */
	readonly cancellation?: APICalendarEventCancellation;

	/** A manager of RSVPs that belong to the calendar event. */
	readonly rsvps: CalendarEventRsvpManager;

	/**
	 * @param channel The calendar channel the event belongs to.
	 * @param raw The raw data of the calendar event.
	 * @param cache Whether to cache the calendar event.
	 */
	constructor(
		public readonly channel: CalendarChannel,
		public readonly raw: APICalendarEvent,
		cache = channel.client.options.cacheCalendarEvents ?? true,
	) {
		super(channel.client, raw.id);
		this.rsvps = new CalendarEventRsvpManager(this);
		this.serverId = raw.serverId;
		this.channelId = raw.channelId;
		this.name = raw.name;
		this.description = raw.description;
		this.location = raw.location;
		this.url = raw.url;
		this.color = raw.color;
		this.rsvpLimit = raw.rsvpLimit;
		this.startsAt = new Date(raw.startsAt);
		this.duration = raw.duration;
		this.isPrivate = raw.isPrivate;
		this.mentions = raw.mentions;
		this.createdAt = new Date(raw.createdAt);
		this.createdBy = raw.createdBy;
		this.cancellation = raw.cancellation;
		if (cache) channel.events.cache.set(this.id, this);
	}

	/** Whether the calendar event is cached. */
	get isCached() {
		return this.channel.events.cache.has(this.id);
	}

	/** The server the calendar event belongs to. */
	get server() {
		return this.channel.server;
	}

	/** The time until the calendar event starts. */
	get startsIn() {
		const startsIn = this.startsAt.getTime() - Date.now();
		return startsIn > 0 ? startsIn : 0;
	}

	/** The date the calendar event ends. */
	get endsAt() {
		return new Date(this.startsAt.getTime() + (this.duration ?? 0) * 1000);
	}

	/** The timestamp the calendar event was created. */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The server member that created the calendar event. */
	get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/** The ID of the user that created the calendar event. */
	get authorId() {
		return this.createdBy;
	}

	/**
	 * Fetch the calendar event.
	 * @param options The options to fetch the calendar event with.
	 * @returns The fetched calendar event.
	 * @example event.fetch();
	 */
	fetch(options?: FetchOptions) {
		return this.channel.events.fetch(this, options);
	}

	/**
	 * Fetch the server the calendar event belongs to.
	 * @param options The options to fetch the server with.
	 * @returns The fetched server.
	 * @example event.fetchServer();
	 */
	fetchServer(options?: FetchOptions) {
		return this.channel.fetchServer(options);
	}

	/**
	 * Fetch the server member that created the calendar event.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example event.fetchAuthor();
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Edit the calendar event.
	 * @param payload The payload of the calendar event.
	 * @returns The edited calendar event.
	 * @example event.edit({ name: 'New name' });
	 */
	edit(payload: APICalendarEventEditPayload) {
		return this.channel.events.edit(this, payload) as Promise<this>;
	}

	/**
	 * Delete the calendar event.
	 * @returns The deleted calendar event.
	 * @example event.delete();
	 */
	async delete() {
		await this.channel.events.delete(this);
		return this;
	}
}
