import { APIChannel } from './structures/Channel';
import { APIMessage, APIMessageReaction, APIMessageSummary } from './structures/Message';
import { APIDoc } from './structures/Doc';
import { APIListItem } from './structures/ListItem';
import { APIServerMember, APIServerBan } from './structures/Server';
import { APIWebhook } from './structures/Webhook';
import { APICalendarEvent, APICalendarEventRsvp } from './structures/CalendarEvent';
import { APIClientUser } from './structures/User';
import { APIForumTopic } from './structures/ForumTopic';

/** The ready payload of the websocket. */
export interface WSReadyPayload {
	/** The last message ID. */
	lastMessageId: string;
	/** The client user. */
	user: APIClientUser;
	/** The ping interval. */
	heartbeatIntervalMs: number;
}

/** The base message payload of the websocket. */
export interface WSMessagePayload {
	/** The op code. */
	op: number;
	/** The name of the event. */
	t?: string;
	/** The data of the event. */
	d?: any;
	/** The message ID. */
	s?: string;
}

/** The Guilded WebSocket API operation codes. */
export enum WSOpCodes {
	/** The event operation code. */
	Event = 0,
	/** The ready operation code. */
	Ready = 1,
	/** The resume operation code. */
	Resume = 2,
}

/**
 * The Guilded WebSocket API events.
 * @see https://www.guilded.gg/docs/api/websockets
 */
