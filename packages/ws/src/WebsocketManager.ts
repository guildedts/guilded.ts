import Websocket from 'ws';
import EventEmitter from 'events';
import { APIUser, WSEvents } from 'guilded-api-typings';

/** The Websocket manager for the Guilded API. */
export class WebsocketManager extends EventEmitter {
	/** The auth token for the websocket. */
	public token?: string;
	/** The version of the Websocket API. */
	public readonly version: number;
	/** The websocket. */
	public socket?: Websocket;
	/** The date the websocket connected. */
	public connectedAt?: Date;
	/** The ping of the websocket connection. */
	public ping?: number;
	/** The date the websocket was pinged. */
	public pingedAt?: Date;

	/** @param options The options for the Websocket manager. */
	public constructor(public readonly options: WebsocketOptions) {
		super();
		this.token = options.token;
		this.version = options.version;
	}

	/** Whether the websocket is connected. */
	public get isConnected() {
		return !!this.connectedAt ?? false;
	}

	/** The timestamp of when the websocket connected. */
	public get connectedTimestamp() {
		return this.connectedAt?.getTime();
	}

	/** The timestamp the websocket was pinged. */
	public get pingedTimestamp() {
		return this.pingedAt?.getTime();
	}

	/** How long the websocket has been connected. */
	public get uptime() {
		return this.isConnected ? Date.now() - this.connectedTimestamp! : undefined;
	}

	/** The URL of the Websocket. */
	public get url(): `wss://api.guilded.gg/v${number}/websocket` {
		return `wss://api.guilded.gg/v${this.version}/websocket`;
	}

	/**
	 * Connect to the Websocket API.
	 * @param token The auth token.
	 * @returns The Websocket manager.
	 */
	public connect(token: string = this.token!) {
		this.token = token;
		this.socket = new Websocket(this.url, {
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		});
		this.socket.on('close', this.onSocketClose.bind(this));
		this.socket.on('message', (raw) => {
			const { op, t, d } = JSON.parse(raw.toString());
			this.onSocketData(op, t, d);
		});
		this.socket.on('ping', this.onSocketPing.bind(this));
		this.socket.on('pong', this.onSocketPong.bind(this));
		return this;
	}

	/**
	 * Disconnect from the Websocket API.
	 * @returns The websocket manager.
	 */
	public disconnect() {
		if (!this.socket || !this.socket.OPEN) throw new Error('Websocket is not connected.');
		this.socket.terminate();
		return this;
	}

	/** @ignore */
	private onSocketClose() {
		this.token = undefined;
		this.socket = undefined;
		this.connectedAt = undefined;
		this.emit('disconnect');
	}

	/** @ignore */
	private onSocketData(op: number, event: any, data: any) {
		switch (op) {
			case 0:
				this.emit('data', event, data);
				break;
			case 1:
				this.socket!.emit('ping');
				this.connectedAt = new Date();
				this.emit('connect', data.user as APIUser);
				break;
		}
	}

	/** @ignore */
	private onSocketPing() {
		this.pingedAt = new Date();
		this.socket!.ping();
	}

	/** @ignore */
	private onSocketPong() {
		this.ping = Date.now() - this.pingedTimestamp!;
	}
}

export interface WebsocketManager {
	/** @ignore */
	on<Event extends keyof WSManagerEvents>(
		event: Event,
		listener: (...args: WSManagerEvents[Event]) => any,
	): this;
	/** @ignore */
	once<Event extends keyof WSManagerEvents>(
		event: Event,
		listener: (...args: WSManagerEvents[Event]) => any,
	): this;
	/** @ignore */
	off<Event extends keyof WSManagerEvents>(
		event: Event,
		listener: (...args: WSManagerEvents[Event]) => any,
	): this;
	/** @ignore */
	emit<Event extends keyof WSManagerEvents>(
		event: Event,
		...args: WSManagerEvents[Event]
	): boolean;
}

/** The options for the Websocket manager. */
export interface WebsocketOptions {
	/** The auth token for the Websocket API. */
	token?: string;
	/** The version of the Websocket API. */
	version: number;
}

/** The websocket manager events. */
export interface WSManagerEvents {
	/** Emitted when the Websocket is connected. */
	connect: [user: APIUser];
	/** Emitted when the Websocket is disconnected. */
	disconnect: [];
	/** Emitted when data is received from the Websocket API. */
	data: {
		[Event in keyof WSEvents]: [event: Event, data: WSEvents[Event]];
	}[keyof WSEvents];
}
