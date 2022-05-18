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
import { APIMessageSummary, APIUser } from 'guilded-api-typings';

/** The main hub for interacting with the Guilded API. */
export class Client extends EventEmitter {
	/** The REST API manager for the client. */
	public readonly rest: RestManager;
	/** The Websocket API manager for the client. */
	public readonly ws: WebsocketManager;

	/** A manager of channels that belong to the client. */
	public readonly channels: ChannelManager;
	/** A manager of users that belong to the client. */
	public readonly users: UserManager;
	/** A manager of servers that belong to the client. */
	public readonly servers: ServerManager;
	/** A manager of groups that belong to the client. */
	public readonly groups: GroupManager;

	/** The client authorization token. */
	public token?: string;
	/** The client user. */
	public user?: User;

	/** @param options The client options. */
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

	/** How long the client has been in the ready state. */
	public get uptime() {
		return this.ws.uptime;
	}

	/**
	 * Log in to the Guilded API.
	 * @param token The client authorization token.
	 */
	public login(token: string) {
		this.token = token ?? this.token;
		this.rest.setToken(this.token);
		this.ws.on('connect', this.onWSConnect.bind(this));
		this.ws.on('disconnect', this.onWSDisconnect.bind(this));
		this.ws.on('data', this.onWSData.bind(this));
		this.ws.connect(this.token);
	}

	/** Disconnect from Guilded. */
	public disconnect() {
		this.ws.disconnect();
	}

	/** @ignore */
	private onWSConnect(user: APIUser) {
		this.user = new User(this, user);
		this.emit('ready', this);
	}

	/** @ignore */
	private onWSDisconnect() {
		this.emit('disconnect', this);
	}

	/** @ignore */
	private onWSData(event: any, data: any) {
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

/** The client events. */
export interface ClientEvents {
	/** Emitted when the client is ready to use. */
	ready: [client: Client];
	/** Emitted when the client is disconnected from the API. */
	disconnect: [client: Client];
	/** Emitted when debug data is received. */
	debug: [client: Client, data: any];
	/** Emitted when a message is sent. */
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
	/** Emitted when a server's roles are edited. */
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

/** The client options */
export interface ClientOptions {
	/** The client authorization token. */
	token?: string;
	/** The limit of how many times to try re-establish the websocket connection. */
	reconnectLimit?: number;
	/** The max retries for REST API requests. */
	maxRestAPIRetries?: number;
	/** The retry interval for REST API requests. */
	restAPIRetryInterval?: number;
	/** Whether to cache channels. */
	cacheChannels?: boolean;
	/** The maximum of channels cache. */
	maxChannelCache?: number;
	/** Whether to cache messages. */
	cacheMessages?: boolean;
	/** The maximum size of messages cache. */
	maxMessageCache?: number;
	/** Whether to cache servers. */
	cacheServers?: boolean;
	/** The maximum size of servers cache. */
	maxServerCache?: number;
	/** Whether to cache users. */
	cacheUsers?: boolean;
	/** The maximum size of users cache. */
	maxUserCache?: number;
	/** Whether to cache server bans. */
	cacheServerBans?: boolean;
	/** The maximum size of server bans cache. */
	maxServerBanCache?: number;
	/** Whether to cache server members. */
	cacheServerMembers?: boolean;
	/** The maximum size of server members cache. */
	maxServerMemberCache?: number;
	/** Whether to cache forum threads. */
	cacheForumThreads?: boolean;
	/** The maximum size of forum threads cache. */
	maxForumThreadCache?: number;
	/** Whether to cache list items. */
	cacheListItems?: boolean;
	/** The maximum size of list items cache. */
	maxListItemCache?: number;
	/** Whether to cache docs. */
	cacheDocs?: boolean;
	/** The maximum size of docs cache. */
	maxDocCache?: number;
	/** Whether to cache groups. */
	cacheGroups?: boolean;
	/** The maximum size of groups cache. */
	maxGroupCache?: number;
	/** Whether to cache server roles. */
	cacheServerRoles?: boolean;
	/** The maximum size of server roles cache. */
	maxServerRoleCache?: number;
	/** Whether to cache server member roles. */
	cacheServerMemberRoles?: boolean;
	/** The maximum size of server member roles cache. */
	maxServerMemberRoleCache?: number;
	/** Whether to cache webhooks. */
	cacheWebhooks?: boolean;
	/** The maximum size of webhooks cache. */
	maxWebhookCache?: number;
}
