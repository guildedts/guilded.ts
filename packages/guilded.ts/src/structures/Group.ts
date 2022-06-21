import { Base } from './Base';
import { Client } from './Client';
import { GroupMemberManager } from '../managers/group/GroupMemberManager';

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
	 * @param cache Whether to cache the fetched group.
	 * @returns The fetched group.
	 */
	public fetch(cache?: boolean) {
		this.client.groups.cache.delete(this.id);
		return this.client.groups.fetch(this.id, cache) as this;
	}

	/**
	 * Add a member to the group.
	 * @param memberID The ID of the member to add.
	 */
	public addMember(memberID: string) {
		return this.members.add(memberID);
	}

	/**
	 * Remove a member from the group.
	 * @param memberId The ID of the member to remove.
	 */
	public removeMember(memberId: string) {
		return this.members.remove(memberId);
	}
}
