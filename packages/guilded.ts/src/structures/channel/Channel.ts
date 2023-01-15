import { APIChannel, RESTPatchChannelJSONBody, ChannelType } from 'guilded-api-typings';
import { Base } from '../Base';
import { Client } from '../Client';
import { FetchOptions } from '../../managers/BaseManager';

/**
 * Represents a channel on Guilded
 */
export class Channel extends Base {
	/**
	 * @param client The client
	 * @param data The data of the channel
	 * @param cache Whether to cache the channel
	 */
	constructor(
		client: Client,
		public readonly data: APIChannel,
		cache = client.options.cacheChannels ?? true,
	) {
		super(client);
		if (cache) client.channels.cache.set(this.id, this);
	}

	/**
	 * Whether the channel is cached
	 */
	get isCached() {
		return this.client.channels.cache.has(this.id);
	}

	/**
	 * The ID of the channel
	 */
	get id() {
		return this.data.id;
	}

	/**
	 * The type of channel
	 *
	 * This will determine what managers are available
	 *
	 * For example: if `chat`, then you're able to use the `messages` manager
	 */
	get type() {
		return this.data.type;
	}

	/**
	 * The name of the channel (`1`-`100` characters)
	 */
	get name() {
		return this.data.name;
	}

	/**
	 * The topic of the channel (`1`-`512` characters)
	 */
	get topic() {
		return this.data.topic ?? null;
	}

	/**
	 * When the channel was created
	 */
	get createdAt() {
		return new Date(this.data.createdAt);
	}

	/**
	 * The ID of the user that created the channel
	 */
	get creatorId() {
		return this.data.createdBy;
	}

	/**
	 * The user that created the channel
	 */
	get creator() {
		return this.client.users.cache.get(this.creatorId) ?? null;
	}

	/**
	 * Whether the client user created the channel
	 */
	get isCreator() {
		return this.creatorId === this.client.user?.id;
	}

	/**
	 * When the channel was updated, if relevant
	 */
	get updatedAt() {
		return this.data.updatedAt ? new Date(this.updatedAt) : null;
	}

	/**
	 * Whether the channel is updated
	 */
	get isUpdated() {
		return !!this.updatedAt;
	}

	/**
	 * The ID of the server
	 */
	get serverId() {
		return this.data.serverId;
	}

	/**
	 * The server
	 */
	get server() {
		return this.client.servers.cache.get(this.serverId) ?? null;
	}

	/**
	 * The ID of the parent channel or thread, if present
	 *
	 * Only relevant for server channels
	 */
	get parentId() {
		return this.data.parentId ?? null;
	}

	/**
	 * The parent channel or thread, if present
	 *
	 * Only relevant for server channels
	 */
	get parent() {
		return this.parentId ? this.client.channels.cache.get(this.parentId) ?? null : null;
	}

	/**
	 * Whether the channel is a thread
	 */
	get isThread() {
		return !!this.parentId;
	}

	/**
	 * The ID of the category, only relevant for server channels
	 */
	get categoryId() {
		return this.data.categoryId ?? null;
	}

	/**
	 * The ID of the group
	 */
	get groupId() {
		return this.data.groupId;
	}

	/**
	 * The group
	 */
	get group() {
		return this.client.groups.fetch(this.groupId);
	}

	/**
	 * Whether the channel can be accessed from users who are not a member of the server
	 */
	get isPublic() {
		return this.data.isPublic ?? false;
	}

	/**
	 * The ID of the user that archived the channel
	 */
	get archiverId() {
		return this.data.archivedBy ?? null;
	}

	/**
	 * The user that archived the channel
	 */
	get archiver() {
		return this.archiverId ? this.client.users.cache.get(this.archiverId) ?? null : null;
	}

	/**
	 * Whether the client user archived the channel
	 */
	get isArchiver() {
		return this.archiverId === this.client.user?.id;
	}

	/**
	 * When the channel was archived, if relevant
	 */
	get archivedAt() {
		return this.data.archivedAt ? new Date(this.data.archivedAt) : null;
	}

	/**
	 * Whether the channel is archived
	 */
	get isArchived() {
		return !!this.archiverId;
	}

	/**
	 * Whether the channel is chat based
	 */
	get isChatBased() {
		return [ChannelType.Chat, ChannelType.Stream, ChannelType.Voice].includes(this.type);
	}

	/**
	 * Whether the channel is voice based
	 */
	get isVoiceBased() {
		return [ChannelType.Voice, ChannelType.Stream].includes(this.type);
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
	 * Fetch the user that created the channel
	 * @returns The fetched user
	 */
	fetchCreator() {
		return this.client.users.fetch(this.serverId, this.creatorId);
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
	async fetchParent(options?: FetchOptions) {
		return this.parentId ? this.client.channels.fetch(this.parentId, options) : null;
	}

	/**
	 * Fetch the user that archived the channel
	 * @returns The fetched user
	 */
	async fetchArchiver() {
		return this.archiverId ? this.client.users.fetch(this.serverId, this.archiverId) : null;
	}

	/**
	 * Update the channel
	 * @param options The options to update the channel with
	 * @returns The updated channel
	 */
	update(options: RESTPatchChannelJSONBody) {
		return this.client.channels.update(this, options) as Promise<this>;
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
