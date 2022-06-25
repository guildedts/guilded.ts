import {
	APICalendarEvent,
	APICalendarEventCancellation,
	APICalendarEventEditPayload,
	APIMentions,
} from 'guilded-api-typings';
import { FetchOptions } from '../managers/BaseManager';
import { Base } from './Base';
import { CalendarChannel } from './channel/CalendarChannel';

/** Represents a calendar event on Guilded. */
export class CalendarEvent extends Base<number> {
	/** The ID of the server the calendar event belongs to. */
	public readonly serverId: string;
	/** The ID of the channel the calendar event belongs to. */
	public readonly channelId: string;
	/** The name of the calendar event. */
	public readonly name: string;
	/** The description of the calendar event. */
	public readonly description?: string;
	/** The location of the calendar event. */
	public readonly location?: string;
	/** The url of the calendar event. */
	public readonly url?: string;
	/** The color of the calendar event. */
	public readonly color?: number;
	/** The date the calendar event starts. */
	public readonly startsAt: Date;
	/** The duration of the calendar event. */
	public readonly duration?: number;
	/** Whether the calendar event is private. */
	public readonly isPrivate?: boolean;
	/** The mentions of the calendar event. */
	public readonly mentions?: APIMentions;
	/** The date the calendar event was created. */
	public readonly createdAt: Date;
	/** The ID of the user that created the calendar event. */
	public readonly createdBy: string;
	/** The cancellation of the calendar event. */
	public readonly cancellation?: APICalendarEventCancellation;

	/**
	 * @param channel The calendar channel the event belongs to.
	 * @param raw The raw data of the calendar event.
	 * @param cache Whether to cache the calendar event.
	 */
	public constructor(
		public readonly channel: CalendarChannel,
		public readonly raw: APICalendarEvent,
		cache = channel.client.options.cacheCalendarEvents ?? true,
	) {
		super(channel.client, raw.id);
		this.serverId = raw.serverId;
		this.channelId = raw.channelId;
		this.name = raw.name;
		this.description = raw.description;
		this.location = raw.location;
		this.url = raw.url;
		this.color = raw.color;
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
	public get isCached() {
		return this.channel.events.cache.has(this.id);
	}

	/** The server the calendar event belongs to. */
	public get server() {
		return this.channel.server;
	}

	/** The time until the calendar event starts. */
	public get startsIn() {
		const startsIn = this.startsAt.getTime() - Date.now();
		return startsIn > 0 ? startsIn : 0;
	}

	/** The date the calendar event ends. */
	public get endsAt() {
		return new Date(this.startsAt.getTime() + (this.duration ?? 0) * 1000);
	}

	/** The timestamp the calendar event was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The server member that created the calendar event. */
	public get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/** The ID of the user that created the calendar event. */
	public get authorId() {
		return this.createdBy;
	}

	/**
	 * Fetch the calendar event.
	 * @param options The options to fetch the calendar event with.
	 * @returns The fetched calendar event.
	 */
	public fetch(options?: FetchOptions) {
		return this.channel.events.fetch(this, options);
	}

	/**
	 * Fetch the server the calendar event belongs to.
	 * @param options The options to fetch the server with.
	 * @returns The fetched server.
	 */
	public fetchServer(options?: FetchOptions) {
		return this.channel.fetchServer(options);
	}

	/**
	 * Fetch the server member that created the calendar event.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 */
	public async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Edit the calendar event.
	 * @param payload The payload of the calendar event.
	 * @returns The edited calendar event.
	 */
	public edit(payload: APICalendarEventEditPayload) {
		return this.channel.events.edit(this, payload);
	}

	/**
	 * Delete the calendar event.
	 * @returns The deleted calendar event.
	 */
	public async delete() {
		await this.channel.events.delete(this);
		return this;
	}
}
