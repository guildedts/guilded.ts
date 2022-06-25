import { Client } from '../structures/Client';
import { CacheCollection } from '../structures/CacheCollection';

/** The manager of a Guilded data model. */
export class BaseManager<K = void, V = void> {
	/** This cache of the manager. */
	public readonly cache: CacheCollection<K, V>;

	/**
	 * @param client The client the manager belongs to.
	 * @param maxCache The maximum cache size of the manager.
	 */
	constructor(public readonly client: Client, maxCache = Infinity) {
		this.cache = new CacheCollection(maxCache);
	}

	/**
	 * Set the maximum cache size of the manager.
	 * @param maxSize The maximum size of the cache.
	 * @returns The manager.
	 */
	public setMaxCache(maxSize: number) {
		this.cache.setMaxSize(maxSize);
		return this;
	}
}

/** The options for fetching data from Guilded. */
export interface FetchOptions extends FetchManyOptions {
	/** The whether to force fetch the data. */
	force?: boolean;
}

/** The options for fetching multiple data from Guilded. */
export interface FetchManyOptions {
	/** The whether to cache the fetched data. */
	cache?: boolean;
}
