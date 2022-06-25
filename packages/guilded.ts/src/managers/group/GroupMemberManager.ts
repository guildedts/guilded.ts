import { BaseManager } from '../BaseManager';
import { Group } from '../../structures/Group';
import { ServerMember } from '../../structures/server/ServerMember';

/** The manager of members that belong to a group. */
export class GroupMemberManager extends BaseManager {
	/** @param group The group the members belong to. */
	public constructor(public readonly group: Group) {
		super(group.client);
	}

	/**
	 * Add a member to the group.
	 * @param member The member to add.
	 */
	public add(member: string | ServerMember) {
		member = member instanceof ServerMember ? member.id : member;
		return this.client.api.groups.addMember(this.group.id, member);
	}

	/**
	 * Remove a member from the group.
	 * @param member The member to remove.
	 */
	public remove(member: string | ServerMember) {
		member = member instanceof ServerMember ? member.id : member;
		return this.client.api.groups.removeMember(this.group.id, member);
	}
}
