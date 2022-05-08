import { APIChannel, APIChannelType } from 'guilded-api-typings';
import { Base, Client } from '..';
import { ChannelResolvable, ChannelWebhookManager } from '../../managers';

/** Represents a channel on Guilded. */
export class Channel extends Base {
	/** The type of this channel. */
	public readonly type: APIChannelType;
	/** The name of the channel. */
	public readonly name: string;
	/** The topic of this channel. */
	public readonly topic?: string;
	/** The time this channel was created. */
	public readonly createdAt: Date;
	/** The ID of the user who created this channel. */
	public readonly createdBy: string;
	/** The time this channel was last edited. */
	public readonly editedAt?: Date;
	/** The ID of the server this channel is in. */
	public readonly serverId: string;
	/** The ID of the parent channel. */
	public readonly parantId?: string;
	/** The ID of the category this channel is in. */
	public readonly categoryId?: number;
	/** The ID of the group this channel is in. */
	public readonly groupId: string;
	/** Whether this channel is public. */
	public readonly isPublic?: boolean;
	/** The ID of the user who archived this channel. */
	public readonly archivedBy?: string;
	/** The time the channel was archived. */
	public readonly archivedAt?: Date;

	/** A manager of webhooks that belong to this channel. */
	public readonly webhooks: ChannelWebhookManager;

	/**
	 * @param client The client that owns this channel.
	 * @param data The data of the channel.
	 */
	public constructor(client: Client, data: APIChannel) {
		super(client, data.id);

		this.webhooks = new ChannelWebhookManager(this);

		this.type = data.type;
		this.name = data.name;
		this.topic = data.topic;
		this.createdAt = new Date(data.createdAt);
		this.createdBy = data.createdBy;
		this.editedAt = data.updatedAt ? new Date(data.updatedAt) : undefined;
		this.serverId = data.serverId;
		this.parantId = data.parentId;
		this.categoryId = data.categoryId;
		this.groupId = data.groupId;
		this.isPublic = data.isPublic;
		this.archivedBy = data.archivedBy;
		this.archivedAt = data.archivedAt ? new Date(data.archivedAt) : undefined;
	}

	/** Whether this channel is cached. */
	public get cached() {
		return this.client.channels.cache.has(this.id);
	}

	/** The timestamp of when this channel was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The timestamp of when this channel was last edited. */
	public get editedTimestamp() {
		return this.editedAt ? this.editedAt.getTime() : undefined;
	}

	/** The server this channel is in. */
	public get server() {
		return this.client.servers.fetch(this.serverId);
	}

	/** The parent channel of this channel. */
	public get parent(): ChannelResolvable | undefined {
		return this.parantId ? this.client.channels.cache.get(this.parantId) : undefined;
	}

	/** The timestamp of when this channel was archived. */
	public get archivedTimestamp() {
		return this.archivedAt ? this.archivedAt.getTime() : undefined;
	}

	/** Whether this channel is archived. */
	public get archived() {
		return !!this.archivedBy;
	}

	/** Whether this channel is a announcement channel. */
	public get announcement() {
		return this.type === 'announcements';
	}

	/** Whther this channel is a chat channel. */
	public get chat() {
		return this.type === 'chat';
	}

	/** Whether this channel is chat based. */
	public get chatBased() {
		return this.type === 'chat' ?? this.type === 'stream' ?? this.type === 'voice';
	}

	/** Whther this channel is a calendar channel. */
	public get calendar() {
		return this.type === 'calendar';
	}

	/** Whther this channel is a forum channel. */
	public get forum() {
		return this.type === 'forums';
	}

	/** Whther this channel is a media channel. */
	public get media() {
		return this.type === 'media';
	}

	/** Whther this channel is a doc channel. */
	public get doc() {
		return this.type === 'docs';
	}

	/** Whther this channel is a voice channel. */
	public get voice() {
		return this.type === 'voice';
	}

	/** Whther this channel is a list channel. */
	public get list() {
		return this.type === 'list';
	}

	/** Whther this channel is a schedule channel. */
	public get schedule() {
		return this.type === 'scheduling';
	}

	/** Whther this channel is a stream channel. */
	public get stream() {
		return this.type === 'stream';
	}

	/**
	 * Fetch this channel.
	 * @param cache Whether to cache the channel.
	 * @returns The channel.
	 */
	public fetch(cache: boolean): Promise<ChannelResolvable> {
		this.client.channels.cache.delete(this.id);

		return this.client.channels.fetch(this.id, cache);
	}

	/**
	 * Delete this channel.
	 * @returns The channel if it is cached.
	 */
	public async delete() {
		return this.client.channels.delete(this.id);
	}
}
