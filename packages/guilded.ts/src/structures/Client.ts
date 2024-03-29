import EventEmitter from 'events';
import RESTManager from '@guildedts/rest';
import WebsocketManager from '@guildedts/ws';
import { Doc } from './Doc';
import { ListItem } from './listItem/ListItem';
import { Message } from './message/Message';
import { Server } from './server/Server';
import { ServerBan } from './server/ServerBan';
import { ServerMember } from './server/ServerMember';
import { ClientUser } from './User';
import { Webhook } from './Webhook';
import { ChannelManager } from '../managers/channel/ChannelManager';
import { GroupManager } from '../managers/group/GroupManager';
import { ServerManager } from '../managers/server/ServerManager';
import { UserManager } from '../managers/UserManager';
import { handleWSEvent } from '../ws';
import {
	APIBot,
	APIMessageSummary,
	WebSocketEvent,
	WebSocketServerMemberRemoveEventData,
} from 'guilded-api-typings';
import { CalendarEvent } from './calendarEvent/CalendarEvent';
import { MessageReaction } from './message/MessageReaction';
import { Channel } from './channel/Channel';
import { Collection } from '@discordjs/collection';
import { CalendarEventRsvp } from './calendarEvent/CalendarEventRsvp';
import { ForumTopic } from './ForumTopic';

/**
 * The main hub for interacting with the Guilded API
 * @example
 * const client = new Client({ token: 'your-token' });
 *
 * client.once('ready', () => console.log(`Logged in as ${client.user?.name}!`));
 *
 * client.login();
 */
export class Client extends EventEmitter {
	/**
	 * The manager for the Guilded REST API
	 */
	readonly rest: RESTManager;
	/**
	 * The Websocket manager for the Guilded API
	 */
	readonly ws: WebsocketManager;

	/**
	 * The manager for channels
	 */
	readonly channels: ChannelManager;
	/**
	 * The manager for users
	 */
	readonly users: UserManager;
	/**
	 * The manager for servers
	 */
	readonly servers: ServerManager;
	/**
	 * The manager for groups
	 */
	readonly groups: GroupManager;

	/**
	 * The user
	 */
	user?: ClientUser;

	/**
	 * @param options The options for the client
	 */
	constructor(public options: ClientOptions = {}) {
		super();
		this.rest = new RESTManager({
			token: options.token,
			version: 1,
			maxRetries: options.maxRestAPIRetries,
			retryInterval: options.restAPIRetryInterval,
		});
		this.ws = new WebsocketManager({
			token: options.token,
			version: 1,
			reconnect: options.reconnect,
			maxReconnects: options.maxReconnects,
		});
		this.channels = new ChannelManager(this);
		this.users = new UserManager(this);
		this.servers = new ServerManager(this);
		this.groups = new GroupManager(this);
		this.ws.on('ready', this.onWSConnect.bind(this));
		this.ws.on('reconnect', this.onWSReconnect.bind(this));
		this.ws.on('disconnect', this.onWSDisconnect.bind(this));
		this.ws.on('event', this.onWSEvent.bind(this));
	}

	/**
	 * The router for the Guilded REST API
	 */
	get api() {
		return this.rest.router;
	}

	/**
	 * The authorization token to use
	 */
	get token() {
		return this.options.token ?? null;
	}

	/**
	 * Whether the client is ready to use
	 */
	get isReady() {
		return this.ws.isReady;
	}

	/**
	 * When the client became ready to use
	 */
	get readyAt() {
		return this.ws.readyAt;
	}

	/**
	 * The duration of how long the client has been in the ready state
	 */
	get uptime() {
		return this.ws.uptime;
	}

	/**
	 * Login to the Guilded API
	 * @param token The authorization token to use
	 * @returns The client
	 */
	login(token?: string) {
		this.options.token = token || this.token!;
		this.rest.setToken(this.token!);
		this.ws.connect(this.token!);
		return new Promise<this>((resolve) => this.once('ready', () => resolve(this)));
	}

