import { BaseManager, Channel } from '..';

/** A manager of channels that belong to the client. */
export class ChannelManager extends BaseManager<string, Channel> {
	/**
	 * Fetch a channel by its ID.
	 * @param id The ID of the channel.
	 * @returns The channel.
	 */
	public fetch(id: string) {
		let channel = this.cache.get(id);
		if (channel) return channel;
		channel = new Channel({ id }, this.client);
		if (this.cachingEnabled) this.cache.set(id, channel);
		return channel;
	}
}
