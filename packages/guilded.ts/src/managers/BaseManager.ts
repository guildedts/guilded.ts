import { Client } from '../structures/Client';
import { CacheCollection } from '../structures/CacheCollection';

/**
 * The manager for a Guilded data model
 */
export class BaseManager<K = void, V = void> {
	/**
	 * This cache of the manager
	 */
	readonly cache: CacheCollection<K, V>;

	/**
	 * @param client The client
	 * @param maxCache The maximum cache size
	 */
	constructor(public readonly client: Client, maxCache = Infinity, entries?: [K, V][]) {
		this.cache = new CacheCollection(maxCache, entries);
	}
}

/**
 * The options for fetching data from Guilded
 */
export interface FetchOptions extends FetchManyOptions {
	/**
	 * Whether to skip cache checking
	 *
	 * @default false
	 */
	force?: boolean;
}

/**
 * The options for fetching multiple data from Guilded
 */
export interface FetchManyOptions {
	/**
	 * Whether to cache the fetched data
	 */
	cache?: boolean;
}