	/**
	 * Disconnect from Guilded
	 * @returns The client
	 */
	disconnect() {
		this.ws.disconnect();
		return this;
	}

	/**
	 * Debug the client
	 * @param data The debug data
	 * @returns The client
	 */
	debug(data?: any) {
		this.emit('debug', this, data);
		return this;
	}

	private onWSConnect(user: APIBot) {
		this.user = new ClientUser(this, user);
		this.emit('ready', this);
	}

	private onWSReconnect() {
		this.emit('reconnect', this);
	}

	private onWSDisconnect() {
		this.emit('disconnect', this);
	}

	private onWSEvent(event: WebSocketEvent, data: unknown) {
		handleWSEvent(this, event, data);
	}
}

export interface Client {
	on<Event extends keyof ClientEvents>(
		event: Event,
		listener: (...args: ClientEvents[Event]) => any,
	): this;
	once<Event extends keyof ClientEvents>(
		event: Event,
		listener: (...args: ClientEvents[Event]) => any,
	): this;
	off<Event extends keyof ClientEvents>(
		event: Event,
		listener: (...args: ClientEvents[Event]) => any,
	): this;
	emit<Event extends keyof ClientEvents>(event: Event, ...args: ClientEvents[Event]): boolean;
}

/**
 * The client events
 */
