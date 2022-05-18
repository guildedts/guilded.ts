import { Client } from '../structures/Client';
import { CacheCollection } from '../structures/CacheCollection';

/** Manager for managing API methods of a data model. */
export class BaseManager<K = string, V = any> {
	/** This cache of the manager. */
	public readonly cache: CacheCollection<K, V>;

	/**
	 * @param client The client that instantiated the manager.
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