export interface WSEvents {
	/**
	 * Emitted when a message is created.
	 * @see https://www.guilded.gg/docs/api/websockets/ChatMessageCreated
	 */
	ChatMessageCreated: {
		/** The ID of the server the message belongs to. */
		serverId: string;
		/** The message that was created. */
		message: APIMessage;
	};
	/**
	 * Emitted when a message is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/ChatMessageUpdated
	 */
	ChatMessageUpdated: {
		/** The ID of the server the message belongs to. */
		serverId: string;
		/** The message that was edited. */
		message: APIMessage;
	};
	/**
	 * Emitted when a message is deleted.
	 * @see https://www.guilded.gg/docs/api/websockets/ChatMessageDeleted
	 */
	ChatMessageDeleted: {
		/** The ID of the server the message belongs to. */
		serverId: string;
		/** The message that was deleted. */
		message: APIMessageSummary;
	};
	/**
	 * Emitted whan a member joins a server.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberJoined
	 */
	TeamMemberJoined: {
		/** The ID of the server the member belongs to. */
		serverId: string;
		/** The member that joined the server. */
		member: APIServerMember;
	};
	/**
	 * Emitted when a member leaves a server.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberRemoved
	 */
	TeamMemberRemoved: {
		/** The ID of the server the member belongs to. */
		serverId: string;
		/** The ID of the member that left the server. */
		userId: string;
		/** Whether the member was kicked from the server. */
		isKick?: boolean;
		/** Whether the member was banned from the server. */
		isBan?: boolean;
	};
	/**
	 * Emitted when a member is banned from a server.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberBanned
	 */
	TeamMemberBanned: {
		/** The ID of the server the ban belongs to. */
		serverId: string;
		/** The created server ban. */
		serverMemberBan: APIServerBan;
	};
	/**
	 * Emitted when a member is unbanned from a server.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberUnbanned
	 */
	TeamMemberUnbanned: {
		/** The ID of the server the ban belongs to. */
		serverId: string;
		/** The deleted server ban. */
		serverMemberBan: APIServerBan;
	};
	/**
	 * Emitted when a server member is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberUpdated
	 */
	TeamMemberUpdated: {
		/** The ID of the server the member belongs to. */
		serverId: string;
		/** The updated information about the server member. */
		userInfo: {
			/** The ID of the member that was edited. */
			id: string;
			/** The nickname of the member. */
			nickname?: string;
		};
	};
	/**
	 * Emitted when roles in a server are edited.
	 * @see https://www.guilded.gg/docs/api/websockets/teamRolesUpdated
	 */
	teamRolesUpdated: {
		/** The ID of the server the roles belong to. */
		serverId: string;
		/** The updated roles. */
		memberRoleIds: {
			/** The ID of the member that own the roles. */
			userId: string;
			/** The IDs of the roles the member now has. */
			roleIds: number[];
		}[];
	};
	/**
	 * Emitted when a channel is created.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamChannelCreated
	 */
	TeamChannelCreated: {
		/** The ID of the server the channel belongs to. */
		serverId: string;
		/** The created channel. */
		channel: APIChannel;
	};
	/**
	 * Emitted when a channel is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamChannelUpdated
	 */
	TeamChannelUpdated: {
		/** The ID of the server the channel belongs to. */
		serverId: string;
		/** The edited channel. */
		channel: APIChannel;
	};
	/**
	 * Emitted when a channel is deleted.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamChannelDeleted
	 */
	TeamChannelDeleted: {
		/** The ID of the server the channel belongs to. */
		serverId: string;
		/** The deleted channel. */
		channel: APIChannel;
	};
	/**
	 * Emitted when a webhook is created.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamWebhookCreated
	 */
	TeamWebhookCreated: {
		/** The ID of the server the webhook belongs to. */
		serverId: string;
		/** The created webhook. */
		webhook: APIWebhook;
	};
	/**
	 * Emitted when a webhook is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamWebhookUpdated
	 */
	TeamWebhookUpdated: {
		/** The ID of the server the webhook belongs to. */
		serverId: string;
		/** The edited webhook. */
		webhook: APIWebhook;
	};
	/**
	 * Emitted when a doc is created.
	 * @see https://www.guilded.gg/docs/api/websockets/DocCreated
	 */
	DocCreated: {
		/** The ID of the server the doc belongs to. */
		serverId: string;
		/** The created doc. */
		doc: APIDoc;
	};
	/**
	 * Emitted when a doc is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/DocUpdated
	 */
	DocUpdated: {
		/** The ID of the server the doc belongs to. */
		serverId: string;
		/** The edited doc. */
		doc: APIDoc;
	};
	/**
	 * Emitted when a doc is deleted.
	 * @see https://www.guilded.gg/docs/api/websockets/DocDeleted
	 */
	DocDeleted: {
		/** The ID of the server the doc belongs to. */
		serverId: string;
		/** The deleted doc. */
		doc: APIDoc;
	};
	/**
	 * Emitted when a calendar event is created.
	 * @see https://www.guilded.gg/docs/api/websockets/CalendarEventCreated
	 */
	CalendarEventCreated: {
		/** The ID of the server the calendar event belongs to. */
		serverId: string;
		/** The created calendar event. */
		calendarEvent: APICalendarEvent;
	};
	/**
	 * Emitted when a calendar event is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/CalendarEventUpdated
	 */
	CalendarEventUpdated: {
		/** The ID of the server the calendar event belongs to. */
		serverId: string;
		/** The edited calendar event. */
		calendarEvent: APICalendarEvent;
	};
	/**
	 * Emitted when a calendar event is deleted.
	 * @see https://www.guilded.gg/docs/api/websockets/CalendarEventDeleted
	 */
	CalendarEventDeleted: {
		/** The ID of the server the calendar event belongs to. */
		serverId: string;
		/** The deleted calendar event. */
		calendarEvent: APICalendarEvent;
	};
	/**
	 * Emitted when a forum topic is created.
	 * @see https://www.guilded.gg/docs/api/websockets/ForumTopicCreated
	 */
	ForumTopicCreated: {
		/** The ID of the server the forum topic belongs to. */
		serverId: string;
		/** The created forum topic. */
		forumTopic: APIForumTopic;
	};
	/**
	 * Emitted when a forum topic is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/ForumTopicUpdated
	 */
	ForumTopicUpdated: {
		/** The ID of the server the forum topic belongs to. */
		serverId: string;
		/** The edited forum topic. */
		forumTopic: APIForumTopic;
	};
	/**
	 * Emitted when a forum topic is deleted.
	 * @see https://www.guilded.gg/docs/api/websockets/ForumTopicDeleted
	 */
	ForumTopicDeleted: {
		/** The ID of the server the forum topic belongs to. */
		serverId: string;
		/** The deleted forum topic. */
		forumTopic: APIForumTopic;
	};
	/**
	 * Emitted when a calendar event RSVP is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/CalendarEventRsvpUpdated
	 */
	CalendarEventRsvpUpdated: {
		/** The ID of the server the calendar event RSVP belongs to. */
		serverId: string;
		/** The edited calendar event RSVP. */
		calendarEventRsvp: APICalendarEventRsvp;
	};
	/**
	 * Emitted when calendar event RSVPs are edited.
	 * @see https://www.guilded.gg/docs/api/websockets/CalendarEventRsvpManyUpdated
	 */
	CalendarEventRsvpManyUpdated: {
		/** The ID of the server the calendar event RSVPs belong to. */
		serverId: string;
		/** The edited calendar event RSVPs. */
		calendarEventRsvps: APICalendarEventRsvp[];
	};
	/**
	 * Emitted when a calendar event RSVP is deleted.
	 * @see https://www.guilded.gg/docs/api/websockets/CalendarEventRsvpDeleted
	 */
	CalendarEventRsvpDeleted: {
		/** The ID of the server the calendar event RSVP belongs to. */
		serverId: string;
		/** The deleted calendar event RSVP. */
		calendarEventRsvp: APICalendarEventRsvp;
	};
	/**
	 * Emitted when a list item is created.
	 * @see https://www.guilded.gg/docs/api/websockets/ListItemCreated
	 */
	ListItemCreated: {
		/** The ID of the server the list item belongs to. */
		serverId: string;
		/** The created list item. */
		listItem: APIListItem;
	};
	/**
	 * Emitted when a list item is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/ListItemUpdated
	 */
	ListItemUpdated: {
		/** The ID of the server the list item belongs to. */
		serverId: string;
		/** The edited list item. */
		listItem: APIListItem;
	};
	/**
	 * Emitted when a list item is deleted.
	 * @see https://www.guilded.gg/docs/api/websockets/ListItemDeleted
	 */
	ListItemDeleted: {
		/** The ID of the server the list item belongs to. */
		serverId: string;
		/** The deleted list item. */
		listItem: APIListItem;
	};
	/**
	 * Emitted when a list item is completed.
	 * @see https://www.guilded.gg/docs/api/websockets/ListItemCompleted
	 */
	ListItemCompleted: {
		/** The ID of the server the list item belongs to. */
		serverId: string;
		/** The completed list item. */
		listItem: APIListItem;
	};
	/**
	 * Emitted when a list item is uncompleted.
	 * @see https://www.guilded.gg/docs/api/websockets/ListItemUncompleted
	 */
	ListItemUncompleted: {
		/** The ID of the server thw list item belongs to. */
		serverId: string;
		/** The uncompleted list item. */
		listItem: APIListItem;
	};
	/**
	 * Emitted when a message reaction is created.
	 * @see https://www.guilded.gg/docs/api/websockets/ChannelMessageReactionCreated
	 */
	ChannelMessageReactionCreated: {
		/** The ID of the server the message belongs to. */
		serverId?: string;
		/** The created reaction. */
		reaction: APIMessageReaction;
	};
	/**
	 * Emitted when a message reaction is deleted.
	 * @see https://www.guilded.gg/docs/api/websockets/ChannelMessageReactionDeleted
	 */
	ChannelMessageReactionDeleted: {
		/** The ID of the server the message belongs to. */
		serverId?: string;
		/** The deleted reaction. */
		reaction: APIMessageReaction;
	};
}
