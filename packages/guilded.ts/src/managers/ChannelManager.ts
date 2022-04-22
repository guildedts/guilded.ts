import Client, { BaseManager, Channel } from '..';

/** A manager of channels that belong to the client. */
export class ChannelManager extends BaseManager<string, Channel> {
	/** @param client The client that owns the channels. */
	public constructor(client: Client) {
		super(client, {
			cachingEnabled: client.options.cacheChannels,
			maxCache: client.options.maxChannelCache,
		});
	}

	/**
	 * Fetch a channel from Guilded, or cache if it's already cached.
	 * @param id The ID of the channel.
	 * @param cache Whether to cache the channel.
	 * @returns The channel.
	 */
	public fetch(id: string, cache: boolean = this.cachingEnabled) {
		let channel = this.cache.get(id);
		if (channel) return channel;

		channel = new Channel(this.client, { id });

		if (cache) this.cache.set(id, channel);

		return channel;
	}
}
