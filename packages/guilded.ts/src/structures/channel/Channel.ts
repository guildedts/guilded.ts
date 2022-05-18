import { APIChannel, APIChannelEditPayload, APIChannelType } from 'guilded-api-typings';
import { Base } from '../Base';
import { Client } from '../Client';
import { ChannelResolvable } from '../../managers/channel/ChannelManager';
import { ChannelWebhookManager } from '../../managers/channel/ChannelWebhookManager';

/** Represents a channel on Guilded. */
export class Channel extends Base {
	/** The type of channel. */
	public readonly type: APIChannelType;
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
	/** The ID of the parent channel. */
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

	/** A manager of webhooks that belong to the channel. */
	public readonly webhooks: ChannelWebhookManager;

	/**
	 * @param client The client that owns the channel.
	 * @param raw The raw data of the channel.
	 */
	constructor(client: Client, public readonly raw: APIChannel) {
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
	}

	/** Whether the channel is cached. */
	public get isCached() {
		return this.client.channels.cache.has(this.id);
	}

	/** The timestamp the channel was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The timestamp the channel was edited. */
	public get editedTimestamp() {
		return this.editedAt ? this.editedAt.getTime() : undefined;
	}

	/** The server the channel belongs to. */
	public get server() {
		return this.client.servers.fetch(this.serverId);
	}

	/** The parent channel. */
	public get parent(): ChannelResolvable | undefined {
		return this.parantId ? this.client.channels.cache.get(this.parantId) : undefined;
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
		return this.type === 'announcements';
	}

	/** Whther the channel is a chat channel. */
	public get isChat() {
		return this.type === 'chat';
	}

	/** Whether the channel is chat based. */
	public get isChatBased() {
		return this.type === 'chat' ?? this.type === 'stream' ?? this.type === 'voice';
	}

	/** Whther the channel is a calendar channel. */
	public get isCalendar() {
		return this.type === 'calendar';
	}

	/** Whther the channel is a forum channel. */
	public get isForum() {
		return this.type === 'forums';
	}

	/** Whther the channel is a media channel. */
	public get isMedia() {
		return this.type === 'media';
	}

	/** Whther the channel is a doc channel. */
	public get isDoc() {
		return this.type === 'docs';
	}

	/** Whther the channel is a voice channel. */
	public get isVoice() {
		return this.type === 'voice';
	}

	/** Whther the channel is a list channel. */
	public get isList() {
		return this.type === 'list';
	}

	/** Whther the channel is a schedule channel. */
	public get isSchedule() {
		return this.type === 'scheduling';
	}

	/** Whther the channel is a stream channel. */
	public get isStream() {
		return this.type === 'stream';
	}

	/**
	 * Fetch the channel.
	 * @param cache Whether to cache the fetched channel.
	 * @returns The fetched channel.
	 */
	public fetch(cache?: boolean) {
		this.client.channels.cache.delete(this.id);
		return this.client.channels.fetch(this.id, cache);
	}

	/**
	 * Edit the channel.
	 * @param payload The payload to edit the channel with.
	 * @returns The edited channel.
	 */
	public edit(payload: APIChannelEditPayload) {
		return this.client.channels.edit(this.id, payload);
	}

	/**
	 * Set the name of the channel.
	 * @param name The name to set the channel to.
	 * @returns The edited channel.
	 */
	public setName(name: string) {
		return this.edit({ name });
	}

	/**
	 * Set the topic of the channel.
	 * @param topic The topic to set the channel to.
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
		await this.client.channels.delete(this.id);
		return this;
	}
}
