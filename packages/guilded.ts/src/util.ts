import { APIChannel } from 'guilded-api-typings';
import { ChannelResolvable } from './managers/channel/ChannelManager';
import { Client } from './structures/Client';
import { Channel } from './structures/channel/Channel';
import { ChatChannel } from './structures/channel/ChatChannel';
import { DocChannel } from './structures/channel/DocChannel';
import { ForumChannel } from './structures/channel/ForumChannel';
import { ListChannel } from './structures/channel/ListChannel';
import { StreamChannel } from './structures/channel/StreamChannel';
import { VoiceChannel } from './structures/channel/VoiceChannel';

/**
 * Create a channel structure.
 * @param client The client the channel belongs to.
 * @param raw The raw data of the channel.
 * @param cache Whether to cache the channel.
 * @returns The created channel structure.
 */
export function createChannel(client: Client, raw: APIChannel, cache?: boolean): ChannelResolvable {
	switch (raw.type) {
		case 'chat':
			return new ChatChannel(client, raw, cache);
		case 'docs':
			return new DocChannel(client, raw, cache);
		case 'forums':
			return new ForumChannel(client, raw, cache);
		case 'list':
			return new ListChannel(client, raw, cache);
		case 'stream':
			return new StreamChannel(client, raw, cache);
		case 'voice':
			return new VoiceChannel(client, raw, cache);
		default:
			return new Channel(client, raw, cache);
	}
}
