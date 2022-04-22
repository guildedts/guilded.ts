import Websocket from 'ws';
import EventEmitter from 'events';
import { APIUser, WSEvents } from 'guilded-api-typings';

/** The Websocket manager for the Guilded API. */
export class WebsocketManager extends EventEmitter {
	/** The authoization token for the websocket. */
	public token?: string;
	/** The websocket. */
	public socket?: Websocket;
	/** Whether the websocket is connected. */
	public connected = false;
	/** The time of when the websocket connected. */
	public connectedAt?: Date;

	/** @param version The API version for the websocket. */
	public constructor(public readonly version: number) {
		super();
	}

	/** The timestamp of when the websocket connected. */
	public get connectedTimestamp() {
		return this.connectedAt?.getTime();
	}

	/** How long the websocket has been connected. (in MS) */
	public get uptime() {
		return this.connected ? Date.now() - this.connectedTimestamp! : undefined;
	}

	/** The URL for the websocket. */
	public get url(): `wss://api.guilded.gg/v${number}/websocket` {
		return `wss://api.guilded.gg/v${this.version}/websocket`;
	}

	/**
	 * Connect to the websocket.
	 * @param token The authorization token.
	 * @returns The websocket manager.
	 */
	public connect(token: string) {
		this.token = token;

		this.socket = new Websocket(this.url, {
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		});

		this.socket.on('close', () => {
			this.token = undefined;
			this.socket = undefined;
			this.connected = false;
			this.connectedAt = undefined;
			this.emit('disconnect');
		});

		this.socket.on('message', (data) => {
			const { op, t, d }: WSData = JSON.parse(data.toString());

			switch (op) {
				case 0:
					this.emit('data', t, d);
					break;
				case 1:
					this.connected = true;
					this.connectedAt = new Date();
					this.emit('connect', d.user);
					break;
			}
		});

		return this;
	}

	/**
	 * Disconnect from the websocket.
	 * @returns The websocket manager.
	 */
	public disconnect() {
		if (!this.socket || !this.socket.OPEN) throw new Error('Websocket is not connected.');

		this.socket.close();

		return this;
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

/** The websocket manager events. */
export interface WSManagerEvents {
	/** Emitted when the websocket is connected. */
	connect: [user: APIUser];
	/** Emitted when the websocket is disconnected. */
	disconnect: [];
	/** Emitted when data is received from the websocket. */
	data: {
		[K in keyof WSEvents]: [type: K, data: WSEvents[K]];
	}[keyof WSEvents];
}

/** The websocket data. */
export interface WSData {
	/** The operation code. */
	op: number;
	/** The event type. */
	t: any;
	/** The event data. */
	d: any;
}
