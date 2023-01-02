import { Base } from './Base';
import { Client } from './Client';
import { GroupMemberManager } from '../managers/group/GroupMemberManager';
import { FetchOptions } from '../managers/BaseManager';
import { ServerMember } from './server/ServerMember';
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
	 * @param raw The data of the group
	 * @param cache Whether to cache the group
	 */
	constructor(
		client: Client,
		public readonly raw: { id: string },
		cache = client.options.cacheGroups ?? true,
	) {
		super(client, raw.id);
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
	 * Fetch the group
	 * @param options The options to fetch the group with
	 * @returns The fetched group
	 */
	fetch(options?: FetchOptions) {
		return this.client.groups.fetch(this, options) as this;
	}

	/**
	 * Add a member to the group
	 * @param serverMember The server member
	 */
	addMember(serverMember: string | ServerMember) {
		return this.members.add(serverMember);
	}

	/**
	 * Remove a member from the group
	 * @param serverMember The server member
	 */
	removeMember(serverMember: string | ServerMember) {
		return this.members.remove(serverMember);
	}

	/**
	 * Create a channel in the group
	 * @param payload The payload of the channel
	 * @returns The created channel
	 */
	createChannel(payload: Omit<RESTPostChannelJSONBody, 'groupId'>) {
		return this.client.channels.create({ groupId: this.id, ...payload });
	}
}
