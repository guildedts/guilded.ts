import { CacheCollection, Client } from '..';
/** Manager for managing API methods of a data model. */
export declare class BaseManager<K = string, V = any> {
	readonly client: Client;
	readonly options: ManagerOptions;
	/** This manager's cache. */
	readonly cache: CacheCollection<K, V>;
	/** Whether caching is enabled for this manager. */
	cachingEnabled: boolean;
	/**
	 * @param client The client that instantiated this manager.
	 * @param options The options for this manager.
	 */
	constructor(client: Client, options?: ManagerOptions);
	/**
	 * Toggles the cache on or off.
	 * @param enabled Whether the cache should be enabled.
	 * @returns The manager.
	 */
	toggleCache(enabled: boolean): this;
	/**
	 * Set the max cache size.
	 * @param maxSize The maximum size of the cache.
	 * @returns The manager.
	 */
	setMaxCache(maxSize: number): this;
}
/** The manager options. */
export interface ManagerOptions {
	cachingEnabled?: boolean;
	maxCache?: number;
}
//# sourceMappingURL=BaseManager.d.ts.map
