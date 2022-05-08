import { BaseManager } from '..';
import { ServerMember, ServerMemberRole } from '../../structures';

/** A manager of roles that belong to a server member. */
export class ServerMemberRoleManager extends BaseManager<number, ServerMemberRole> {
	/** @param member The member that owns the roles. */
	constructor(public readonly member: ServerMember) {
		super(member.client, {
			caching: member.client.options.cacheServerMemberRoles,
			maxCache: member.client.options.maxServerMemberRoleCache,
		});
	}

	/**
	 * Fetch roles that belong to the member.
	 * @param cache Whether to cache the roles.
	 * @returns The roles that belong to the member.
	 */
	public fetch(cache = this.caching) {
		return this.member.server.roles.fetch(this.member.id, cache);
	}

	/**
	 * Assign a role to the member.
	 * @param roleId The ID of the role to add.
	 * @returns The role that was added.
	 */
	public assign(roleId: number) {
		return this.member.server.roles.assign(this.member.id, roleId);
	}

	/**
	 * Unassign a role from the member.
	 * @param roleId The ID of the role to remove.
	 * @returns The role that was removed.
	 */
	public unassign(roleId: number) {
		return this.member.server.roles.unassign(this.member.id, roleId);
	}
}
