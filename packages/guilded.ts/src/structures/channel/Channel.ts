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

/**
 * Represents a channel on Guilded.
 * @example new Channel(client, rawChannel);
 */
export class Channel extends Base {
	/** The type of the channel. */
	readonly type: APIChannelTypeString;
	/** The name of the channel. */
	readonly name: string;
	/** The topic of the channel. */
	readonly topic?: string;
	/** The date the channel was created. */
	readonly createdAt: Date;
	/** The ID of the user that created the channel. */
	readonly createdBy: string;
	/** The date the channel was edited. */
	readonly editedAt?: Date;
	/** The ID of the server the channel belongs to. */
	readonly serverId: string;
	/** The ID of the parent channel the channel belongs to. */
	readonly parantId?: string;
	/** The ID of the category the channel belongs to. */
	readonly categoryId?: number;
	/** The ID of the group the channel belongs to. */
	readonly groupId: string;
	/** Whether the channel is public. */
	readonly isPublic?: boolean;
	/** The ID of the user that archived the channel. */
	readonly archivedBy?: string;
	/** The date the channel was archived. */
	readonly archivedAt?: Date;

	/** The manager of webhooks that belong to the channel. */
	readonly webhooks: ChannelWebhookManager;

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
	get isCached() {
		return this.client.channels.cache.has(this.id);
	}

	/** The timestamp the channel was created. */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The server member that created the channel. */
	get creator() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/** The timestamp the channel was edited. */
	get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/** The server the channel belongs to. */
	get server() {
		return this.client.servers.cache.get(this.serverId);
	}

	/** The parent channel the channel belongs to. */
	get parent() {
		return this.parantId ? this.client.channels.cache.get(this.parantId) : undefined;
	}

	/** The group the channel belongs to. */
	get group() {
		return this.client.groups.cache.get(this.groupId);
	}

	/** The server member that archived the channel. */
	get archiver() {
		return this.archivedBy ? this.server?.members.cache.get(this.archivedBy) : undefined;
	}

	/** The timestamp the channel was archived. */
	get archivedTimestamp() {
		return this.archivedAt ? this.archivedAt.getTime() : undefined;
	}

	/** Whether the channel is archived. */
	get isArchived() {
		return !!this.archivedBy;
	}

	/** Whether the channel is a announcement channel. */
	get isAnnouncement() {
		return this.type === APIChannelType.Announcements;
	}

	/** Whther the channel is a chat channel. */
	get isChat() {
		return this.type === APIChannelType.Chat;
	}

	/** Whether the channel is chat based. */
	get isChatBased() {
		return (
			this.type === APIChannelType.Chat ||
			this.type === APIChannelType.Stream ||
			this.type === APIChannelType.Voice
		);
	}

	/** Whther the channel is a calendar channel. */
	get isCalendar() {
		return this.type === APIChannelType.Calendar;
	}

	/** Whther the channel is a forum channel. */
	get isForum() {
		return this.type === APIChannelType.Forums;
	}

	/** Whther the channel is a media channel. */
	get isMedia() {
		return this.type === APIChannelType.Media;
	}

	/** Whther the channel is a doc channel. */
	get isDoc() {
		return this.type === APIChannelType.Docs;
	}

	/** Whther the channel is a voice channel. */
	get isVoice() {
		return this.type === APIChannelType.Voice;
	}

	/** Whther the channel is a list channel. */
	get isList() {
		return this.type === APIChannelType.List;
	}

	/** Whther the channel is a schedule channel. */
	get isSchedule() {
		return this.type === APIChannelType.Scheduling;
	}

	/** Whther the channel is a stream channel. */
	get isStream() {
		return this.type === APIChannelType.Stream;
	}

	/**
	 * Fetch the channel.
	 * @param options The options to fetch the channel with.
	 * @returns The fetched channel.
	 * @example channel.fetch();
	 */
	fetch(options?: FetchOptions) {
		return this.client.channels.fetch(this, options) as Promise<this>;
	}

	/**
	 * Fetch the server member that created the channel.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example channel.fetchCreator();
	 */
	async fetchCreator(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Fetch the server the channel belongs to.
	 * @param options The options to fetch the server with.
	 * @returns The fetched server.
	 * @example channel.fetchServer();
	 */
	fetchServer(options?: FetchOptions) {
		return this.client.servers.fetch(this.serverId, options);
	}

	/**
	 * Fetch the parent channel the channel belongs to.
	 * @param options The options to fetch the channel with.
	 * @returns The fetched channel.
	 * @example channel.fetchParent();
	 */
	fetchParent(options?: FetchOptions) {
		return this.parantId ? this.client.channels.fetch(this.parantId, options) : undefined;
	}

	/**
	 * Fetch the group the channel belongs to.
	 * @param options The options to fetch the group with.
	 * @returns The fetched group.
	 * @example channel.fetchGroup();
	 */
	fetchGroup(options?: FetchOptions) {
		return this.client.groups.fetch(this.groupId, options);
	}

	/**
	 * Fetch the server member that archived the channel.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example channel.fetchArchiver();
	 */
	async fetchArchiver(options?: FetchOptions) {
		const server = await this.fetchServer();
		return this.archivedBy ? server.members.fetch(this.archivedBy, options) : undefined;
	}

	/**
	 * Edit the channel.
	 * @param payload The payload of the channel.
	 * @returns The edited channel.
	 * @example channel.edit({ name: 'Chat' });
	 */
	edit(payload: APIChannelEditPayload) {
		return this.client.channels.edit(this, payload) as Promise<this>;
	}

	/**
	 * Set the name of the channel.
	 * @param name The name of the channel.
	 * @returns The edited channel.
	 * @example channel.setName('Chat');
	 */
	setName(name: string) {
		return this.edit({ name });
	}

	/**
	 * Set the topic of the channel.
	 * @param topic The topic of the channel.
	 * @returns The edited channel.
	 * @example channel.setTopic('This is a topic');
	 */
	setTopic(topic: string) {
		return this.edit({ topic });
	}

	/**
	 * Set whether the channel is public.
	 * @param isPublic Whether the channel is public.
	 * @returns The edited channel.
	 * @example channel.setPublic(true);
	 */
	setPublic(isPublic: boolean) {
		return this.edit({ isPublic });
	}

	/**
	 * Delete the channel.
	 * @returns The deleted channel.
	 * @example channel.delete();
	 */
	async delete() {
		await this.client.channels.delete(this);
		return this;
	}
}
