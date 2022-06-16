import EventEmitter from 'events';
import { Base } from '../structures/Base';
import { CacheCollection } from '../structures/CacheCollection';
import { Client } from '../structures/Client';

/** The collector of a data model. */
export class Collector<Model extends Base> extends EventEmitter {
	/** The collected data. */
	public readonly collected: CacheCollection<Model['id'], Model>;
	/** The date the collector was created. */
	public readonly createdAt: Date;
	/** The date the collector was ended. */
	public endedAt?: Date;

	/**
	 * @param client The client the collector belongs to.
	 * @param options The options of the collector.
	 */
	public constructor(
		public readonly client: Client,
		public readonly options: CollectorOptions<Model> = {},
	) {
		super();
		this.createdAt = new Date();
		this.collected = new CacheCollection();
		if (options.time) setTimeout(this.end.bind(this), options.time);
	}

	/** The timestamp the collector was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** Whether the collector has ended. */
	public get isEnded() {
		return !!this.endedAt;
	}

	/** The timestamp the collector was ended. */
	public get endedTimestamp() {
		return this.endedAt?.getTime();
	}

	/** The time the collector has been running. */
	public get uptime() {
		return this.isEnded
			? this.endedAt!.getTime() - this.createdAt.getTime()
			: Date.now() - this.createdAt.getTime();
	}

	/** End the collector. */
	public end() {
		if (this.isEnded) return;
		this.endedAt = new Date();
		this.emit('end', this.collected);
	}

	/**
	 * Collect a item.
	 * @param item The item to collect.
	 */
	public async collect(item: Model) {
		if (this.isEnded || (this.options.filter ? !(await this.options.filter(item)) : false))
			return;
		this.collected.set(item.id, item);
		this.emit('collect', item);
		if (this.collected.size >= (this.options.max ?? Infinity)) this.end();
	}

	/**
	 * Dispose a collected item.
	 * @param itemId The ID of the item to dispose.
	 */
	public dispose(itemId: Model['id']) {
		if (this.options.dispose === false || this.isEnded || !this.collected.has(itemId)) return;
		this.collected.delete(itemId);
		this.emit('dispose', itemId);
	}
}

export interface Collector<Model extends Base> {
	/** @ignore */
	on<Event extends keyof CollectorEvents<Model>>(
		event: Event,
		listener: (...args: CollectorEvents<Model>[Event]) => any,
	): this;
	/** @ignore */
	once<Event extends keyof CollectorEvents<Model>>(
		event: Event,
		listener: (...args: CollectorEvents<Model>[Event]) => any,
	): this;
	/** @ignore */
	off<Event extends keyof CollectorEvents<Model>>(
		event: Event,
		listener: (...args: CollectorEvents<Model>[Event]) => any,
	): this;
	emit<Event extends keyof CollectorEvents<Model>>(
		event: Event,
		...args: CollectorEvents<Model>[Event]
	): boolean;
}

/** The collector events. */
export interface CollectorEvents<Model extends Base> {
	/** Emitted when data is collected. */
	collect: [item: Model];
	/** Emitted when a collected item is disposed. */
	dispose: [item: Model['id']];
	/** Emitted when the collector is finished collecting data. */
	end: [CacheCollection<Model['id'], Model>];
}

/** The options for the collector. */
export interface CollectorOptions<Model extends Base> {
	/** The filter to apply to the collector. */
	filter?: CollectorFilter<Model>;
	/** The time in milliseconds to wait before ending the collector. */
	time?: number;
	/** The max amount of items to collect. */
	max?: number;
	/** Whether to dispose data when it is deleted. */
	dispose?: boolean;
}

/** The filter to apply to the collector. */
export type CollectorFilter<Model extends Base> = (item: Model) => boolean | Promise<boolean>;
