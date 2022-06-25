import { Base } from './Base';
import { Client } from './Client';
import { GroupMemberManager } from '../managers/group/GroupMemberManager';
import { FetchOptions } from '../managers/BaseManager';
import { ServerMember } from './server/ServerMember';
import { APIChannelPayload } from 'guilded-api-typings';

/** Represents a group on Guilded. */
export class Group extends Base {
	/** The manager of members that belong to the group. */
	public readonly members: GroupMemberManager;

	/**
	 * @param client The client the group belongs to.
	 * @param raw The raw data of the group.
	 * @param cache Whether to cache the group.
	 */
	public constructor(
		client: Client,
		public readonly raw: { id: string },
		cache = client.options.cacheGroups ?? true,
	) {
		super(client, raw.id);
		this.members = new GroupMemberManager(this);
		if (cache) client.groups.cache.set(this.id, this);
	}

	/** Whether the group is cached. */
	public get isCached() {
		return this.client.groups.cache.has(this.id);
	}

	/**
	 * Fetch the group.
	 * @param options The options to fetch the group with.
	 * @returns The fetched group.
	 */
	public fetch(options?: FetchOptions) {
		return this.client.groups.fetch(this, options) as this;
	}

	/**
	 * Add a member to the group.
	 * @param member The member to add.
	 */
	public addMember(member: string | ServerMember) {
		return this.members.add(member);
	}

	/**
	 * Remove a member from the group.
	 * @param member The member to remove.
	 */
	public removeMember(member: string | ServerMember) {
		return this.members.remove(member);
	}

	/**
	 * Create a channel in the group.
	 * @param payload The payload of the channel.
	 * @returns The created channel.
	 */
	public createChannel(payload: Omit<APIChannelPayload, 'groupId'>) {
		return this.client.channels.create({ groupId: this.id, ...payload });
	}
}
