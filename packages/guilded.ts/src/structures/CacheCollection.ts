import Collection from '@discordjs/collection';

/** A custom cache collection which has a max cache size. */
export class CacheCollection<K, V> extends Collection<K, V> {
	/**
	 * @param maxSize The maximum size of the cache.
	 * @param entries The initial entries of the cache.
	 */
	public constructor(public maxSize: number | null = null, entries: [K, V][] = []) {
		super(entries);
		if (maxSize && maxSize <= 1) throw new Error('Max cache size must be greater than 1.');
	}

	/**
	 * Set the max cache size.
	 * @param maxSize The maximum size of the cache.
	 * @returns The cache collection.
	 */
	public setMaxSize(maxSize: number) {
		this.maxSize = maxSize;
		return this;
	}

	/**
	 * Adds an entry to the cache.
	 * @param key The key of the entry.
	 * @param value The value of the entry.
	 * @returns The cache collection.
	 */
	public override set(key: K, value: V) {
		if (this.maxSize && this.size >= this.maxSize) this.delete(this.firstKey()!);
		return super.set(key, value);
	}
}
