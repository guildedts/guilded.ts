import { RESTPatchChannelJSONBody, RESTPostChannelJSONBody } from 'guilded-api-typings';
import { BaseManager, FetchOptions } from '../BaseManager';
import { Client } from '../../structures/Client';
import { Channel } from '../../structures/channel/Channel';
import { createChannel } from '../../util';

/**
 * The manager of channels that belong to the client.
 * @example new ChannelManager(client);
 */
export class ChannelManager extends BaseManager<string, Channel> {
	/** @param client The client the channels belong to. */
	constructor(client: Client) {
		super(client, client.options.maxChannelCache);
	}

	/**
	 * Fetch a channel from Guilded, or cache.
	 * @param channel The channel to fetch.
	 * @param options The options to fetch the channel with.
	 * @returns The fetched channel.
	 * @example channels.fetch(channel);
	 */
	async fetch(channel: string | Channel, options?: FetchOptions) {
		channel = channel instanceof Channel ? channel.id : channel;
		const cached = this.cache.get(channel);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.channels.fetch(channel);
		return createChannel(this.client, raw, options?.cache);
	}

	/**
	 * Create a channel on Guilded.
	 * @param payload The payload of the channel.
	 * @returns The created channel.
	 * @example channels.create({ name: 'Chat', type: 'chat' });
	 */
	async create(payload: RESTPostChannelJSONBody) {
		const raw = await this.client.api.channels.create(payload);
		return createChannel(this.client, raw);
	}

	/**
	 * Edit a channel on Guilded.
	 * @param channel The channel to edit.
	 * @param payload The payload of the channel.
	 * @returns The edited channel.
	 * @example channels.edit(channel, { name: 'Chat' });
	 */
	async edit(channel: string | Channel, payload: RESTPatchChannelJSONBody) {
		channel = channel instanceof Channel ? channel.id : channel;
		const raw = await this.client.api.channels.edit(channel, payload);
		return createChannel(this.client, raw);
	}

	/**
	 * Delete a channel from Guilded.
	 * @param channel The channel to delete.
	 * @example channels.delete(channel);
	 */
	delete(channel: string | Channel) {
		channel = channel instanceof Channel ? channel.id : channel;
		return this.client.api.channels.delete(channel);
	}
}
