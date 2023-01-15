import { RESTPatchChannelJSONBody, RESTPostChannelJSONBody } from 'guilded-api-typings';
import { BaseManager, FetchOptions } from '../BaseManager';
import { Client } from '../../structures/Client';
import { Channel } from '../../structures/channel/Channel';
import { createChannel } from '../../util';

/**
 * The manager for channels
 */
export class ChannelManager extends BaseManager<string, Channel> {
	/**
	 * @param client The client
	 */
	constructor(client: Client) {
		super(client, client.options.maxChannelCache);
	}

	/**
	 * Fetch a channel
	 * @param channel The channel.
	 * @param options The options to fetch the channel with
	 * @returns The fetched channel;
	 */
	async fetch(channel: string | Channel, options?: FetchOptions) {
		channel = channel instanceof Channel ? channel.id : channel;
		const cached = this.cache.get(channel);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.channels.fetch(channel);
		return createChannel(this.client, raw, options?.cache);
	}

	/**
	 * Create a channel
	 * @param options The options to create the channel with
	 * @returns The created channel
	 */
	async create(options: RESTPostChannelJSONBody) {
		const raw = await this.client.api.channels.create(options);
		return createChannel(this.client, raw);
	}

	/**
	 * Update a channel
	 * @param channel The channel
	 * @param options The options to update the channel with
	 * @returns The updated channel
	 */
	async update(channel: string | Channel, options: RESTPatchChannelJSONBody) {
		channel = channel instanceof Channel ? channel.id : channel;
		const raw = await this.client.api.channels.edit(channel, options);
		return createChannel(this.client, raw);
	}

	/**
	 * Delete a channel
	 * @param channel The channel
	 */
	delete(channel: string | Channel) {
		channel = channel instanceof Channel ? channel.id : channel;
		return this.client.api.channels.delete(channel);
	}
}
