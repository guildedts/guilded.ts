import { BaseManager } from '../BaseManager';
import { Group } from '../../structures/Group';
import { ServerMember } from '../../structures/server/ServerMember';

/**
 * The manager for group members
 */
export class GroupMemberManager extends BaseManager {
	/**
	 * @param group The group
	 */
	constructor(public readonly group: Group) {
		super(group.client);
	}

	/**
	 * Add a member to the group
	 * @param serverMember The server member
	 */
	add(serverMember: string | ServerMember) {
		serverMember = serverMember instanceof ServerMember ? serverMember.id : serverMember;
		return this.client.api.groups.addMember(this.group.id, serverMember);
	}

	/**
	 * Remove a member from the group
	 * @param serverMember The server member
	 */
	remove(serverMember: string | ServerMember) {
		serverMember = serverMember instanceof ServerMember ? serverMember.id : serverMember;
		return this.client.api.groups.removeMember(this.group.id, serverMember);
	}
}
