import { Collection } from '@discordjs/collection';

/**
 * A custom cache collection which has a max cache size
 */
export class CacheCollection<K, V> extends Collection<K, V> {
	/**
	 * @param maxSize The max size of the cache
	 * @param entries The initial entries of the cache
	 */
	constructor(public maxSize?: number, entries: Iterable<[K, V]> | null = []) {
		super(entries);
		if (maxSize && maxSize <= 1) throw new Error('Max cache size must be greater than 1.');
	}

	/**
	 * Set the max size of the cache
	 * @param maxSize The max size of the cache
	 * @returns The cache collection
	 */
	setMaxSize(maxSize?: number) {
		this.maxSize = maxSize;
		return this;
	}

	/**
	 * Set an entry in the cache
	 * @param key The key of the entry
	 * @param value The value of the entry
	 * @returns The cache collection
	 */
	set(key: K, value: V) {
		if (this.maxSize && this.size >= this.maxSize) this.delete(this.firstKey()!);
		return super.set(key, value);
	}
}
