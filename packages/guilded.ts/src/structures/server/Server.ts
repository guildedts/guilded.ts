import { APIChannelPayload } from 'guilded-api-typings';
import { Client, Base } from '..';
import { ServerBanManager, ServerMemberManager, ServerRoleManager } from '../../managers';

/** Represents a server on Guilded. */
export class Server extends Base {
	/** A manager of members that belong to this server. */
	public readonly members: ServerMemberManager;
	/** A manager of bans that belong to this server. */
	public readonly bans: ServerBanManager;
	/** A manager of roles that belong to this server. */
	public readonly roles: ServerRoleManager;

	/**
	 * @param client The client that owns this server.
	 * @param id The ID of the server.
	 */
	constructor(client: Client, id: string) {
		super(client, id);

		this.members = new ServerMemberManager(this);
		this.bans = new ServerBanManager(this);
		this.roles = new ServerRoleManager(this);
	}

	/** Whether this server is cached. */
	public get cached() {
		return this.client.servers.cache.has(this.id);
	}

	/**
	 * Fetch this server.
	 * @param cache Whether to cache the server.
	 * @returns The server.
	 */
	public fetch(cache = this.client.servers.caching) {
		this.client.servers.cache.delete(this.id);
		return this.client.servers.fetch(this.id, cache);
	}

	/**
	 * Create a channel in this server.
	 * @param payload The payload of the channel.
	 * @param cache Whether to cache the channel.
	 * @returns The created channel.
	 */
	public async createChannel(
		payload: Omit<APIChannelPayload, 'serverId'>,
		cache = this.client.channels.caching,
	) {
		return this.client.channels.create({ serverId: this.id, ...payload }, cache);
	}

	/**
	 * Create a announcement channel in this server.
	 * @param payload The payload of the announcement channel.
	 * @param cache Whether to cache the announcement channel.
	 * @returns The created announcement channel.
	 */
	public async createAnnouncementChannel(
		payload: Omit<APIChannelPayload, 'serverId' | 'type'>,
		cache = this.client.channels.caching,
	) {
		return this.client.channels.createAnnouncement({ serverId: this.id, ...payload }, cache);
	}

	/**
	 * Create a chat channel in this server.
	 * @param payload The payload of the chat channel.
	 * @param cache Whether to cache the chat channel.
	 * @returns The created chat channel.
	 */
	public async createChatChannel(
		payload: Omit<APIChannelPayload, 'serverId' | 'type'>,
		cache = this.client.channels.caching,
	) {
		return this.client.channels.createChat({ serverId: this.id, ...payload }, cache);
	}

	/**
	 * Create a calendar channel in this server.
	 * @param payload The payload of the calendar channel.
	 * @param cache Whether to cache the calendar channel.
	 * @returns The created calendar channel.
	 */
	public async createCalanderChannel(
		payload: Omit<APIChannelPayload, 'serverId' | 'type'>,
		cache = this.client.channels.caching,
	) {
		return this.client.channels.createCalendar({ serverId: this.id, ...payload }, cache);
	}

	/**
	 * Create a forum channel in this server.
	 * @param payload The payload of the forum channel.
	 * @param cache Whether to cache the forum channel.
	 * @returns The created forum channel.
	 */
	public async createForumChannel(
		payload: Omit<APIChannelPayload, 'serverId' | 'type'>,
		cache = this.client.channels.caching,
	) {
		return this.client.channels.createForum({ serverId: this.id, ...payload }, cache);
	}

	/**
	 * Create a media channel in this server.
	 * @param payload The payload of the media channel.
	 * @param cache Whether to cache the media channel.
	 * @returns The created media channel.
	 */
	public async createMediaChannel(
		payload: Omit<APIChannelPayload, 'serverId' | 'type'>,
		cache = this.client.channels.caching,
	) {
		return this.client.channels.createMedia({ serverId: this.id, ...payload }, cache);
	}

	/**
	 * Create a doc channel in this server.
	 * @param payload The payload of the doc channel.
	 * @param cache Whether to cache the doc channel.
	 * @returns The created doc channel.
	 */
	public async createDocChannel(
		payload: Omit<APIChannelPayload, 'serverId' | 'type'>,
		cache = this.client.channels.caching,
	) {
		return this.client.channels.createDoc({ serverId: this.id, ...payload }, cache);
	}

	/**
	 * Create a voice channel in this server.
	 * @param payload The payload of the voice channel.
	 * @param cache Whether to cache the voice channel.
	 * @returns The created voice channel.
	 */
	public async createVoiceChannel(
		payload: Omit<APIChannelPayload, 'serverId' | 'type'>,
		cache = this.client.channels.caching,
	) {
		return this.client.channels.createVoice({ serverId: this.id, ...payload }, cache);
	}

	/**
	 * Create a list channel in this server.
	 * @param payload The payload of the list channel.
	 * @param cache Whether to cache the list channel.
	 * @returns The created list channel.
	 */
	public async createListChannel(
		payload: Omit<APIChannelPayload, 'serverId' | 'type'>,
		cache = this.client.channels.caching,
	) {
		return this.client.channels.createList({ serverId: this.id, ...payload }, cache);
	}

	/**
	 * Create a schedule channel in this server.
	 * @param payload The payload of the schedule channel.
	 * @param cache Whether to cache the schedule channel.
	 * @returns The created schedule channel.
	 */
	public async createScheduleChannel(
		payload: Omit<APIChannelPayload, 'serverId' | 'type'>,
		cache = this.client.channels.caching,
	) {
		return this.client.channels.createSchedule({ serverId: this.id, ...payload }, cache);
	}

	/**
	 * Create a stream channel in this server.
	 * @param payload The payload of the stream channel.
	 * @param cache Whether to cache the stream channel.
	 * @returns The created stream channel.
	 */
	public async createStreamChannel(
		payload: Omit<APIChannelPayload, 'serverId' | 'type'>,
		cache = this.client.channels.caching,
	) {
		return this.client.channels.createStream({ serverId: this.id, ...payload }, cache);
	}
}
