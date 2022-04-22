import Client, { CacheCollection } from '..';

/** Manager for managing API methods of a data model. */
export class BaseManager<K = string, V = any> {
	/** This manager's cache. */
	public readonly cache: CacheCollection<K, V>;
	/** Whether caching is enabled for this manager. */
	public cachingEnabled = true;

	/**
	 * @param client The client that instantiated this manager.
	 * @param options The options for this manager.
	 */
	constructor(public readonly client: Client, public readonly options: ManagerOptions = {}) {
		this.cache = new CacheCollection(options.maxCache);
		this.cachingEnabled = options.cachingEnabled ?? true;
	}

	/**
	 * Toggles the cache on or off.
	 * @param enabled Whether the cache should be enabled.
	 * @returns The manager.
	 */
	public toggleCache(enabled: boolean) {
		this.cachingEnabled = enabled;
		return this;
	}

	/**
	 * Set the max cache size.
	 * @param maxSize The maximum size of the cache.
	 * @returns The manager.
	 */
	public setMaxCache(maxSize: number) {
		this.cache.setMaxSize(maxSize);
		return this;
	}
}

/** The manager options. */
export interface ManagerOptions {
	cachingEnabled?: boolean;
	maxCache?: number;
}
