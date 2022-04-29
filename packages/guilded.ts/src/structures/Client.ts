import EventEmitter from 'events';
import RestManager from '@guildedts/rest';
import WebsocketManager from '@guildedts/ws';
import { CacheCollection, Message, Server, ServerBan, ServerMember, User } from '.';
import { ChannelManager, ServerManager, UserManager } from '../managers';

/** The main hub for interacting with the Guilded API. */
export class Client extends EventEmitter {
	/** The REST API manager for the client. */
	public readonly rest: RestManager;
	/** The websocket API manager for the client. */
	public readonly ws = new WebsocketManager(1);

	/** A manager of channels that belong to the client. */
	public channels: ChannelManager;
	/** A manager of users that belong to the client. */
	public users: UserManager;
	/** A manager of servers that belong to the client. */
	public servers: ServerManager;

	/** The client authorization token. */
	public token?: string;
	/** The client user */
	public user?: User;

	/** @param options The client options. */
	public constructor(public readonly options: ClientOptions = {}) {
		super();

		this.token = options.token;
		this.rest = new RestManager({
			version: 1,
			maxRetries: options.maxRestAPIRetries,
			retryInterval: options.restAPIRetryInterval,
		});
		this.channels = new ChannelManager(this);
		this.users = new UserManager(this);
		this.servers = new ServerManager(this);
	}

	/** Whether the client is ready to use. */
	public get ready() {
		return this.ws.connected;
	}

	/** The time when the client was ready. */
	public get readyAt() {
		return this.ws.connectedAt;
	}

	/** The timestamp when the client was ready. */
	public get readyTimestamp() {
		return this.ws.connectedTimestamp;
	}

	/** How long the client has been in the ready state. (in MS) */
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

		this.ws.on('connect', (data) => {
			this.user = new User(this, data);
			this.emit('ready', this);
		});

		this.ws.on('disconnect', () => {
			this.token = undefined;
			this.rest.setToken(undefined);
			this.emit('disconnect', this);
		});

		this.ws.on('data', async (type, data) => {
			let message: Message | undefined;
			let server: Server | undefined;
			let members: CacheCollection<string, ServerMember> | undefined;

			switch (type) {
				case 'ChatMessageCreated':
					message = await this.channels
						.fetch(data.message.channelId)
						.messages.fetch(data.message.id);

					this.emit('messageCreate', message);
					break;
				case 'ChatMessageUpdated':
					message = await this.channels
						.fetch(data.message.channelId)
						.messages.fetch(data.message.id);

					this.emit('messageEdit', message);
					break;
				case 'ChatMessageDeleted':
					message = this.channels
						.fetch(data.message.channelId)
						.messages.cache.get(data.message.id);

					if (!message) {
						const channel = this.channels.fetch(data.message.channelId);
						message = new Message(channel, data.message);
					}

					this.emit('messageDelete', message);
					break;
				case 'TeamMemberJoined':
					server = this.servers.fetch(data.serverId);

					this.emit('memberAdd', await server.members.fetch(data.member.user.id));
					break;
				case 'TeamMemberRemoved':
					this.emit('memberRemove', await this.users.fetch(data.serverId, data.userId));
					break;
				case 'TeamMemberUpdated':
					server = this.servers.fetch(data.serverId);

					this.emit('memberEdit', await server.members.fetch(data.userInfo.id));
					break;
				case 'TeamMemberBanned':
					server = this.servers.fetch(data.serverId);

					this.emit('memberBan', await server.bans.fetch(data.serverMemberBan.user.id));
					break;
				case 'TeamMemberUnbanned':
					server = this.servers.fetch(data.serverId);

					this.emit('memberUnban', await server.bans.fetch(data.serverMemberBan.user.id));
					break;
				case 'teamRolesUpdated':
					server = this.servers.fetch(data.serverId);

					members = new CacheCollection<string, ServerMember>();

					for (const { userId } of data.memberRoleIds) {
						members.set(userId, await server.members.fetch(userId));
					}

					this.emit('serverRolesEdit', members);
					break;
			}
		});

		this.ws.connect(this.token);
	}

	/** Log out of Guilded. */
	public logout() {
		this.ws.disconnect();
	}

	/**
	 * Debug the client.
	 * @param message The debug message.
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
	messageDelete: [message: Message];
	/** Emitted when a member joins a server. */
	memberAdd: [member: ServerMember];
	/** Emitted when a member leaves a server. */
	memberRemove: [user: User];
	/** Emitted when a member is banned from a server. */
	memberBan: [ban: ServerBan];
	/** Emitted when a member is unbanned from a server. */
	memberUnban: [ban: ServerBan];
	/** Emitted when a member is edited. */
	memberEdit: [member: ServerMember];
	/** Emitted when a server's roles are edited. */
	serverRolesEdit: [members: CacheCollection<string, ServerMember>];
}

/** The client options */
export interface ClientOptions {
	/** The client authorization token. */
	token?: string;
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
}
