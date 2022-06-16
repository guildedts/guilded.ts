import EventEmitter from 'events';
import RestManager from '@guildedts/rest';
import WebsocketManager from '@guildedts/ws';
import { Doc } from './Doc';
import { ListItem } from './listItem/ListItem';
import { Message } from './Message';
import { Server } from './server/Server';
import { ServerBan } from './server/ServerBan';
import { ServerMember } from './server/ServerMember';
import { User } from './User';
import { Webhook } from './Webhook';
import { ChannelManager, ChannelResolvable } from '../managers/channel/ChannelManager';
import { GroupManager } from '../managers/group/GroupManager';
import { ServerManager } from '../managers/server/ServerManager';
import { UserManager } from '../managers/UserManager';
import { handleWSEvent } from '../ws';
import { APIMessageSummary, APIUser, WSEvents } from 'guilded-api-typings';

/** The main hub for interacting with the Guilded API. */
export class Client extends EventEmitter {
	/** The REST manager for the Guilded API. */
	public readonly rest: RestManager;
	/** The Websocket manager for the Guilded API. */
	public readonly ws: WebsocketManager;

	/** The manager of channels that belong to the client. */
	public readonly channels: ChannelManager;
	/** The manager of users that belong to the client. */
	public readonly users: UserManager;
	/** The manager of servers that belong to the client. */
	public readonly servers: ServerManager;
	/** The manager of groups that belong to the client. */
	public readonly groups: GroupManager;

	/** The auth token for the Guilded API. */
	public token?: string;
	/** The user the client is logged in as. */
	public user?: User;

	/** @param options The options for the client. */
	public constructor(public readonly options: ClientOptions = {}) {
		super();
		this.token = options.token;
		this.rest = new RestManager({
			token: this.token,
			version: 1,
			maxRetries: options.maxRestAPIRetries,
			retryInterval: options.restAPIRetryInterval,
		});
		this.ws = new WebsocketManager({
			token: options.token,
			version: 1,
		});
		this.channels = new ChannelManager(this);
		this.users = new UserManager(this);
		this.servers = new ServerManager(this);
		this.groups = new GroupManager(this);
	}

	/** The router for the Guilded REST API. */
	public get api() {
		return this.rest.router;
	}

	/** Whether the client is ready to use. */
	public get isReady() {
		return this.ws.isConnected;
	}

	/** The date the client was ready. */
	public get readyAt() {
		return this.ws.connectedAt;
	}

	/** The timestamp the client was ready. */
	public get readyTimestamp() {
		return this.ws.connectedTimestamp;
	}

	/** The time the client has been in the ready state. */
	public get uptime() {
		return this.ws.uptime;
	}

	/**
	 * Login to the Guilded API.
	 * @param token The auth token for the Guilded API.
	 * @returns The client.
	 */
	public login(token: string) {
		this.token = token || this.token;
		this.rest.setToken(this.token);
		this.ws.on('connect', this.onWSConnect.bind(this));
		this.ws.on('disconnect', this.onWSDisconnect.bind(this));
		this.ws.on('data', this.onWSData.bind(this));
		this.ws.connect(this.token);
		return this;
	}

	/**
	 * Disconnect from Guilded.
	 * @returns The client.
	 */
	public disconnect() {
		this.ws.disconnect();
		return this;
	}

	/** @ignore */
	private onWSConnect(user: APIUser) {
		this.user = new User(this, user);
		if (this.options.cacheUsers ?? true) this.users.cache.set(this.user.id, this.user);
		this.emit('ready', this);
	}

	/** @ignore */
	private onWSDisconnect() {
		this.emit('disconnect', this);
	}

	/** @ignore */
	private onWSData<Event extends keyof WSEvents = keyof WSEvents>(
		event: Event,
		data: WSEvents[Event],
	) {
		handleWSEvent(this, event, data);
	}

	/**
	 * Debug the client.
	 * @param data The debug data.
	 * @returns The client.
	 */
	public debug(data?: any) {
		this.emit('debug', this, data);
		return this;
	}
}

export interface Client {
	/** @ignore */
	on<Event extends keyof ClientEvents>(
		event: Event,
		listener: (...args: ClientEvents[Event]) => any,
	): this;
	/** @ignore */
	once<Event extends keyof ClientEvents>(
		event: Event,
		listener: (...args: ClientEvents[Event]) => any,
	): this;
	/** @ignore */
	off<Event extends keyof ClientEvents>(
		event: Event,
		listener: (...args: ClientEvents[Event]) => any,
	): this;
	emit<Event extends keyof ClientEvents>(event: Event, ...args: ClientEvents[Event]): boolean;
}

