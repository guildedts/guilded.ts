import { Collection } from '@discordjs/collection';
import {
	WebSocketCalendarEventCreateEventData,
	WebSocketCalendarEventDeleteEventData,
	WebSocketCalendarEventRsvpDeleteEventData,
	WebSocketCalendarEventRsvpUpdateEventData,
	WebSocketCalendarEventRsvpsUpdateEventData,
	WebSocketCalendarEventUpdateEventData,
} from 'guilded-api-typings';
import { CalendarEvent } from '../../structures/calendarEvent/CalendarEvent';
import { CalendarEventRsvp } from '../../structures/calendarEvent/CalendarEventRsvp';
import { CalendarChannel } from '../../structures/channel/CalendarChannel';
import { Client } from '../../structures/Client';

/**
 * Handle the `CalendarEventCreated` event
 * @param client The client
 * @param data The data of the event
 */
export async function created(client: Client, data: WebSocketCalendarEventCreateEventData) {
	const channel = (await client.channels.fetch(data.calendarEvent.channelId)) as CalendarChannel;
	const calendarEvent = new CalendarEvent(channel, data.calendarEvent);
	client.emit('calendarEventCreate', calendarEvent);
}

/**
 * Handle the `CalendarEventUpdated` event
 * @param client The client
 * @param data The data of the event
 */
export async function updated(client: Client, data: WebSocketCalendarEventUpdateEventData) {
	const channel = (await client.channels.fetch(data.calendarEvent.channelId)) as CalendarChannel;
	const oldCalendarEvent = channel.events.cache.get(data.calendarEvent.id);
	const newCalendarEvent = new CalendarEvent(channel, data.calendarEvent);
	client.emit('calendarEventEdit', newCalendarEvent, oldCalendarEvent);
}

/**
 * Handle the `CalendarEventDeleted` event
 * @param client The client
 * @param data The data of the event
 */
export async function deleted(client: Client, data: WebSocketCalendarEventDeleteEventData) {
	const channel = (await client.channels.fetch(data.calendarEvent.channelId)) as CalendarChannel;
	const calendarEvent = new CalendarEvent(channel, data.calendarEvent);
	if (client.options.disposeCachedCalendarEvents ?? true)
		channel.events.cache.delete(calendarEvent.id);
	client.emit('calendarEventDelete', calendarEvent);
}

/**
 * Handle the `CalendarEventRsvpUpdated` event
 * @param client The client
 * @param data The data of the event
 */
export async function rsvpUpdated(client: Client, data: WebSocketCalendarEventRsvpUpdateEventData) {
	const channel = (await client.channels.fetch(
		data.calendarEventRsvp.channelId,
	)) as CalendarChannel;
	const calendarEvent = await channel.events.fetch(data.calendarEventRsvp.calendarEventId);
	const oldCalendarEventRsvp = calendarEvent.rsvps.cache.get(data.calendarEventRsvp.userId);
	const newCalendarEventRsvp = new CalendarEventRsvp(calendarEvent, data.calendarEventRsvp);
	client.emit('calendarEventRsvpEdit', newCalendarEventRsvp, oldCalendarEventRsvp);
}

/**
 * Handle the `CalendarEventRsvpManyUpdated` event
 * @param client The client
 * @param data The data of the event
 */
export async function rsvpsUpdated(
	client: Client,
	data: WebSocketCalendarEventRsvpsUpdateEventData,
) {
	const oldCalendarEventRsvps = new Collection<string, CalendarEventRsvp>();
	const newCalendarEventRsvps = new Collection<string, CalendarEventRsvp>();
	for (const rawCalendarEventRsvp of data.calendarEventRsvps) {
		const channel = (await client.channels.fetch(
			rawCalendarEventRsvp.channelId,
		)) as CalendarChannel;
		const calendarEvent = await channel.events.fetch(rawCalendarEventRsvp.calendarEventId);
		const oldCalendarEventRsvp = calendarEvent.rsvps.cache.get(rawCalendarEventRsvp.userId);
		const newCalendarEventRsvp = new CalendarEventRsvp(calendarEvent, rawCalendarEventRsvp);
		if (oldCalendarEventRsvp)
			oldCalendarEventRsvps.set(oldCalendarEventRsvp.userId, oldCalendarEventRsvp);
		newCalendarEventRsvps.set(newCalendarEventRsvp.userId, newCalendarEventRsvp);
	}
	client.emit('calendarEventRsvpsEdit', newCalendarEventRsvps, oldCalendarEventRsvps);
}

/**
 * Handle the `CalendarEventRsvpDeleted` event
 * @param client The client
 * @param data The data of the event
 */
export async function rsvpDeleted(client: Client, data: WebSocketCalendarEventRsvpDeleteEventData) {
	const channel = (await client.channels.fetch(
		data.calendarEventRsvp.channelId,
	)) as CalendarChannel;
	const calendarEvent = await channel.events.fetch(data.calendarEventRsvp.calendarEventId);
	const calendarEventRsvp = new CalendarEventRsvp(calendarEvent, data.calendarEventRsvp);
	if (client.options.disposeCachedCalendarEventRsvps ?? true)
		calendarEvent.rsvps.cache.delete(calendarEventRsvp.userId);
	client.emit('calendarEventRsvpDelete', calendarEventRsvp);
}
