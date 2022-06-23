import { APIChannel, APIChannelType } from 'guilded-api-typings';
import { ChannelResolvable } from './managers/channel/ChannelManager';
import { Client } from './structures/Client';
import { Channel } from './structures/channel/Channel';
import { ChatChannel } from './structures/channel/ChatChannel';
import { DocChannel } from './structures/channel/DocChannel';
import { ForumChannel } from './structures/channel/ForumChannel';
import { ListChannel } from './structures/channel/ListChannel';
import { StreamChannel } from './structures/channel/StreamChannel';
import { VoiceChannel } from './structures/channel/VoiceChannel';
import { CalendarChannel } from './structures/channel/CalendarChannel';

/**
 * Create a channel structure.
 * @param client The client the channel belongs to.
 * @param raw The raw data of the channel.
 * @param cache Whether to cache the channel.
 * @returns The created channel structure.
 */
export function createChannel(client: Client, raw: APIChannel, cache?: boolean): ChannelResolvable {
	switch (raw.type) {
		case APIChannelType.Chat:
			return new ChatChannel(client, raw, cache);
		case APIChannelType.Docs:
			return new DocChannel(client, raw, cache);
		case APIChannelType.Forums:
			return new ForumChannel(client, raw, cache);
		case APIChannelType.List:
			return new ListChannel(client, raw, cache);
		case APIChannelType.Stream:
			return new StreamChannel(client, raw, cache);
		case APIChannelType.Voice:
			return new VoiceChannel(client, raw, cache);
		case APIChannelType.Calendar:
			return new CalendarChannel(client, raw, cache);
		default:
			return new Channel(client, raw, cache);
	}
}
