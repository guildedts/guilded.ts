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
 * @returns The created channel structure.
 */
export function createChannel(client: Client, raw: APIChannel): ChannelResolvable {
	switch (raw.type) {
		case 'chat':
			return new ChatChannel(client, raw);
		case 'docs':
			return new DocChannel(client, raw);
		case 'forums':
			return new ForumChannel(client, raw);
		case 'list':
			return new ListChannel(client, raw);
		case 'stream':
			return new StreamChannel(client, raw);
		case 'voice':
			return new VoiceChannel(client, raw);
		default:
			return new Channel(client, raw);
	}
}
