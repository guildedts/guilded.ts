import Collection from '@discordjs/collection';
import EventEmitter from 'events';
import { Base } from '../structures/Base';
import { Client } from '../structures/Client';

/**
 * The collector of a data model.
 * @example new Collector(client);
 */
export class Collector<Model extends Base<any>> extends EventEmitter {
	/** The collected data. */
	readonly collected: Collection<Model['id'], Model>;
	/** The date the collector was created. */
	readonly createdAt: Date;
	/** The date the collector was ended. */
	endedAt?: Date;

	/**
	 * @param client The client the collector belongs to.
	 * @param options The options of the collector.
	 */
	constructor(
		public readonly client: Client,
		public readonly options: CollectorOptions<Model> = {},
	) {
		super();
		this.createdAt = new Date();
		this.collected = new Collection();
		if (options.time) setTimeout(this.end.bind(this), options.time);
	}

	/** The timestamp the collector was created. */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** Whether the collector has ended. */
	get isEnded() {
		return !!this.endedAt;
	}

	/** The timestamp the collector was ended. */
	get endedTimestamp() {
		return this.endedAt?.getTime();
	}

	/** The time the collector has been running. */
	get uptime() {
		return this.isEnded
			? this.endedAt!.getTime() - this.createdAt.getTime()
			: Date.now() - this.createdAt.getTime();
	}

	/**
	 * End the collector.
	 * @example collector.end();
	 */
	end() {
		if (this.isEnded) return;
		this.endedAt = new Date();
		this.emit('end', this.collected);
	}

	/**
	 * Collect a item.
	 * @param item The item to collect.
	 * @returns The collected item.
	 * @example collector.collect(item);
	 */
	async collect(item: Model) {
		const filter = this.options.filter ? await this.options.filter(item) : true;
		if (this.isEnded || !filter) return;
		this.collected.set(item.id, item);
		this.emit('collect', item);
		if (this.collected.size >= (this.options.max ?? Infinity)) this.end();
		return item;
	}

	/**
	 * Dispose a collected item.
	 * @param itemId The ID of the item to dispose.
	 * @returns The disposed item.
	 * @example collector.dispose('abc');
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
export interface CollectorEvents<Model extends Base<any>> {
	/** Emitted when data is collected. */
	collect: [item: Model];
	/** Emitted when a collected item is disposed. */
	dispose: [item: Model];
	/** Emitted when the collector is finished collecting data. */
	end: [collected: Collection<Model['id'], Model>];
}

/** The options for the collector. */
export interface CollectorOptions<Model extends Base<any>> {
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
