import { Base, Client } from '.';
import { GroupMemberManager } from '../managers';

/** Represents a group on Guilded. */
export class Group extends Base {
	/** A manager of members that belong to this group. */
	public readonly members: GroupMemberManager;

	/**
	 * @param client The client that owns this group.
	 * @param id The ID of the group.
	 */
	public constructor(client: Client, id: string) {
		super(client, id);

		this.members = new GroupMemberManager(this);
	}

	/** Whether this group is cached. */
	public get cached() {
		return this.client.groups.cache.has(this.id);
	}

	/**
	 * Add a member to the group.
	 * @param id The ID of the member.
	 */
	public addMember(id: string) {
		return this.members.add(id);
	}

	/**
	 * Remove a member from the group.
	 * @param id The ID of the member.
	 */
	public removeMember(id: string) {
		return this.members.remove(id);
	}
}
