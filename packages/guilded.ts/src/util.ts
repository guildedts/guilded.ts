import { APIChannel, ChannelType } from 'guilded-api-typings';
import { Client } from './structures/Client';
import { Channel } from './structures/channel/Channel';
import { ChatChannel } from './structures/channel/ChatChannel';
import { DocChannel } from './structures/channel/DocChannel';
import { ForumChannel } from './structures/channel/ForumChannel';
import { ListChannel } from './structures/channel/ListChannel';
import { CalendarChannel } from './structures/channel/CalendarChannel';

/**
 * Create a channel structure.
 * @param client The client the channel belongs to.
 * @param raw The raw data of the channel.
 * @param cache Whether to cache the channel.
 * @returns The created channel structure.
 * @example createChannel(client, rawChannel);
 */
export const createChannel = (client: Client, raw: APIChannel, cache?: boolean): Channel =>
	new ChannelTypeMap[raw.type](client, raw, cache);

/** A map of channel types to their respective classes. */
const ChannelTypeMap: {
	[type in ChannelType]: typeof Channel;
} = {
	announcements: Channel,
	media: Channel,
	scheduling: Channel,
	chat: ChatChannel,
	voice: ChatChannel,
	stream: ChatChannel,
	docs: DocChannel,
	forums: ForumChannel,
	list: ListChannel,
	calendar: CalendarChannel,
};