export interface ClientEvents {
	/**
	 * Emitted whenever the client is ready to use
	 */
	ready: [client: Client];
	/**
	 * Emitted whenever the client is disconnected from Guilded
	 */
	disconnect: [client: Client];
	/**
	 * Emitted whenever the client is reconnected to Guilded
	 */
	reconnect: [client: Client];
	/**
	 * Emitted whenever debug data is received
	 */
	debug: [client: Client, data: any];
	/**
	 * Emitted whenever the bot is added to a server
	 */
	serverAdd: [server: Server, addedBy: ServerMember];
	/**
	 * Emitted whenever the bot is removed from a server
	 */
	serverRemove: [server: Server, removedBy?: ServerMember];
	/**
	 * Emitted whenever a message is created
	 */
	messageCreate: [message: Message];
	/**
	 * Emitted whenever a message is edited
	 */
	messageEdit: [newMessage: Message, oldMessage?: Message];
	/**
	 * Emitted whenever a message is deleted
	 */
	messageDelete: [message: Message | APIMessageSummary];
	/**
	 * Emitted whenever a user joins a server
	 */
	serverMemberAdd: [serverMember: ServerMember];
	/**
	 * Emitted whenever a user leaves a server
	 */
	serverMemberRemove: [data: WebSocketServerMemberRemoveEventData, server: Server];
	/**
	 * Emitted whenever a user is banned from a server
	 */
	serverMemberBan: [serverBan: ServerBan];
	/**
	 * Emitted whenever a user is unbanned from a server
	 */
	serverMemberUnban: [serverBan: ServerBan];
	/**
	 * Emitted whenever a server member is edited
	 */
	serverMemberEdit: [newServerMember: ServerMember, oldServerMember?: ServerMember];
	/**
	 * Emitted whenever server roles are edited
	 */
	serverRolesEdit: [
		newServerMembers: Collection<string, ServerMember>,
		oldServerMembers: Collection<string, ServerMember>,
	];
	/**
	 * Emitted whenever a channel is created
	 */
	channelCreate: [channel: Channel];
	/**
	 * Emitted whenever a channel is edited
	 */
	channelEdit: [newChannel: Channel, oldChannel?: Channel];
	/**
	 * Emitted whenever a channel is deleted
	 */
	channelDelete: [channel: Channel];
	/**
	 * Emitted whenever a webhook is created
	 */
	webhookCreate: [webhook: Webhook];
	/**
	 * Emitted when a webhook is edited
	 */
	webhookEdit: [newWebhook: Webhook, oldWebhook?: Webhook];
	/**
	 * Emitted whenever a doc is created
	 */
	docCreate: [doc: Doc];
	/**
	 * Emitted whenever a doc is edited
	 */
	docEdit: [newDoc: Doc, oldDoc?: Doc];
	/**
	 * Emitted whenever a doc is deleted
	 */
	docDelete: [doc: Doc];
	/**
	 * Emitted whenever a calendar event is created
	 */
	calendarEventCreate: [event: CalendarEvent];
	/**
	 * Emitted whenever a calendar event is edited
	 */
	calendarEventEdit: [newCalendarEvent: CalendarEvent, oldCalendarEvent?: CalendarEvent];
	/**
	 * Emitted whenever a calendar event is deleted
	 */
	calendarEventDelete: [event: CalendarEvent];
	/**
	 * Emitted whenever a forum topic is created
	 */
	forumTopicCreate: [forumTopic: ForumTopic];
	/**
	 * Emitted whenever a forum topic is edited
	 */
	forumTopicEdit: [newForumTopic: ForumTopic, oldForumTopic?: ForumTopic];
	/**
	 * Emitted whenever a forum topic is deleted
	 */
	forumTopicDelete: [forumTopic: ForumTopic];
	/**
	 * Emitted whenever a forum topic is pinned
	 */
	forumTopicPin: [forumTopic: ForumTopic];
	/**
	 * Emitted whenever a forum topic is unpinned
	 */
	forumTopicUnpin: [forumTopic: ForumTopic];
	/**
	 * Emitted whenever a forum topic is locked
	 */
	forumTopicLock: [forumTopic: ForumTopic];
	/**
	 * Emitted whenever a forum topic is unlocked
	 */
	forumTopicUnlock: [forumTopic: ForumTopic];
	/**
	 * Emitted whenever a calendar event RSVP is edited
	 */
	calendarEventRsvpEdit: [
		newCalendarEventRsvp: CalendarEventRsvp,
		oldCalendarEventRsvp?: CalendarEventRsvp,
	];
	/**
	 * Emitted whenever calendar event RSVPs are edited
	 */
	calendarEventRsvpsEdit: [
		newCalendarEventRsvps: Collection<string, CalendarEventRsvp>,
		oldCalendarEventRsvps: Collection<string, CalendarEventRsvp>,
	];
	/**
	 * Emitted whenever a calendar event RSVP is deleted
	 */
	calendarEventRsvpDelete: [calendarEventRsvp: CalendarEventRsvp];
	/**
	 * Emitted whenever a list item is created
	 */
	listItemCreate: [listItem: ListItem];
	/**
	 * Emitted whenever a list item is edited
	 */
	listItemEdit: [newListItem: ListItem, oldListItem?: ListItem];
	/**
	 * Emitted whenever a list item is deleted
	 */
	listItemDelete: [listItem: ListItem];
	/**
	 * Emitted whenever a list item is completed
	 */
	listItemComplete: [listItem: ListItem];
	/**
	 * Emitted whenever a list item is uncompleted
	 */
	listItemUncomplete: [listItem: ListItem];
	/**
	 * Emitted whenever a message reaction is added
	 */
	messageReactionAdd: [reaction: MessageReaction];
	/**
	 * Emitted whenever a message reaction is removed
	 */
	messageReactionRemove: [reaction: MessageReaction];
}

/**
 * The options for the client
 */
