import {
	APICalendarEvent,
	APICalendarEventCancellation,
	RESTPatchCalendarEventJSONBody,
	APIMentions,
} from 'guilded-api-typings';
import { FetchOptions } from '../../managers/BaseManager';
import { CalendarEventRsvpManager } from '../../managers/calendarEvent/CalendarEventRsvpManager';
import { Base } from '../Base';
import { CalendarChannel } from '../channel/CalendarChannel';

/**
 * Represents a calendar event on Guilded
 */
export class CalendarEvent extends Base<number> {
	/**
	 * The ID of the server
	 */
	readonly serverId: string;
	/**
	 * The ID of the channel
	 */
	readonly channelId: string;
	/**
	 * The name of the calendar event (`1`-`60` characters)
	 */
	readonly name: string;
	/**
	 * The description of the calendar event (`1`-`8000` characters)
	 */
	readonly description?: string;
	/**
	 * The location of the calendar event (`1`-`8000` characters)
	 */
	readonly location?: string;
	/**
	 * The URL of the calendar event
	 */
	readonly url?: string;
	/**
	 * The color of the calendar event (range: `0x0`-`0xffffff`)
	 */
	readonly color?: number;
	/**
	 * The number of RSVPs allowed before waitlisting (min value: `1`)
	 */
	readonly rsvpLimit?: number;
	/**
	 * When the calendar event starts
	 */
	readonly startsAt: Date;
	/**
	 * The duration of the calendar event **in minutes** (min value: `1`)
	 */
	readonly duration?: number;
	/**
	 * Whether the calendar event is private
	 *
	 * @default false
	 */
	readonly isPrivate?: boolean;
	/**
	 * The mentions of the calendar event
	 */
	readonly mentions?: APIMentions;
	/**
	 * When the calendar event was created
	 */
	readonly createdAt: Date;
	/**
	 * The ID of the user that created the calendar event
	 */
	readonly createdBy: string;
	/**
	 * The cancellation of the calendar event
	 */
	readonly cancellation?: APICalendarEventCancellation;

	/**
	 * The manager for RSVPs
	 */
	readonly rsvps: CalendarEventRsvpManager;

	/**
	 * @param channel The calendar channel
	 * @param raw The data of the calendar event
	 * @param cache Whether to cache the calendar event
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

	/**
	 * Whether the calendar event is cached
	 */
	get isCached() {
		return this.channel.events.cache.has(this.id);
	}

	/**
	 * The server
	 */
	get server() {
		return this.channel.server;
	}

	/**
	 * The time left until the calendar event starts
	 */
	get startsIn() {
		const startsIn = this.startsAt.getTime() - Date.now();
		return startsIn > 0 ? startsIn : 0;
	}

	/**
	 * When the calendar event ends
	 */
	get endsAt() {
		return new Date(this.startsAt.getTime() + (this.duration ?? 0) * 1000);
	}

	/**
	 * The timestamp of when the calendar event was created
	 */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/**
	 * The server member that created the calendar event
	 */
	get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/**
	 * The ID of the user that created the calendar event
	 */
	get authorId() {
		return this.createdBy;
	}

	/**
	 * Fetch the calendar event
	 * @param options The options to fetch the calendar event with
	 * @returns The fetched calendar event
	 */
	fetch(options?: FetchOptions) {
		return this.channel.events.fetch(this, options);
	}

	/**
	 * Fetch the server
	 * @param options The options to fetch the server with
	 * @returns The fetched server
	 */
	fetchServer(options?: FetchOptions) {
		return this.channel.fetchServer(options);
	}

	/**
	 * Fetch the server member that created the calendar event
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Edit the calendar event
	 * @param payload The payload of the calendar event
	 * @returns The edited calendar event
	 */
	edit(payload: RESTPatchCalendarEventJSONBody) {
		return this.channel.events.edit(this, payload) as Promise<this>;
	}

	/**
	 * Delete the calendar event
	 * @returns The deleted calendar event
	 */
	async delete() {
		await this.channel.events.delete(this);
		return this;
	}
}
