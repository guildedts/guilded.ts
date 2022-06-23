import { WSEvents } from 'guilded-api-typings';
import { Client } from '../structures/Client';
import * as calendarEvent from './events/calendarEvent';
import * as channel from './events/channel';
import * as doc from './events/doc';
import * as listItem from './events/listItem';
import * as member from './events/member';
import * as message from './events/message';
import * as server from './events/server';
import * as webhook from './events/webhook';

/** A map of all WebSocket events with their respective handlers. */
const WSEventHandler: {
	[event in keyof WSEvents]: (client: Client, data: WSEvents[event]) => Promise<void>;
} = {
	ChatMessageCreated: message.created,
	ChatMessageUpdated: message.updated,
	ChatMessageDeleted: message.deleted,
	TeamMemberJoined: member.joined,
	TeamMemberRemoved: member.removed,
	TeamMemberBanned: member.banned,
	TeamMemberUnbanned: member.unbanned,
	TeamMemberUpdated: member.updated,
	teamRolesUpdated: server.rolesUpdated,
	TeamChannelCreated: channel.created,
	TeamChannelUpdated: channel.updated,
	TeamChannelDeleted: channel.deleted,
	TeamWebhookCreated: webhook.created,
	TeamWebhookUpdated: webhook.updated,
	DocCreated: doc.created,
	DocUpdated: doc.updated,
	DocDeleted: doc.deleted,
	CalendarEventCreated: calendarEvent.created,
	CalendarEventUpdated: calendarEvent.updated,
	CalendarEventDeleted: calendarEvent.deleted,
	ListItemCreated: listItem.created,
	ListItemUpdated: listItem.updated,
	ListItemDeleted: listItem.deleted,
	ListItemCompleted: listItem.completed,
	ListItemUncompleted: listItem.uncompleted,
};

/**
 * Handle a Websocket event.
 * @param client The client the Websocket belongs to.
 * @param event The name of the event.
 * @param data The data of the event.
 */
export async function handleWSEvent(
	client: Client,
	event: keyof WSEvents,
	data: WSEvents[keyof WSEvents],
) {
	await WSEventHandler[event](client, data as any);
}
