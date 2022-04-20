import EventEmitter from 'events';
import { RestManager } from '@guildedts/rest';
import { WebsocketManager } from '@guildedts/ws';
import { Channel, ChannelManager, Message, ServerManager, User } from '..';

/** The main hub for interacting with the Guilded API. */
export class Client extends EventEmitter {
	/** The REST manager for the client. */
	public readonly rest = new RestManager(1);
	/** The websocket manager for the client. */
	public readonly ws = new WebsocketManager(1);

	/** A manager of channels that belong to the client. */
	public readonly channels: ChannelManager;
	/** A manager of servers that belong to the client. */
	public readonly servers: ServerManager;

	/** Whether the client is ready to use. */
	public ready: boolean = false;
	/** When the client was ready to use. */
	public readyAt: Date | null = null;
	/** The client user. */
	public user: User | null = null;
	/** The client authorization token. */
	public token: string | null;

	/** @param options The client options. */
	public constructor(public readonly options: ClientOptions = {}) {
		super();
		this.token = options.token ?? null;
		this.channels = new ChannelManager(this, {
			cachingEnabled: options.cacheChannels,
			maxCache: options.maxChannelCache,
		});
		this.servers = new ServerManager(this, {
			cachingEnabled: options.cacheServers,
			maxCache: options.maxServerCache,
		});
	}

	/**
	 * Log in to the Guilded API.
	 * @param token The client token.
	 */
	public login(token: string) {
		this.token = token ?? this.token;
		this.rest.token = this.token;
		this.ws.token = this.token;

		this.ws.on('connect', (data) => {
			this.ready = true;
			this.readyAt = this.ws.lastConnected;
			this.user = new User(data.user, this);
			this.emit('ready', this);
		});

		this.ws.on('disconnect', () => {
			this.ready = false;
			this.readyAt = null;
			this.user = null;
			this.emit('disconnect', this);
		});

		this.ws.on('data', async (type, data) => {
			let channel: Channel;
			let message: Message;
			switch (type) {
				case 'ChatMessageCreated':
					channel = this.channels.fetch(data.message.channelId);
					message = await channel.messages.fetch(data.message.id);
					this.emit('messageCreate', message);
					break;
				case 'ChatMessageUpdated':
					channel = this.channels.fetch(data.message.channelId);
					message = await channel.messages.fetch(data.message.id);
					this.emit('messageUpdate', message);
					break;
				case 'ChatMessageDeleted':
					channel = this.channels.fetch(data.message.channelId);
					// message = new Message(data.message, channel);
					// this.emit('messageDelete', message);
					break;
			}
		});

		this.ws.connect();
	}

	/** Log out of Guilded. */
	public logout() {
		this.ws.disconnect();
	}
}

export interface Client {
	on<Event extends keyof ClientEvents>(
		event: Event,
		listener: (...args: ClientEvents[Event]) => any
	): this;
	once<Event extends keyof ClientEvents>(
		event: Event,
		listener: (...args: ClientEvents[Event]) => any
	): this;
	off<Event extends keyof ClientEvents>(
		event: Event,
		listener: (...args: ClientEvents[Event]) => any
	): this;
	emit<Event extends keyof ClientEvents>(event: Event, ...args: ClientEvents[Event]): boolean;
}

/**
 * The client events.
 */
export interface ClientEvents {
	ready: [client: Client];
	disconnect: [client: Client];
	messageCreate: [message: Message];
	messageUpdate: [message: Message];
	messageDelete: [message: Message];
}

/** The client options */
export interface ClientOptions {
	token?: string;
	cacheChannels?: boolean;
	maxChannelCache?: number;
	cacheMessages?: boolean;
	maxMessageCache?: number;
	cacheServers?: boolean;
	maxServerCache?: number;
	cacheUsers?: boolean;
	maxUserCache?: number;
	cacheServerMembers?: boolean;
	maxServerMemberCache?: number;
	cacheServerBans?: boolean;
	maxServerBanCache?: number;
}
