import { BaseManager } from '../BaseManager';
import { ServerMember } from '../../structures/server/ServerMember';
import { ServerMemberRole } from '../../structures/server/ServerMemberRole';

/** The manager of roles that belong to a server member. */
export class ServerMemberRoleManager extends BaseManager<number, ServerMemberRole> {
	/** @param member The server member the roles belong to. */
	constructor(public readonly member: ServerMember) {
		super(member.client, member.client.options.maxServerMemberRoleCache);
	}

	/**
	 * Fetch roles that belong to the member.
	 * @param cache Whether to cache the fetched roles.
	 * @returns The fetched roles that belong to the member.
	 */
	public fetch(cache?: boolean) {
		return this.member.server.roles.fetch(this.member.id, cache);
	}

	/**
	 * Assign a role to the member.
	 * @param roleId The ID of the role to add to the member.
	 * @returns The role that was added to the member.
	 */
	public assign(roleId: number) {
		return this.member.server.roles.assign(this.member.id, roleId);
	}

	/**
	 * Unassign a role from the member.
	 * @param roleId The ID of the role to remove from the member.
	 * @returns The role that was removed from the member.
	 */
	public unassign(roleId: number) {
		return this.member.server.roles.unassign(this.member.id, roleId);
	}
}
