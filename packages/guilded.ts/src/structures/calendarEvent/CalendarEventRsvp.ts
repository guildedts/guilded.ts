import { APICalendarEventRsvp, CalendarEventRsvpStatus } from 'guilded-api-typings';
import { FetchOptions } from '../../managers/BaseManager';
import { Base } from '../Base';
import { CalendarEvent } from './CalendarEvent';

/**
 * Represents a calendar event RSVP on Guilded
 */
export class CalendarEventRsvp extends Base {
	/**
	 * @param event The calendar event
	 * @param data The data of the calendar event RSVP
	 * @param cache Whether to cache the calendar event RSVP
	 */
	constructor(
		public readonly event: CalendarEvent,
		public readonly data: APICalendarEventRsvp,
		cache = event.client.options.cacheCalendarEventRsvps ?? true,
	) {
		super(event.client);
		if (cache) event.rsvps.cache.set(this.userId, this);
	}

	/**
	 * Whether the calendar event RSVP is cached
	 */
	get isCached() {
		return this.event.rsvps.cache.has(this.userId);
	}

	/**
	 * The ID of the user
	 */
	get userId() {
		return this.data.userId;
	}

	/**
	 * The user
	 */
	get user() {
		return this.client.users.cache.get(this.userId) ?? null;
	}

	/**
	 * The status of the calendar event RSVP
	 */
	get status() {
		return this.data.status;
	}

	/**
	 * The ID of the user that created the calendar event RSVP
	 */
	get creatorId() {
		return this.data.createdBy;
	}

	/**
	 * The user that created the calendar event RSVP
	 */
	get creator() {
		return this.client.users.cache.get(this.creatorId) ?? null;
	}

	/**
	 * Whether the client user created the calendar event RSVP
	 */
	get isCreator() {
		return this.creatorId === this.client.user?.id;
	}

	/**
	 * When the calendar event RSVP was created
	 */
	get createdAt() {
		return new Date(this.data.createdAt);
	}

	/**
	 * The ID of the user that updated the calendar event RSVP, if relevant
	 */
	get updaterId() {
		return this.data.updatedBy ?? null;
	}

	/**
	 * The user that updated the calendar event RSVP
	 */
	get updater() {
		return this.updaterId ? this.client.users.cache.get(this.updaterId) ?? null : null;
	}

	/**
	 * Whether the client user updated the calendar event RSVP
	 */
	get isUpdater() {
		return this.updaterId === this.client.user?.id;
	}

	/**
	 * When the calendar event RSVP was updated, if relevant
	 */
	get updatedAt() {
		return this.data.updatedAt ? new Date(this.data.updatedAt) : null;
	}

	/**
	 * Whether the calendar event RSVP is updated
	 */
	get isUpdated() {
		return !!this.updatedAt;
	}

	/**
	 * Fetch the calendar event RSVP
	 * @param options The options to fetch the calendar event RSVP with
	 * @returns The fetched calendar event RSVP
	 */
	fetch(options?: FetchOptions) {
		return this.event.rsvps.fetch(this.userId, options);
	}

	/**
	 * Fetch the user
	 * @returns The fetched user
	 */
	fetchUser() {
		return this.client.users.fetch(this.event.channel.serverId, this.userId);
	}

	/**
	 * Fetch the user that created the calendar event RSVP
	 * @returns The fetched user
	 */
	fetchCreator() {
		return this.client.users.fetch(this.event.channel.serverId, this.creatorId);
	}

	/**
	 * Fetch the user that updated the calendar event RSVP
	 * @returns The fetched server member
	 */
	async fetchUpdater() {
		return this.updaterId
			? this.client.users.fetch(this.event.channel.serverId, this.updaterId)
			: null;
	}

	/**
	 * Update the calendar event RSVP
	 * @param status The status of the calendar event RSVP
	 * @returns The updated calendar event RSVP
	 */
	update(status: CalendarEventRsvpStatus) {
		return this.event.rsvps.update(this, status) as Promise<this>;
	}

	/**
	 * Delete the calendar event RSVP
	 * @returns The deleted calendar event RSVP
	 */
	async delete() {
		await this.event.rsvps.delete(this);
		return this;
	}
}

export { CalendarEventRsvpStatus };
