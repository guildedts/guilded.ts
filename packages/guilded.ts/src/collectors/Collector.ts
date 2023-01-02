import { Collection } from '@discordjs/collection';
import EventEmitter from 'events';
import { Base } from '../structures/Base';
import { Client } from '../structures/Client';

/**
 * The collector of a data model
 */
export class Collector<Model extends Base<any>> extends EventEmitter {
	/**
	 * The collected data
	 */
	readonly collected: Collection<Model['id'], Model>;
	/**
	 * When the collector was created
	 */
	readonly createdAt: Date;
	/**
	 * When the collector ended
	 */
	endedAt?: Date;
	/**
	 * The idle timeout for the collector
	 */
	private idleTimeout?: NodeJS.Timeout;

	/**
	 * @param client The client
	 * @param options The options for the collector
	 */
	constructor(
		public readonly client: Client,
		public readonly options: CollectorOptions<Model> = {},
	) {
		super();
		this.createdAt = new Date();
		this.collected = new Collection();
		if (options.time) setTimeout(this.end.bind(this), options.time);
		if (options.idle) this.idleTimeout = setTimeout(this.end.bind(this), options.idle);
	}

	/**
	 * The timestamp of when the collector was created
	 */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/**
	 * Whether the collector has ended
	 */
	get isEnded() {
		return !!this.endedAt;
	}

	/**
	 * The timestamp of when the collector was ended
	 */
	get endedTimestamp() {
		return this.endedAt?.getTime();
	}

	/**
	 * The duration of how long the collector has been running
	 */
	get uptime() {
		return this.isEnded
			? this.endedAt!.getTime() - this.createdAt.getTime()
			: Date.now() - this.createdAt.getTime();
	}

	/**
	 * End the collector
	 */
	end() {
		if (this.isEnded) return;
		this.endedAt = new Date();
		this.emit('end', this.collected);
	}

	/**
	 * Collect an item
	 * @param item The item
	 * @returns The collected item
	 */
	async collect(item: Model) {
		const filter = this.options.filter ? await this.options.filter(item) : true;
		if (this.isEnded || !filter) return;
		this.collected.set(item.id, item);
		this.emit('collect', item);
		if (this.idleTimeout) {
			clearTimeout(this.idleTimeout);
			this.idleTimeout = setTimeout(this.end.bind(this), this.options.idle);
		}
		if (this.collected.size >= (this.options.max ?? Infinity)) this.end();
		return item;
	}

	/**
	 * Dispose a collected item
	 * @param itemId The ID of the item
	 * @returns The disposed item, if cached
	 */
	dispose(itemId: Model['id']) {
		const item = this.collected.get(itemId);
		if (this.options.dispose === false || this.isEnded || !item) return;
		this.collected.delete(itemId);
		this.emit('dispose', item);
		return item;
	}
}

export interface Collector<Model extends Base<any>> {
	on<Event extends keyof CollectorEvents<Model>>(
		event: Event,
		listener: (...args: CollectorEvents<Model>[Event]) => any,
	): this;
	once<Event extends keyof CollectorEvents<Model>>(
		event: Event,
		listener: (...args: CollectorEvents<Model>[Event]) => any,
	): this;
	off<Event extends keyof CollectorEvents<Model>>(
		event: Event,
		listener: (...args: CollectorEvents<Model>[Event]) => any,
	): this;
	emit<Event extends keyof CollectorEvents<Model>>(
		event: Event,
		...args: CollectorEvents<Model>[Event]
	): boolean;
}

/**
 * The collector events
 */
export interface CollectorEvents<Model extends Base<any>> {
	/**
	 * Emitted whenever data is collected
	 */
	collect: [item: Model];
	/**
	 * Emitted whenever a collected item is disposed
	 */
	dispose: [item: Model];
	/**
	 * Emitted whenever the collector is finished collecting data
	 */
	end: [collected: Collection<Model['id'], Model>];
}

/**
 * The options for the collector
 */
export interface CollectorOptions<Model extends Base<any>> {
	/**
	 * The filter to apply to the collector
	 *
	 * @default () => true
	 */
	filter?: (item: Model) => boolean | Promise<boolean>;
	/**
	 * The time in milliseconds to wait before ending the collector
	 *
	 * @default Infinity
	 */
	time?: number;
	/**
	 * The time in milliseconds to wait before ending the collector due to it being idle
	 *
	 * @default Infinity
	 */
	idle?: number;
	/**
	 * The max amount of items to collect
	 *
	 * @default Infinity
	 */
	max?: number;
	/**
	 * Whether to dispose data when it is deleted
	 *
	 * @default true
	 */
	dispose?: boolean;
}
