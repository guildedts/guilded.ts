import { APIChannel, APIChannelEditPayload, APIChannelPayload, Routes } from 'guilded-api-typings';
import { BaseManager } from '../BaseManager';
import { Client } from '../../structures/Client';
import { Channel } from '../../structures/channel/Channel';
import { createChannel } from '../../util';
import { ChatChannel } from '../../structures/channel/ChatChannel';
import { ForumChannel } from '../../structures/channel/ForumChannel';
import { DocChannel } from '../../structures/channel/DocChannel';
import { VoiceChannel } from '../../structures/channel/VoiceChannel';
import { ListChannel } from '../../structures/channel/ListChannel';
import { StreamChannel } from '../../structures/channel/StreamChannel';

/** A manager of channels that belong to the client. */
export class ChannelManager extends BaseManager<string, ChannelResolvable> {
	/** @param client The client that owns the channels. */
	public constructor(client: Client) {
		super(client, client.options.maxChannelCache);
	}

	/**
	 * Fetch a channel from Guilded, or cache.
	 * @param channelId The ID of the channel to fetch.
	 * @param cache Whether to cache the fetched channel.
	 * @returns The fetched channel.
	 */
	public async fetch(channelId: string, cache = this.client.options.cacheChannels ?? true) {
		let channel = this.cache.get(channelId);
		if (channel) return channel;
		const response = await this.client.rest.get<{ channel: APIChannel }>(
			Routes.channel(channelId),
		);
		channel = createChannel(this.client, response.channel);
		if (cache) this.cache.set(channelId, channel);
		return channel;
	}

	/**
	 * Create a channel on Guilded.
	 * @param payload The payload to create the channel with.
	 * @returns The created channel.
	 */
	public async create(payload: APIChannelPayload) {
		const response = await this.client.rest.post<{ channel: APIChannel }, APIChannelPayload>(
			Routes.channels(),
			payload,
		);
		return createChannel(this.client, response.channel);
	}

	/**
	 * Edit an existing channel on Guilded.
	 * @param channelId The ID of the channel to edit.
	 * @param payload The payload to edit the channel with.
	 * @returns The edited channel.
	 */
	public async edit(channelId: string, payload: APIChannelEditPayload) {
		const response = await this.client.rest.patch<{ channel: APIChannel }, APIChannelEditPayload>(
			Routes.channel(channelId),
			payload,
		);
		return createChannel(this.client, response.channel);
	}

	/**
	 * Delete a channel from Guilded.
	 * @param channelId The ID of the channel to delete.
	 */
	public async delete(channelId: string) {
		await this.client.rest.delete(Routes.channel(channelId));
	}
}

/** The channel resolvable type. */
export type ChannelResolvable =
	| Channel
	| ChatChannel
	| DocChannel
	| ForumChannel
	| ListChannel
	| StreamChannel
	| VoiceChannel;

/** Chat based channels. */
export type ChatBasedChannel = ChatChannel | StreamChannel | VoiceChannel;
