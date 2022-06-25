import {
	APIChannel,
	APIChannelEditPayload,
	APIChannelType,
	APIChannelTypeString,
} from 'guilded-api-typings';
import { Base } from '../Base';
import { Client } from '../Client';
import { ChannelWebhookManager } from '../../managers/channel/ChannelWebhookManager';
import { FetchOptions } from '../../managers/BaseManager';

/** Represents a channel on Guilded. */
export class Channel extends Base {
	/** The type of the channel. */
	public readonly type: APIChannelTypeString;
	/** The name of the channel. */
	public readonly name: string;
	/** The topic of the channel. */
	public readonly topic?: string;
	/** The date the channel was created. */
	public readonly createdAt: Date;
	/** The ID of the user that created the channel. */
	public readonly createdBy: string;
	/** The date the channel was edited. */
	public readonly editedAt?: Date;
	/** The ID of the server the channel belongs to. */
	public readonly serverId: string;
	/** The ID of the parent channel the channel belongs to. */
	public readonly parantId?: string;
	/** The ID of the category the channel belongs to. */
	public readonly categoryId?: number;
	/** The ID of the group the channel belongs to. */
	public readonly groupId: string;
	/** Whether the channel is public. */
	public readonly isPublic?: boolean;
	/** The ID of the user that archived the channel. */
	public readonly archivedBy?: string;
	/** The date the channel was archived. */
	public readonly archivedAt?: Date;

	/** The manager of webhooks that belong to the channel. */
	public readonly webhooks: ChannelWebhookManager;
	static chat: typeof Channel;

	/**
	 * @param client The client the channel belongs to.
	 * @param raw The raw data of the channel.
	 * @param cache Whether to cache the channel.
	 */
	constructor(
		client: Client,
		public readonly raw: APIChannel,
		cache = client.options.cacheChannels ?? true,
	) {
		super(client, raw.id);
		this.webhooks = new ChannelWebhookManager(this);
		this.type = raw.type;
		this.name = raw.name;
		this.topic = raw.topic;
		this.createdAt = new Date(raw.createdAt);
		this.createdBy = raw.createdBy;
		this.editedAt = raw.updatedAt ? new Date(raw.updatedAt) : undefined;
		this.serverId = raw.serverId;
		this.parantId = raw.parentId;
		this.categoryId = raw.categoryId;
		this.groupId = raw.groupId;
		this.isPublic = raw.isPublic;
		this.archivedBy = raw.archivedBy;
		this.archivedAt = raw.archivedAt ? new Date(raw.archivedAt) : undefined;
		if (cache) client.channels.cache.set(this.id, this);
	}

	/** Whether the channel is cached. */
	public get isCached() {
		return this.client.channels.cache.has(this.id);
	}

	/** The timestamp the channel was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The server member that created the channel. */
	public get creator() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/** The timestamp the channel was edited. */
	public get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/** The server the channel belongs to. */
	public get server() {
		return this.client.servers.cache.get(this.serverId);
	}

	/** The parent channel the channel belongs to. */
	public get parent() {
		return this.parantId ? this.client.channels.cache.get(this.parantId) : undefined;
	}

	/** The group the channel belongs to. */
	public get group() {
		return this.client.groups.cache.get(this.groupId);
	}

	/** The server member that archived the channel. */
	public get archiver() {
		return this.archivedBy ? this.server?.members.cache.get(this.archivedBy) : undefined;
	}

	/** The timestamp the channel was archived. */
	public get archivedTimestamp() {
		return this.archivedAt ? this.archivedAt.getTime() : undefined;
	}

	/** Whether the channel is archived. */
	public get isArchived() {
		return !!this.archivedBy;
	}

	/** Whether the channel is a announcement channel. */
	public get isAnnouncement() {
		return this.type === APIChannelType.Announcements;
	}

	/** Whther the channel is a chat channel. */
	public get isChat() {
		return this.type === APIChannelType.Chat;
	}

	/** Whether the channel is chat based. */
	public get isChatBased() {
		return (
			this.type === APIChannelType.Chat ||
			this.type === APIChannelType.Stream ||
			this.type === APIChannelType.Voice
		);
	}

	/** Whther the channel is a calendar channel. */
	public get isCalendar() {
		return this.type === APIChannelType.Calendar;
	}

	/** Whther the channel is a forum channel. */
	public get isForum() {
		return this.type === APIChannelType.Forums;
	}

	/** Whther the channel is a media channel. */
	public get isMedia() {
		return this.type === APIChannelType.Media;
	}

	/** Whther the channel is a doc channel. */
	public get isDoc() {
		return this.type === APIChannelType.Docs;
	}

	/** Whther the channel is a voice channel. */
	public get isVoice() {
		return this.type === APIChannelType.Voice;
	}

	/** Whther the channel is a list channel. */
	public get isList() {
		return this.type === APIChannelType.List;
	}

	/** Whther the channel is a schedule channel. */
	public get isSchedule() {
		return this.type === APIChannelType.Scheduling;
	}

	/** Whther the channel is a stream channel. */
	public get isStream() {
		return this.type === APIChannelType.Stream;
	}

	/**
	 * Fetch the channel.
	 * @param options The options to fetch the channel with.
	 * @returns The fetched channel.
	 */
	public fetch(options?: FetchOptions) {
		return this.client.channels.fetch(this, options) as Promise<this>;
	}

	/**
	 * Fetch the server member that created the channel.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 */
	public async fetchCreator(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Fetch the server the channel belongs to.
	 * @param options The options to fetch the server with.
	 * @returns The fetched server.
	 */
	public fetchServer(options?: FetchOptions) {
		return this.client.servers.fetch(this.serverId, options);
	}

	/**
	 * Fetch the parent channel the channel belongs to.
	 * @param options The options to fetch the channel with.
	 * @returns The fetched channel.
	 */
	public fetchParent(options?: FetchOptions) {
		return this.parantId ? this.client.channels.fetch(this.parantId, options) : undefined;
	}

	/**
	 * Fetch the group the channel belongs to.
	 * @param options The options to fetch the group with.
	 * @returns The fetched group.
	 */
	public fetchGroup(options?: FetchOptions) {
		return this.client.groups.fetch(this.groupId, options);
	}

	/**
	 * Fetch the server member that archived the channel.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 */
	public async fetchArchiver(options?: FetchOptions) {
		const server = await this.fetchServer();
		return this.archivedBy ? server.members.fetch(this.archivedBy, options) : undefined;
	}

	/**
	 * Edit the channel.
	 * @param payload The payload of the channel.
	 * @returns The edited channel.
	 */
	public edit(payload: APIChannelEditPayload) {
		return this.client.channels.edit(this, payload) as Promise<this>;
	}

	/**
	 * Set the name of the channel.
	 * @param name The name of the channel.
	 * @returns The edited channel.
	 */
	public setName(name: string) {
		return this.edit({ name });
	}

	/**
	 * Set the topic of the channel.
	 * @param topic The topic of the channel.
	 * @returns The edited channel.
	 */
	public setTopic(topic: string) {
		return this.edit({ topic });
	}

	/**
	 * Set whether the channel is public.
	 * @param isPublic Whether the channel is public.
	 * @returns The edited channel.
	 */
	public setPublic(isPublic: boolean) {
		return this.edit({ isPublic });
	}

	/**
	 * Delete the channel.
	 * @returns The deleted channel.
	 */
	public async delete() {
		await this.client.channels.delete(this);
		return this;
	}
}
