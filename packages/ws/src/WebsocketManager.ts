import Websocket from 'ws';
import EventEmitter from 'events';
import { WSEvents } from 'guilded-api-typings';

/** The Websocket manager for the Guilded API. */
export class WebsocketManager extends EventEmitter {
	/** The url for the websocket. */
	public get url() {
		return `wss://api.guilded.gg/v${this.version}/websocket`;
	}
	/** The authoization token for the websocket. */
	public token: string | null = null;
	/** The websocket. */
	public socket: Websocket | null = null;
	/** When the websocket last connected. */
	public lastConnected: Date | null = null;

	/** @param version The API version for the websocket. */
	public constructor(public readonly version: number) {
		super();
	}

	/** Connect to the websocket. */
	public connect() {
		this.socket = new Websocket(this.url, {
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		});

		this.socket.on('close', () => this.emit('disconnect'));

		this.socket.on('message', (data) => {
			const { op, t, d }: WSData = JSON.parse(data.toString());
			switch (op) {
				case 0:
					this.emit('data', t, d);
					break;
				case 1:
					this.lastConnected = new Date();
					this.emit('connect', d);
					break;
			}
		});
	}

	/** Disconnect from the websocket. */
	public disconnect() {
		if (!this.socket || !this.socket.OPEN) throw new Error('Websocket is not connected.');
		this.socket.close();
		this.socket = null;
	}
}

export interface WebsocketManager {
	on<Event extends keyof WSManagerEvents>(
		event: Event,
		listener: (...args: WSManagerEvents[Event]) => any
	): this;
	once<Event extends keyof WSManagerEvents>(
		event: Event,
		listener: (...args: WSManagerEvents[Event]) => any
	): this;
	off<Event extends keyof WSManagerEvents>(
		event: Event,
		listener: (...args: WSManagerEvents[Event]) => any
	): this;
	emit<Event extends keyof WSManagerEvents>(
		event: Event,
		...args: WSManagerEvents[Event]
	): boolean;
}

/** The websocket manager events. */
export interface WSManagerEvents {
	connect: [data: any];
	disconnect: [];
	data: {
		[K in keyof WSEvents]: [type: K, data: WSEvents[K]];
	}[keyof WSEvents];
}

/** The websocket data. */
export interface WSData {
	op: number;
	t: any;
	d: any;
}