/** The events that belong to the client. */
export interface ClientEvents {
	/** Emitted when the client is ready to use. */
	ready: [client: Client];
	/** Emitted when the client is disconnected from Guilded. */
	disconnect: [client: Client];
	/** Emitted when debug data is received. */
	debug: [client: Client, data: any];
	/** Emitted when a message is created. */
	messageCreate: [message: Message];
	/** Emitted when a message is edited. */
	messageEdit: [message: Message];
	/** Emitted when a message is deleted. */
	messageDelete: [message: Message | APIMessageSummary];
	/** Emitted when a member joins a server. */
	memberAdd: [member: ServerMember];
	/** Emitted when a member leaves a server. */
	memberRemove: [server: Server];
	/** Emitted when a member is banned from a server. */
	memberBan: [ban: ServerBan];
	/** Emitted when a member is unbanned from a server. */
	memberUnban: [ban: ServerBan];
	/** Emitted when a member is edited. */
	memberEdit: [member: ServerMember];
	/** Emitted when roles in server are edited. */
	rolesEdit: [server: Server];
	/** Emitted when a channel is created. */
	channelCreate: [channel: ChannelResolvable];
	/** Emitted when a channel is edited. */
	channelEdit: [channel: ChannelResolvable];
	/** Emitted when a channel is deleted. */
	channelDelete: [channel: ChannelResolvable];
	/** Emitted when a webhook is created. */
	webhookCreate: [webhook: Webhook];
	/** Emitted when a webhook is edited. */
	webhookEdit: [webhook: Webhook];
	/** Emitted when a doc is created. */
	docCreate: [doc: Doc];
	/** Emitted when a doc is edited. */
	docEdit: [doc: Doc];
	/** Emitted when a doc is deleted. */
	docDelete: [doc: Doc];
	/** Emitted when a list item is created. */
	listItemCreate: [listItem: ListItem];
	/** Emitted when a list item is edited. */
	listItemEdit: [listItem: ListItem];
	/** Emitted when a list item is deleted. */
	listItemDelete: [listItem: ListItem];
	/** Emitted when a list item is completed. */
	listItemComplete: [listItem: ListItem];
	/** Emitted when a list item is uncompleted. */
	listItemUncomplete: [listItem: ListItem];
}

/** The options for the client. */
export interface ClientOptions {
	/** The auth token for the Guilded API. */
	token?: string;
	/** The max retries for REST API requests. */
	maxRestAPIRetries?: number;
	/** The retry interval for REST API requests. */
	restAPIRetryInterval?: number;
	/** Whether to cache channels. */
	cacheChannels?: boolean;
	/** The max cache size for channels. */
	maxChannelCache?: number;
	/** Whether to cache messages. */
	cacheMessages?: boolean;
	/** The max cache size for messages. */
	maxMessageCache?: number;
	/** Whether to cache servers. */
	cacheServers?: boolean;
	/** The max cache size for servers. */
	maxServerCache?: number;
	/** Whether to cache users. */
	cacheUsers?: boolean;
	/** The max cache size for users. */
	maxUserCache?: number;
	/** Whether to cache server bans. */
	cacheServerBans?: boolean;
	/** The max cache size for server bans. */
	maxServerBanCache?: number;
	/** Whether to cache server members. */
	cacheServerMembers?: boolean;
	/** The max cache size for server members. */
	maxServerMemberCache?: number;
	/** Whether to cache forum threads. */
	cacheForumThreads?: boolean;
	/** The max cache size for forum threads. */
	maxForumThreadCache?: number;
	/** Whether to cache list items. */
	cacheListItems?: boolean;
	/** The max cache size for list items. */
	maxListItemCache?: number;
	/** Whether to cache docs. */
	cacheDocs?: boolean;
	/** The max cache size for docs. */
	maxDocCache?: number;
	/** Whether to cache groups. */
	cacheGroups?: boolean;
	/** The max cache size for groups. */
	maxGroupCache?: number;
	/** Whether to cache server roles. */
	cacheServerRoles?: boolean;
	/** The max cache size for server roles. */
	maxServerRoleCache?: number;
	/** Whether to cache server member roles. */
	cacheServerMemberRoles?: boolean;
	/** The max cache size for server member roles. */
	maxServerMemberRoleCache?: number;
	/** Whether to cache webhooks. */
	cacheWebhooks?: boolean;
	/** The max cache size for webhooks. */
	maxWebhookCache?: number;
}
