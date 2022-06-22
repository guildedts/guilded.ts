import { APIChannelEditPayload, APIChannelPayload } from 'guilded-api-typings';
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

/** The manager of channels that belong to the client. */
export class ChannelManager extends BaseManager<string, ChannelResolvable> {
	/** @param client The client the channels belong to. */
	public constructor(client: Client) {
		super(client, client.options.maxChannelCache);
	}

	/**
	 * Fetch a channel from Guilded, or cache.
	 * @param channelId The ID of the channel to fetch.
	 * @param cache Whether to cache the fetched channel
	 * @returns The fetched channel.
	 */
	public async fetch(channelId: string, cache?: boolean): Promise<ChannelResolvable> {
		let channel = this.cache.get(channelId);
		if (channel) return channel;
		const raw = await this.client.api.channels.fetch(channelId);
		channel = createChannel(this.client, raw, cache);
		return channel;
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
	 * @param channelId The ID of the channel to edit.
	 * @param payload The payload of the channel.
	 * @returns The edited channel.
	 */
	public async edit(channelId: string, payload: APIChannelEditPayload) {
		const raw = await this.client.api.channels.edit(channelId, payload);
		return createChannel(this.client, raw);
	}

	/**
	 * Delete a channel from Guilded.
	 * @param channelId The ID of the channel to delete.
	 */
	public delete(channelId: string) {
		return this.client.api.channels.delete(channelId);
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
