import { WebSocketEvent } from 'guilded-api-typings';
import { Client } from '../structures/Client';
import * as calendarEvent from './events/calendarEvent';
import * as channel from './events/channel';
import * as doc from './events/doc';
import * as forumTopic from './events/forumTopic';
import * as listItem from './events/listItem';
import * as message from './events/message';
import * as server from './events/server';
import * as serverMember from './events/serverMember';
import * as webhook from './events/webhook';

/**
 * A map of all WebSocket events with their respective handlers
 */
const WSEventHandler: {
	[event in WebSocketEvent]?: (client: Client, data: any) => void | Promise<void>;
} = {
	[WebSocketEvent.MessageCreate]: message.created,
	[WebSocketEvent.MessageUpdate]: message.updated,
	[WebSocketEvent.MessageDelete]: message.deleted,
	[WebSocketEvent.MessageReactionAdd]: message.reactionCreated,
	[WebSocketEvent.MessageReactionRemove]: message.reactionDeleted,
	[WebSocketEvent.ServerAdd]: server.botAdded,
	[WebSocketEvent.ServerRemove]: server.botRemoved,
	[WebSocketEvent.ServerMemberAdd]: serverMember.joined,
	[WebSocketEvent.ServerMemberRemove]: serverMember.removed,
	[WebSocketEvent.ServerBanAdd]: serverMember.banned,
	[WebSocketEvent.ServerBanRemove]: serverMember.unbanned,
	[WebSocketEvent.ServerMemberUpdate]: serverMember.updated,
	[WebSocketEvent.ServerRolesUpdate]: server.rolesUpdated,
	[WebSocketEvent.ChannelCreate]: channel.created,
	[WebSocketEvent.ChannelUpdate]: channel.updated,
	[WebSocketEvent.ChannelDelete]: channel.deleted,
	[WebSocketEvent.WebhookCreate]: webhook.created,
	[WebSocketEvent.WebhookUpdate]: webhook.updated,
	[WebSocketEvent.DocCreate]: doc.created,
	[WebSocketEvent.DocUpdate]: doc.updated,
	[WebSocketEvent.DocDelete]: doc.deleted,
	[WebSocketEvent.CalendarEventCreate]: calendarEvent.created,
	[WebSocketEvent.CalendarEventUpdate]: calendarEvent.updated,
	[WebSocketEvent.CalendarEventDelete]: calendarEvent.deleted,
	[WebSocketEvent.ForumTopicCreate]: forumTopic.created,
	[WebSocketEvent.ForumTopicUpdate]: forumTopic.updated,
	[WebSocketEvent.ForumTopicDelete]: forumTopic.deleted,
	[WebSocketEvent.ForumTopicPin]: forumTopic.pinned,
	[WebSocketEvent.ForumTopicUnpin]: forumTopic.unpinned,
	[WebSocketEvent.ForumTopicLock]: forumTopic.locked,
	[WebSocketEvent.ForumTopicUnlock]: forumTopic.unlocked,
	[WebSocketEvent.CalendarEventRsvpUpdate]: calendarEvent.rsvpUpdated,
	[WebSocketEvent.CalendarEventRsvpsUpdate]: calendarEvent.rsvpsUpdated,
	[WebSocketEvent.CalendarEventRsvpDelete]: calendarEvent.rsvpDeleted,
	[WebSocketEvent.ListItemCreate]: listItem.created,
	[WebSocketEvent.ListItemUpdate]: listItem.updated,
	[WebSocketEvent.ListItemDelete]: listItem.deleted,
	[WebSocketEvent.ListItemComplete]: listItem.completed,
	[WebSocketEvent.ListItemUncomplete]: listItem.uncompleted,
};

/**
 * Handle a WebSocket event
 * @param client The client
 * @param event The name of the event
 * @param data The data of the event
 */
export function handleWSEvent(client: Client, event: WebSocketEvent, data: unknown) {
	return WSEventHandler[event]?.(client, data as any);
}
