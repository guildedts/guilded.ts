import { Base } from './Base';
import { Client } from './Client';
import { GroupMemberManager } from '../managers/group/GroupMemberManager';
import { FetchOptions } from '../managers/BaseManager';
import { RESTPostChannelJSONBody } from 'guilded-api-typings';

/**
 * Represents a group on Guilded
 */
export class Group extends Base {
	/**
	 * The manager for members
	 */
	readonly members: GroupMemberManager;

	/**
	 * @param client The client
	 * @param data The data of the group
	 * @param cache Whether to cache the group
	 */
	constructor(
		client: Client,
		public readonly data: { id: string },
		cache = client.options.cacheGroups ?? true,
	) {
		super(client);
		this.members = new GroupMemberManager(this);
		if (cache) client.groups.cache.set(this.id, this);
	}

	/**
	 * Whether the group is cached
	 */
	get isCached() {
		return this.client.groups.cache.has(this.id);
	}

	/**
	 * The ID of the group
	 */
	get id() {
		return this.data.id;
	}

	/**
	 * Fetch the group
	 * @param options The options to fetch the group with
	 * @returns The fetched group
	 */
	fetch(options?: FetchOptions) {
		return this.client.groups.fetch(this, options) as this;
	}

	/**
	 * Create a channel in the group
	 * @param options The options to create the channel with
	 * @returns The created channel
	 */
	createChannel(options: Omit<RESTPostChannelJSONBody, 'groupId'>) {
		return this.client.channels.create({ groupId: this.id, ...options });
	}
}
