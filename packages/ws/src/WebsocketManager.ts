import WebSocket from 'ws';
import EventEmitter from 'events';
import {
	APIBot,
	WebSocketEvent,
	WebSocketPayload,
	WebSocketOpCode,
	WebSocketReadyData,
} from 'guilded-api-typings';

const { version } = require('../package.json');

/**
 * The Websocket manager for the Guilded API
 * @example
 * const ws = new WebsocketManager({ version: 1, token: 'token' });
 *
 * ws.on('ready', (user) => console.log(`Connected as ${user.name}!`));
 *
 * ws.connect();
 */
export class WebsocketManager extends EventEmitter {
	/**
	 * The WebSocket
	 */
	socket: WebSocket | null = null;
	/**
	 * When the WebSocket became ready
	 */
	readyAt: Date | null = null;
	/**
	 * The ping of the WebSocket connection
	 */
	ping: number | null = null;
	/**
	 * When the websocket was pinged
	 */
	pingedAt: Date | null = null;
	/**
	 * The number of times the WebSocket reconnected
	 */
	reconnects = 0;
	/**
	 * The ID of the last WebSocket message
	 */
	lastMessageId: string | null = null;

	/**
	 * @param options The options for the WebSocket manager
	 */
	constructor(public readonly options: WebsocketOptions) {
		super();
	}

	/**
	 * The authorization token to use for the WebSocket
	 */
	get token() {
		return this.options.token ?? null;
	}
	/**
	 * The version of the WebSocket API to use
	 */
	get version() {
		return !this.options.proxyUrl ? this.options.version ?? null : null;
	}
	/**
	 * The URL to use for the WebSocket
	 */
	get url() {
		return this.options.proxyUrl ?? `wss://www.guilded.gg/websocket/v${this.version}`;
	}

	/**
	 * Whether the WebSocket is ready
	 */
	get isReady() {
		return !!this.readyAt;
	}

	/**
	 * The duration of how long the WebSocket has been connected
	 */
	get uptime() {
		return Date.now() - (this.readyAt?.getTime() ?? Date.now());
	}

	/**
	 * Connect to the WebSocket API
	 * @param token The authorization token to use for the WebSocket
	 * @returns The WebSocket manager
	 */
	connect(token: string = this.token!) {
		this.options.token = token;
		this.socket = new WebSocket(this.url, {
			headers: {
				Authorization: `Bearer ${this.token}`,
				'User-Agent': `@guildedts/ws@${version} Node.JS@${process.versions.node}`,
				'guilded-last-message-id': this.lastMessageId ?? '',
			},
		});
		this.socket.on('close', this.onSocketDisconnect.bind(this));
		this.socket.on('message', (raw) => {
			const data: WebSocketPayload = JSON.parse(raw.toString());
			this.emit('raw', data);
			this.onSocketMessage(data);
		});
		this.socket.on('ping', this.onSocketPing.bind(this));
		this.socket.on('pong', this.onSocketPong.bind(this));
		return this;
	}

	/**
	 * Disconnect from the Websocket API
	 * @returns The WebSocket manager
	 */
	disconnect() {
		if (!this.socket || !this.socket.OPEN) throw new Error('Websocket is not connected.');
		this.socket.terminate();
		return this;
	}

	/**
	 * Handle disconnect
	 */
	private onSocketDisconnect() {
		this.socket = null;
		this.readyAt = null;
		if (!this.options.reconnect || this.reconnects >= (this.options.maxReconnects ?? Infinity))
			return this.emit('disconnect', this);
		this.reconnects++;
		this.connect();
		this.emit('reconnect', this);
	}

	/**
	 * Handle recieved data
	 * @param data The data
	 */
	private onSocketMessage(data: WebSocketPayload) {
		if (data.s) this.lastMessageId = data.s;
		switch (data.op) {
			case WebSocketOpCode.Event:
				this.emit('event', data.t as any, data.d);
				break;
			case WebSocketOpCode.Ready:
				this.socket?.emit('ping');
				this.readyAt = new Date();
				this.emit('ready', (data.d as WebSocketReadyData).user);
				break;
			case WebSocketOpCode.Resume:
				this.lastMessageId = null;
				break;
		}
	}

	/**
	 * Handle ping
	 */
	private onSocketPing() {
		this.pingedAt = new Date();
		this.socket?.ping();
	}

	/**
	 * Handle pong
	 */
	private onSocketPong() {
		if (this.pingedAt) this.ping = Date.now() - this.pingedAt.getTime();
	}
}

export interface WebsocketManager {
	on<Event extends keyof WSManagerEvents>(
		event: Event,
		listener: (...args: WSManagerEvents[Event]) => any,
	): this;
	once<Event extends keyof WSManagerEvents>(
		event: Event,
		listener: (...args: WSManagerEvents[Event]) => any,
	): this;
	off<Event extends keyof WSManagerEvents>(
		event: Event,
		listener: (...args: WSManagerEvents[Event]) => any,
	): this;
	emit<Event extends keyof WSManagerEvents>(
		event: Event,
		...args: WSManagerEvents[Event]
	): boolean;
}

/**
 * The options for the Websocket manager
 */
export interface WebsocketOptions {
	/**
	 * The authorization token to use for the WebSocket
	 */
	token?: string;
	/**
	 * The version of the WebSocket API to use
	 *
	 * @default 1
	 */
	version?: number;
	/**
	 * The URL to use for the WebSocket
	 */
	proxyUrl?: string;
	/**
	 * The maximum number of reconnect attempts
	 *
	 * @default 5
	 */
	maxReconnects?: number;
	/**
	 * Whether to allow reconnects
	 *
	 * @default true
	 */
	reconnect?: boolean;
}

/** The websocket manager events. */
export interface WSManagerEvents {
	/**
	 * Emitted whenever the Websocket is ready
	 */
	ready: [user: APIBot];
	/**
	 * Emitted whenever the Websocket is reconnected
	 */
	reconnect: [ws: WebsocketManager];
	/**
	 * Emitted whenever the Websocket is disconnected
	 */
	disconnect: [ws: WebsocketManager];
	/**
	 * Emitted whenever a message is received
	 */
	raw: [data: WebSocketPayload];
	/**
	 * Emitted whenever an event is received
	 */
	event: [event: WebSocketEvent, data: unknown];
}
