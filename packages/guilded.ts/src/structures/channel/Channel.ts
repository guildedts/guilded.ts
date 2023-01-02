import { APIChannel, RESTPatchChannelJSONBody, ChannelType } from 'guilded-api-typings';
import { Base } from '../Base';
import { Client } from '../Client';
import { ChannelWebhookManager } from '../../managers/channel/ChannelWebhookManager';
import { FetchOptions } from '../../managers/BaseManager';

/**
 * Represents a channel on Guilded
 */
export class Channel extends Base {
	/**
	 * The type of channel
	 *
	 * This will determine what methods and managers are available
	 *
	 * For example: if `chat`, then you're able to use the `send` method
	 */
	readonly type: ChannelType;
	/**
	 * The name of the channel (`1`-`100` characters)
	 */
	readonly name: string;
	/**
	 * The topic of the channel (`1`-`512` characters)
	 */
	readonly topic?: string;
	/**
	 * When the channel was created
	 */
	readonly createdAt: Date;
	/**
	 * The ID of the user that created the channel
	 */
	readonly createdBy: string;
	/**
	 * When the channel was edited, if relevant
	 */
	readonly editedAt?: Date;
	/**
	 * The ID of the server
	 */
	readonly serverId: string;
	/**
	 * The ID of the parent channel or thread, if present
	 *
	 * Only relevant for server channels
	 */
	readonly parantId?: string;
	/**
	 * The ID of the category, only relevant for server channels
	 */
	readonly categoryId?: number;
	/**
	 * The ID of the group
	 */
	readonly groupId: string;
	/**
	 * Whether the channel can be accessed from users who are not a member of the server
	 *
	 * @default false
	 */
	readonly isPublic?: boolean;
	/**
	 * The ID of the user that archived the channel
	 */
	readonly archivedBy?: string;
	/**
	 * When the channel was archived, if relevant
	 */
	readonly archivedAt?: Date;

	/**
	 * The manager for webhooks
	 */
	readonly webhooks: ChannelWebhookManager;

	/**
	 * @param client The client
	 * @param raw The data of the channel
	 * @param cache Whether to cache the channel
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

	/**
	 * Whether the channel is cached
	 */
	get isCached() {
		return this.client.channels.cache.has(this.id);
	}

	/**
	 * The timestamp of when the channel was created
	 */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/**
	 * The server member that created the channel
	 */
	get creator() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/**
	 * The timestamp of whem the channel was edited
	 */
	get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/**
	 * The server
	 */
	get server() {
		return this.client.servers.cache.get(this.serverId);
	}

	/**
	 * The parent channel or thread, if present
	 *
	 * Only relevant for server channels
	 */
	get parent() {
		return this.parantId ? this.client.channels.cache.get(this.parantId) : undefined;
	}

	/**
	 * The group
	 */
	get group() {
		return this.client.groups.fetch(this.groupId);
	}

	/**
	 * The server member that archived the channel
	 */
	get archiver() {
		return this.archivedBy ? this.server?.members.cache.get(this.archivedBy) : undefined;
	}

	/**
	 * The timestamp of when the channel was archived
	 */
	get archivedTimestamp() {
		return this.archivedAt ? this.archivedAt.getTime() : undefined;
	}

	/**
	 * Whether the channel is archived
	 */
	get isArchived() {
		return !!this.archivedBy;
	}

	/**
	 * Whether the channel is an announcement channel
	 */
	get isAnnouncement() {
		return this.type === ChannelType.Announcements;
	}

	/**
	 * Whther the channel is a chat channel
	 */
	get isChat() {
		return this.type === ChannelType.Chat;
	}

	/**
	 * Whether the channel is chat based
	 */
	get isChatBased() {
		return (
			this.type === ChannelType.Chat ||
			this.type === ChannelType.Stream ||
			this.type === ChannelType.Voice
		);
	}

	/**
	 * Whther the channel is a calendar channel
	 */
	get isCalendar() {
		return this.type === ChannelType.Calendar;
	}

	/**
	 * Whther the channel is a forum channel
	 */
	get isForum() {
		return this.type === ChannelType.Forums;
	}

	/**
	 * Whther the channel is a media channel
	 */
	get isMedia() {
		return this.type === ChannelType.Media;
	}

	/**
	 * Whther the channel is a doc channel
	 */
	get isDoc() {
		return this.type === ChannelType.Docs;
	}

	/**
	 * Whther the channel is a voice channel
	 */
	get isVoice() {
		return this.type === ChannelType.Voice;
	}

	/**
	 * Whther the channel is a list channel
	 */
	get isList() {
		return this.type === ChannelType.List;
	}

	/**
	 * Whther the channel is a schedule channel
	 */
	get isSchedule() {
		return this.type === ChannelType.Scheduling;
	}

	/**
	 * Whther the channel is a stream channel
	 */
	get isStream() {
		return this.type === ChannelType.Stream;
	}

	/**
	 * Fetch the channel
	 * @param options The options to fetch the channel with
	 * @returns The fetched channel
	 */
	fetch(options?: FetchOptions) {
		return this.client.channels.fetch(this, options) as Promise<this>;
	}

	/**
	 * Fetch the server member that created the channel
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	async fetchCreator(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Fetch the server
	 * @param options The options to fetch the server with
	 * @returns The fetched server
	 */
	fetchServer(options?: FetchOptions) {
		return this.client.servers.fetch(this.serverId, options);
	}

	/**
	 * Fetch the parent channel or thread, if present
	 * @param options The options to fetch the channel with
	 * @returns The fetched channel
	 */
	fetchParent(options?: FetchOptions) {
		return this.parantId ? this.client.channels.fetch(this.parantId, options) : undefined;
	}

	/**
	 * Fetch the server member that archived the channel
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	async fetchArchiver(options?: FetchOptions) {
		const server = await this.fetchServer();
		return this.archivedBy ? server.members.fetch(this.archivedBy, options) : undefined;
	}

	/**
	 * Edit the channel
	 * @param payload The payload of the channel
	 * @returns The edited channel
	 */
	edit(payload: RESTPatchChannelJSONBody) {
		return this.client.channels.edit(this, payload) as Promise<this>;
	}

	/**
	 * Set the name of the channel
	 * @param name The name of the channel
	 * @returns The edited channel
	 */
	setName(name: string) {
		return this.edit({ name });
	}

	/**
	 * Set the topic of the channel
	 * @param topic The topic of the channel
	 * @returns The edited channel
	 */
	setTopic(topic: string) {
		return this.edit({ topic });
	}

	/**
	 * Set whether the channel is public
	 * @param isPublic Whether the channel is public
	 * @returns The edited channel
	 */
	setPublic(isPublic: boolean) {
		return this.edit({ isPublic });
	}

	/**
	 * Delete the channel
	 * @returns The deleted channel
	 */
	async delete() {
		await this.client.channels.delete(this);
		return this;
	}
}

export { ChannelType };
