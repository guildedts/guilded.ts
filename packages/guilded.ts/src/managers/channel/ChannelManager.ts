import { APIChannel, APIChannelPayload, Routes } from 'guilded-api-typings';
import { BaseManager } from '..';
import {
	Client,
	Channel,
	ChatChannel,
	DocChannel,
	ForumChannel,
	ListChannel,
	StreamChannel,
	VoiceChannel,
} from '../../structures';

/** A manager of channels that belong to the client. */
export class ChannelManager extends BaseManager<string, ChannelResolvable> {
	/** @param client The client that owns the channels. */
	public constructor(client: Client) {
		super(client, {
			caching: client.options.cacheChannels,
			maxCache: client.options.maxChannelCache,
		});
	}

	/**
	 * Fetch a channel from Guilded, or cache if it's already cached.
	 * @param channelId The ID of the channel.
	 * @param cache Whether to cache the channel.
	 * @returns The channel.
	 */
	public async fetch(channelId: string, cache: boolean = this.caching) {
		let channel = this.cache.get(channelId);
		if (channel) return channel;

		const response = await this.client.rest.get<{ channel: APIChannel }>(
			Routes.channel(channelId),
		);

		switch (response.channel.type) {
			case 'chat':
				channel = new ChatChannel(this.client, response.channel);
				break;
			case 'docs':
				channel = new DocChannel(this.client, response.channel);
				break;
			case 'forums':
				channel = new ForumChannel(this.client, response.channel);
				break;
			case 'list':
				channel = new ListChannel(this.client, response.channel);
				break;
			case 'stream':
				channel = new StreamChannel(this.client, response.channel);
				break;
			case 'voice':
				channel = new VoiceChannel(this.client, response.channel);
				break;
			default:
				channel = new Channel(this.client, response.channel);
				break;
		}

		if (cache) this.cache.set(channelId, channel);

		return channel as ChannelResolvable;
	}

	/**
	 * Create a channel on Guilded.
	 * @param payload The payload of the channel.
	 * @param cache Whether to cache the channel.
	 * @returns The created channel.
	 */
	public async create(payload: APIChannelPayload, cache = this.caching) {
		const response = await this.client.rest.post<{ channel: APIChannel }, APIChannelPayload>(
			Routes.channels(),
			payload,
		);

		const channel = await this.fetch(response.channel.id);

		if (cache) this.cache.set(channel.id, channel);

		return channel;
	}

	/**
	 * Create a announcement channel on Guilded.
	 * @param payload The payload of the announcement channel.
	 * @param cache Whether to cache the announcement channel.
	 * @returns The created announcement channel.
	 */
	public async createAnnouncement(
		payload: Omit<APIChannelPayload, 'type'>,
		cache = this.caching,
	) {
		return (await this.create(
			{
				type: 'announcements',
				...payload,
			},
			cache,
		)) as Channel;
	}

	/**
	 * Create a chat channel on Guilded.
	 * @param payload The payload of the chat channel.
	 * @param cache Whether to cache the chat channel.
	 * @returns The created chat channel.
	 */
	public async createChat(payload: Omit<APIChannelPayload, 'type'>, cache = this.caching) {
		return (await this.create(
			{
				type: 'chat',
				...payload,
			},
			cache,
		)) as ChatChannel;
	}

	/**
	 * Create a calander channel on Guilded.
	 * @param payload The payload of the calendar channel.
	 * @param cache Whether to cache the calendar channel.
	 * @returns The created calendar channel.
	 */
	public async createCalendar(payload: Omit<APIChannelPayload, 'type'>, cache = this.caching) {
		return (await this.create(
			{
				type: 'calendar',
				...payload,
			},
			cache,
		)) as Channel;
	}

	/**
	 * Create a forum channel on Guilded.
	 * @param payload The payload of the forum channel.
	 * @param cache Whether to cache the forum channel.
	 * @returns The created forum channel.
	 */
	public async createForum(payload: Omit<APIChannelPayload, 'type'>, cache = this.caching) {
		return (await this.create(
			{
				type: 'forums',
				...payload,
			},
			cache,
		)) as ForumChannel;
	}

	/**
	 * Create a media channel on Guilded.
	 * @param payload The payload of the media channel.
	 * @param cache Whether to cache the media channel.
	 * @returns The created media channel.
	 */
	public async createMedia(payload: Omit<APIChannelPayload, 'type'>, cache = this.caching) {
		return (await this.create(
			{
				type: 'media',
				...payload,
			},
			cache,
		)) as Channel;
	}

	/**
	 * Create a doc channel on Guilded.
	 * @param payload The payload of the doc channel.
	 * @param cache Whether to cache the doc channel.
	 * @returns The created doc channel.
	 */
	public async createDoc(payload: Omit<APIChannelPayload, 'type'>, cache = this.caching) {
		return (await this.create(
			{
				type: 'docs',
				...payload,
			},
			cache,
		)) as DocChannel;
	}

	/**
	 * Create a voice channel on Guilded.
	 * @param payload The payload of the voice channel.
	 * @param cache Whether to cache the voice channel.q
	 * @returns The created voice channel.
	 */
	public async createVoice(payload: Omit<APIChannelPayload, 'type'>, cache = this.caching) {
		return (await this.create(
			{
				type: 'voice',
				...payload,
			},
			cache,
		)) as VoiceChannel;
	}

	/**
	 * Create a list channel on Guilded.
	 * @param payload The payload of the list channel.
	 * @param cache Whether to cache the list channel.
	 * @returns The created list channel.
	 */
	public async createList(payload: Omit<APIChannelPayload, 'type'>, cache = this.caching) {
		return (await this.create(
			{
				type: 'list',
				...payload,
			},
			cache,
		)) as ListChannel;
	}

	/**
	 * Create a schedule channel on Guilded.
	 * @param payload The payload of the schedule channel.
	 * @param cache Whether to cache the schedule channel.
	 * @returns The created schedule channel.
	 */
	public async createSchedule(payload: Omit<APIChannelPayload, 'type'>, cache = this.caching) {
		return (await this.create(
			{
				type: 'scheduling',
				...payload,
			},
			cache,
		)) as Channel;
	}

	/**
	 * Create a stream channel on Guilded.
	 * @param payload The payload of the stream channel.
	 * @param cache Whether to cache the stream channel.
	 * @returns The created stream channel.
	 */
	public async createStream(payload: Omit<APIChannelPayload, 'type'>, cache = this.caching) {
		return (await this.create(
			{
				type: 'stream',
				...payload,
			},
			cache,
		)) as StreamChannel;
	}

	/**
	 * Delete a channel from Guilded.
	 * @param channelId The ID of the channel.
	 * @returns The channel if it is cached.
	 */
	public async delete(channelId: string) {
		await this.client.rest.delete(Routes.channel(channelId));

		const channel = this.cache.get(channelId);

		this.cache.delete(channelId);

		return channel;
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
