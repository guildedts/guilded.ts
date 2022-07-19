import { Routes } from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/**
 * The group router for the Guilded REST API.
 * @example new GroupRouter(rest);
 */
export class GroupRouter extends BaseRouter {
	/**
	 * Add a member to a group on Guilded.
	 * @param groupId The ID of the group the member belongs to.
	 * @param memberId The ID of the member to add to the group.
	 * @example groups.addMember('abc', 'abc');
	 */
	addMember(groupId: string, memberId: string) {
		return this.rest.put<void>(Routes.groupMember(groupId, memberId));
	}

	/**
	 * Remove a member from a group on Guilded.
	 * @param groupId The ID of the group the member belongs to.
	 * @param memberId The ID of the member to remove from the group.
	 * @example groups.removeMember('abc', 'abc');
	 */
	removeMember(groupId: string, memberId: string) {
		return this.rest.delete<void>(Routes.groupMember(groupId, memberId));
	}
}
