import { APIChannelEditPayload, APIChannelPayload } from 'guilded-api-typings';
import { BaseManager, FetchOptions } from '../BaseManager';
import { Client } from '../../structures/Client';
import { Channel } from '../../structures/channel/Channel';
import { createChannel } from '../../util';

/** The manager of channels that belong to the client. */
export class ChannelManager extends BaseManager<string, Channel> {
	/** @param client The client the channels belong to. */
	public constructor(client: Client) {
		super(client, client.options.maxChannelCache);
	}

	/**
	 * Fetch a channel from Guilded, or cache.
	 * @param channel The channel to fetch.
	 * @param options The options to fetch the channel with.
	 * @returns The fetched channel.
	 */
	public async fetch(channel: string | Channel, options?: FetchOptions) {
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
	 */
	public async create(payload: APIChannelPayload) {
		const raw = await this.client.api.channels.create(payload);
		return createChannel(this.client, raw);
	}

	/**
	 * Edit a channel on Guilded.
	 * @param channel The channel to edit.
	 * @param payload The payload of the channel.
	 * @returns The edited channel.
	 */
	public async edit(channel: string | Channel, payload: APIChannelEditPayload) {
		channel = channel instanceof Channel ? channel.id : channel;
		const raw = await this.client.api.channels.edit(channel, payload);
		return createChannel(this.client, raw);
	}

	/**
	 * Delete a channel from Guilded.
	 * @param channel The channel to delete.
	 */
	public delete(channel: string | Channel) {
		channel = channel instanceof Channel ? channel.id : channel;
		return this.client.api.channels.delete(channel);
	}
}
