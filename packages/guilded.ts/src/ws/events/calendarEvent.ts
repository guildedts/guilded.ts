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
	client.emit('calendarEventCreate', new CalendarEvent(channel, data.calendarEvent));
}

/**
 * Handle the CalendarEventUpdated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function updated(client: Client, data: WSEvents['CalendarEventUpdated']) {
	const channel = (await client.channels.fetch(data.calendarEvent.channelId)) as CalendarChannel;
	client.emit('calendarEventEdit', new CalendarEvent(channel, data.calendarEvent));
}

/**
 * Handle the CalendarEventDeleted event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function deleted(client: Client, data: WSEvents['CalendarEventDeleted']) {
	const channel = (await client.channels.fetch(data.calendarEvent.channelId)) as CalendarChannel;
	const calendarEvent = new CalendarEvent(channel, data.calendarEvent);
	channel.events.cache.delete(calendarEvent.id);
	client.emit('calendarEventDelete', calendarEvent);
}
