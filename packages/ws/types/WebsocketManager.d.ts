/// <reference types="node" />
import Websocket from 'ws';
import EventEmitter from 'events';
import { WSEvents } from 'guilded-api-typings';
/** The Websocket manager for the Guilded API. */
export declare class WebsocketManager extends EventEmitter {
	readonly version: number;
	/** The url for the websocket. */
	get url(): string;
	/** The authoization token for the websocket. */
	token: string | null;
	/** The websocket. */
	socket: Websocket | null;
	/** When the websocket last connected. */
	lastConnected: Date | null;
	/** @param version The API version for the websocket. */
	constructor(version: number);
	/** Connect to the websocket. */
	connect(): void;
	/** Disconnect from the websocket. */
	disconnect(): void;
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
//# sourceMappingURL=WebsocketManager.d.ts.map
