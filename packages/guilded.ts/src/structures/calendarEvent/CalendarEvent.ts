import { APICalendarEvent, RESTPatchCalendarEventJSONBody } from 'guilded-api-typings';
import { FetchOptions } from '../../managers/BaseManager';
import { CalendarEventRsvpManager } from '../../managers/calendarEvent/CalendarEventRsvpManager';
import { Base } from '../Base';
import { CalendarChannel } from '../channel/CalendarChannel';

/**
 * Represents a calendar event on Guilded
 */
export class CalendarEvent extends Base {
	/**
	 * The manager for RSVPs
	 */
	readonly rsvps: CalendarEventRsvpManager;

	/**
	 * @param channel The calendar channel
	 * @param data The data of the calendar event
	 * @param cache Whether to cache the calendar event
	 */
	constructor(
		public readonly channel: CalendarChannel,
		public readonly data: APICalendarEvent,
		cache = channel.client.options.cacheCalendarEvents ?? true,
	) {
		super(channel.client);
		this.rsvps = new CalendarEventRsvpManager(this);
		if (cache) channel.events.cache.set(this.id, this);
	}

	/**
	 * Whether the calendar event is cached
	 */
	get isCached() {
		return this.channel.events.cache.has(this.id);
	}

	/**
	 * The ID of the calendar event (min value: `1`)
	 */
	get id() {
		return this.data.id;
	}

	/**
	 * The name of the calendar event (`1`-`60` characters)
	 */
	get name() {
		return this.data.name;
	}

	/**
	 * The description of the calendar event (`1`-`8000` characters)
	 */
	get description() {
		return this.data.description ?? null;
	}

	/**
	 * The location of the calendar event (`1`-`8000` characters)
	 */
	get location() {
		return this.data.location ?? null;
	}

	/**
	 * The URL of the calendar event
	 */
	get url() {
		return this.data.url ?? null;
	}

	/**
	 * The color of the calendar event (range: `0x0`-`0xffffff`)
	 */
	get color() {
		return this.data.color ?? null;
	}

	/**
	 * The number of RSVPs allowed before waitlisting (min value: `1`)
	 */
	get rsvpLimit() {
		return this.data.rsvpLimit ?? Infinity;
	}

	/**
	 * When the calendar event starts
	 */
	get startsAt() {
		return new Date(this.data.startsAt);
	}

	/**
	 * The duration of the calendar event in ms (min value: `1000`)
	 */
	get duration() {
		return this.data.duration ? this.data.duration * 1000 : null;
	}

	/**
	 * The time left in ms until the calendar event starts
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
	 * Whether the calendar event is private
	 */
	get isPrivate() {
		return this.data.isPrivate ?? false;
	}

	/**
	 * The mentions of the calendar event
	 */
	get mentions() {
		return this.data.mentions ?? {};
	}

	/**
	 * When the calendar event was created
	 */
	get createdAt() {
		return new Date(this.data.createdAt);
	}

	/**
	 * The ID of the user that created the calendar event
	 */
	get creatorId() {
		return this.data.createdBy;
	}

	/**
	 * The user that created the calendar event
	 */
	get creator() {
		return this.client.users.cache.get(this.creatorId) ?? null;
	}

	/**
	 * Whether the client user created the calendar event
	 */
	get isCreator() {
		return this.creatorId === this.client.user?.id;
	}

	/**
	 * The cancellation of the calendar event
	 */
	get cancellation() {
		return this.data.cancellation ?? null;
	}

	/**
	 * Whether the calendar event is canceled
	 */
	get isCanceled() {
		return !!this.cancellation;
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
	 * Fetch the user that created the calendar event
	 * @returns The fetched user
	 */
	fetchCreator() {
		return this.client.users.fetch(this.channel.serverId, this.creatorId);
	}

	/**
	 * Update the calendar event
	 * @param options The options to update the calendar event with
	 * @returns The updated calendar event
	 */
	update(options: RESTPatchCalendarEventJSONBody) {
		return this.channel.events.update(this, options) as Promise<this>;
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
