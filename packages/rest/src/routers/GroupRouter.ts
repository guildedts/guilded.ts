import { Routes } from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/**
 * The group router for the Guilded REST API
 */
export class GroupRouter extends BaseRouter {
	/**
	 * Add a member to a group on Guilded
	 * @param groupId The ID of the group
	 * @param userId The ID of the user
	 */
	addMember(groupId: string, userId: string) {
		return this.rest.put<void>(Routes.groupMember(groupId, userId));
	}

	/**
	 * Remove a member from a group on Guilded
	 * @param groupId The ID of the group
	 * @param userId The ID of the user
	 */
	removeMember(groupId: string, userId: string) {
		return this.rest.delete<void>(Routes.groupMember(groupId, userId));
	}
}
