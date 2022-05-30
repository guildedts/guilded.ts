import { BaseManager } from '../BaseManager';
import { Group } from '../../structures/Group';

/** A manager of members that belong to a group. */
export class GroupMemberManager extends BaseManager<void, void> {
	/** @param group The group that owns the members. */
	public constructor(public readonly group: Group) {
		super(group.client);
	}

	/**
	 * Add a member to the group.
	 * @param memberId The ID of the member to add.
	 */
	public add(memberId: string) {
		return this.client.api.groups.addMember(this.group.id, memberId);
	}

	/**
	 * Remove a member from the group.
	 * @param memberId The ID of the member to remove.
	 */
	public remove(memberId: string) {
		return this.client.api.groups.removeMember(this.group.id, memberId);
	}
}
