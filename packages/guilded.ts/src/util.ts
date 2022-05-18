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
 * @param client The client that owns this channel.
 * @param data The data of the channel.
 * @returns The created channel structure.
 */
export function createChannel(client: Client, data: APIChannel): ChannelResolvable {
	switch (data.type) {
		case 'chat':
			return new ChatChannel(client, data);
		case 'docs':
			return new DocChannel(client, data);
		case 'forums':
			return new ForumChannel(client, data);
		case 'list':
			return new ListChannel(client, data);
		case 'stream':
			return new StreamChannel(client, data);
		case 'voice':
			return new VoiceChannel(client, data);
		default:
			return new Channel(client, data);
	}
}
