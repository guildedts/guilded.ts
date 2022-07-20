import { WSEvents } from 'guilded-api-typings';
import { CalendarEvent } from '../../structures/CalendarEvent';
import { CalendarChannel } from '../../structures/channel/CalendarChannel';
import { Client } from '../../structures/Client';

/**
 * Handle the CalendarEventCreated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function created(client: Client, data: WSEvents['CalendarEventCreated']) {
	const channel = (await client.channels.fetch(data.calendarEvent.channelId)) as CalendarChannel;
	const calendarEvent = new CalendarEvent(channel, data.calendarEvent);
	client.emit('calendarEventCreate', calendarEvent);
}

/**
 * Handle the CalendarEventUpdated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function updated(client: Client, data: WSEvents['CalendarEventUpdated']) {
	const channel = (await client.channels.fetch(data.calendarEvent.channelId)) as CalendarChannel;
	const oldCalendarEvent = channel.events.cache.get(data.calendarEvent.id)
	const newCalendarEvent = new CalendarEvent(channel, data.calendarEvent);
	client.emit('calendarEventEdit', newCalendarEvent, oldCalendarEvent);
}

/**
 * Handle the CalendarEventDeleted event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function deleted(client: Client, data: WSEvents['CalendarEventDeleted']) {
	const channel = (await client.channels.fetch(data.calendarEvent.channelId)) as CalendarChannel;
	const calendarEvent = new CalendarEvent(channel, data.calendarEvent);
	if (client.options.disposeCachedCalendarEvents ?? true)
		channel.events.cache.delete(calendarEvent.id);
	client.emit('calendarEventDelete', calendarEvent);
}