export interface ClientOptions {
	/**
	 * The authorization token to use
	 */
	token?: string;
	/**
	 * The maximum amount of REST API retry attempts
	 *
	 * @default 3
	 */
	maxRestAPIRetries?: number;
	/**
	 * The interval to wait between REST API request retries
	 *
	 * @default 30_000
	 */
	restAPIRetryInterval?: number;
	/**
	 * Whether to allow WebSocket reconnects
	 *
	 * @default true
	 */
	reconnect?: boolean;
	/**
	 * The maximum number of WebSocket reconnect attempts
	 *
	 * @default 5
	 */
	maxReconnects?: number;
	/**
	 * Whether to cache messages
	 */
	cacheMessages?: boolean;
	/**
	 * The max cache size for messages
	 */
	maxMessageCache?: number;
	/**
	 * Whether to dispose cached messages
	 */
	disposeCachedMessages?: boolean;
	/**
	 * Whether to dispose collected messages
	 */
	disposeCollectedMessages?: boolean;
	/**
	 * Whether to cache server members
	 */
	cacheServerMembers?: boolean;
	/**
	 * The max cache size for server members
	 */
	maxServerMemberCache?: number;
	/**
	 * Whether to dispose cached server members
	 */
	disposeCachedServerMembers?: boolean;
	/**
	 * Whether to cache server bans
	 */
	cacheServerBans?: boolean;
	/**
	 * The max cache size for server bans
	 */
	maxServerBanCache?: number;
	/**
	 * Whether to dispose cached server bans
	 */
	disposeCachedServerBans?: boolean;
	/**
	 * Whether to cache server roles
	 */
	cacheServerRoles?: boolean;
	/**
	 * The max cache size for server roles
	 */
	maxServerRoleCache?: number;
	/**
	 * Whether to cache server member roles
	 */
	cacheServerMemberRoles?: boolean;
	/**
	 * The max cache size for server member roles
	 */
	maxServerMemberRoleCache?: number;
	/**
	 * Whether to cache channels
	 */
	cacheChannels?: boolean;
	/**
	 * The max cache size for channels
	 */
	maxChannelCache?: number;
	/**
	 * Whether to dispose cached channels
	 */
	disposeCachedChannels?: boolean;
	/**
	 * Whether to cache servers
	 */
	cacheServers?: boolean;
	/**
	 * The max cache size for servers
	 */
	maxServerCache?: number;
	/**
	 * Whether to cache users
	 */
	cacheUsers?: boolean;
	/**
	 * The max cache size for users
	 */
	maxUserCache?: number;
	/**
	 * Whether to cache forum topics
	 */
	cacheForumTopics?: boolean;
	/**
	 * The max cache size for forum topics
	 */
	maxForumTopicCache?: number;
	/**
	 * Whether to dispose cached forum topics
	 */
	disposeCachedForumTopics?: boolean;
	/**
	 * Whether to cache list items
	 */
	cacheListItems?: boolean;
	/**
	 * The max cache size for list items
	 */
	maxListItemCache?: number;
	/**
	 * Whether to dispose cached list items
	 */
	disposeCachedListItems?: boolean;
	/**
	 * Whether to cache docs
	 */
	cacheDocs?: boolean;
	/**
	 * The max cache size for docs
	 */
	maxDocCache?: number;
	/**
	 * Whether to dispose cached docs
	 */
	disposeCachedDocs?: boolean;
	/**
	 * Whether to cache groups
	 */
	cacheGroups?: boolean;
	/**
	 * The max cache size for groups
	 */
	maxGroupCache?: number;
	/**
	 * Whether to cache webhooks
	 */
	cacheWebhooks?: boolean;
	/**
	 * The max cache size for webhooks
	 */
	maxWebhookCache?: number;
	/**
	 * Whether to cache calendar events
	 */
	cacheCalendarEvents?: boolean;
	/**
	 * The max cache size for calendar events
	 */
	maxCalendarEventCache?: number;
	/**
	 * Whether to dispose cached calendar events
	 */
	disposeCachedCalendarEvents?: boolean;
	/**
	 * Whether to cache calendar event RSVPs
	 */
	cacheCalendarEventRsvps?: boolean;
	/**
	 * The max cache size for calendar event RSVPs
	 */
	maxCalendarEventRsvpCache?: number;
	/**
	 * Whether to dispose cached calendar event RSVPs
	 */
	disposeCachedCalendarEventRsvps?: boolean;
	/**
	 * Whether to cache message reactions
	 */
	cacheMessageReactions?: boolean;
	/**
	 * The max cache size for message reactions
	 */
	maxMessageReactionCache?: number;
	/**
	 * Whether to dispose cached message reactions
	 */
	disposeCachedMessageReactions?: boolean;
	/**
	 * Whether to dispose collected message reactions
	 */
	disposeCollectedMessageReactions?: boolean;
}
