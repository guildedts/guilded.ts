import { Collection } from '@discordjs/collection';
import EventEmitter from 'events';
import { Base } from '../structures/Base';
import { Client } from '../structures/Client';

/**
 * The collector of a data model
 */
export class Collector<K extends string | number, V extends Base> extends EventEmitter {
	/**
	 * The collected data
	 */
	readonly collected = new Collection<K, V>();
	/**
	 * When the collector was created
	 */
	readonly createdAt = new Date();
	/**
	 * When the collector ended
	 */
	endedAt: Date | null = null;
	/**
	 * The idle timeout for the collector
	 */
	private idleTimeout: NodeJS.Timeout | null = null;

	/**
	 * @param client The client
	 * @param options The options for the collector
	 */
	constructor(public readonly client: Client, public readonly options: CollectorOptions<V> = {}) {
		super();
		if (options.time) setTimeout(this.end.bind(this), options.time);
		if (options.idle) this.idleTimeout = setTimeout(this.end.bind(this), options.idle);
	}

	/**
	 * Whether the collector has ended
	 */
	get isEnded() {
		return !!this.endedAt;
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
	 * @param key The key of the entry
	 * @param value The value of the entry
	 * @returns The collected item
	 */
	async collect(key: K, value: V) {
		const filter = this.options.filter ? await this.options.filter(value) : true;
		if (this.isEnded || !filter) return;
		this.collected.set(key, value);
		this.emit('collect', value);
		if (this.idleTimeout) {
			clearTimeout(this.idleTimeout);
			this.idleTimeout = setTimeout(this.end.bind(this), this.options.idle);
		}
		if (this.collected.size >= (this.options.max ?? Infinity)) this.end();
		return value;
	}

	/**
	 * Dispose a collected item
	 * @param key The key of the entry
	 * @returns The disposed item, if collected
	 */
	dispose(key: K) {
		const item = this.collected.get(key);
		if (this.options.dispose === false || this.isEnded || !item) return;
		this.collected.delete(key);
		this.emit('dispose', item);
		return item;
	}
}

export interface Collector<K extends string | number, V extends Base> {
	on<Event extends keyof CollectorEvents<K, V>>(
		event: Event,
		listener: (...args: CollectorEvents<K, V>[Event]) => any,
	): this;
	once<Event extends keyof CollectorEvents<K, V>>(
		event: Event,
		listener: (...args: CollectorEvents<K, V>[Event]) => any,
	): this;
	off<Event extends keyof CollectorEvents<K, V>>(
		event: Event,
		listener: (...args: CollectorEvents<K, V>[Event]) => any,
	): this;
	emit<Event extends keyof CollectorEvents<K, V>>(
		event: Event,
		...args: CollectorEvents<K, V>[Event]
	): boolean;
}

/**
 * The collector events
 */
export interface CollectorEvents<K extends string | number, V extends Base> {
	/**
	 * Emitted whenever data is collected
	 */
	collect: [item: V];
	/**
	 * Emitted whenever a collected item is disposed
	 */
	dispose: [item: V];
	/**
	 * Emitted whenever the collector is finished collecting data
	 */
	end: [collected: Collection<K, V>];
}

/**
 * The options for the collector
 */
export interface CollectorOptions<V extends Base> {
	/**
	 * The filter to apply to the collector
	 *
	 * @default () => true
	 */
	filter?: (item: V) => boolean | Promise<boolean>;
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
