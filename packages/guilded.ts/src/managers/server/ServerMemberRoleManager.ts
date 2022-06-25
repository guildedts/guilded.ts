import { BaseManager, FetchManyOptions } from '../BaseManager';
import { ServerMember } from '../../structures/server/ServerMember';
import { ServerMemberRole } from '../../structures/server/ServerMemberRole';
import { ServerRole } from '../../structures/server/ServerRole';

/** The manager of roles that belong to a server member. */
export class ServerMemberRoleManager extends BaseManager<number, ServerMemberRole> {
	/** @param member The server member the roles belong to. */
	constructor(public readonly member: ServerMember) {
		super(member.client, member.client.options.maxServerMemberRoleCache);
	}

	/**
	 * Fetch roles that belong to the member.
	 * @param options The options to fetch the roles with.
	 * @returns The fetched roles that belong to the member.
	 */
	public fetch(options?: FetchServerMemberRolesOptions) {
		return this.member.server.roles.fetch(this.member, {
			cache: options?.cacheServerRoles,
			cacheMemberRoles: options?.cache,
		});
	}

	/**
	 * Assign a role to the member.
	 * @param role The role to add to the member.
	 * @returns The role that was added to the member.
	 */
	public assign(role: number | ServerRole) {
		return this.member.server.roles.assign(this.member, role);
	}

	/**
	 * Unassign a role from the member.
	 * @param role The role to remove from the member.
	 * @returns The role that was removed from the member.
	 */
	public unassign(role: number | ServerRole) {
		return this.member.server.roles.unassign(this.member, role);
	}
}

/** The options for fetching server member roles. */
export interface FetchServerMemberRolesOptions extends FetchManyOptions {
	/** Whether to cache the fetched server roles. */
	cacheServerRoles?: boolean;
}
