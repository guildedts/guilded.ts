import { BaseManager, FetchManyOptions } from '../BaseManager';
import { ServerRole } from '../../structures/server/ServerRole';
import { Server } from '../../structures/server/Server';
import { ServerMemberRole } from '../../structures/server/ServerMemberRole';
import { Collection } from '@discordjs/collection';
import { ServerMember } from '../../structures/server/ServerMember';

/**
 * A manager of roles that belong to a server.
 * @example new ServerRoleManager(server);
 */
export class ServerRoleManager extends BaseManager<number, ServerRole> {
	/** @param server The server the roles belong to. */
	constructor(public readonly server: Server) {
		super(server.client, server.client.options.maxServerRoleCache);
	}

	/**
	 * Fetch roles that belong to a member.
	 * @param member The member the roles belong to.
	 * @param options The options to fetch the roles with.
	 * @returns The fetched roles that belong to the member.
	 * @example roles.fetch(member);
	 */
	async fetch(member: string | ServerMember, options?: FetchServerRolesOptions) {
		member = member instanceof ServerMember ? member.id : member;
		const raw = await this.client.api.serverMembers.fetchRoles(this.server.id, member);
		const roles = new Collection<number, ServerRole>();
		const cachedMember = this.server.members.cache.get(member);
		for (const roleId of raw) {
			const role = new ServerRole(this.server, { id: roleId }, options?.cache);
			if (cachedMember)
				new ServerMemberRole(cachedMember, { id: roleId }, options?.cacheMemberRoles);
			roles.set(roleId, role);
		}
		return roles;
	}

	/**
	 * Assign a role to a member.
	 * @param member The member the role belongs to.
	 * @param role The role to add to the member.
	 * @returns The role that was added to the member.
	 * @example roles.assign(member, role);
	 */
	async assign(member: string | ServerMember, role: number | ServerRole) {
		member = member instanceof ServerMember ? member.id : member;
		role = role instanceof ServerRole ? role.id : role;
		await this.client.api.serverMembers.addRole(this.server.id, member, role);
		return new ServerRole(this.server, { id: role });
	}

	/**
	 * Unassign a role from a member.
	 * @param member The member the role belongs to.
	 * @param role The role to remove from the member.
	 * @returns The role that was removed from the member.
	 * @example roles.unassign(member, role);
	 */
	async unassign(member: string | ServerMember, role: number | ServerRole) {
		member = member instanceof ServerMember ? member.id : member;
		role = role instanceof ServerRole ? role.id : role;
		await this.client.api.serverMembers.removeRole(this.server.id, member, role);
		return new ServerRole(this.server, { id: role });
	}

	/**
	 * Award XP to a role.
	 * @param role The role to award XP to.
	 * @param amount The amount of XP to award to the role.
	 * @example roles.awardXp(role, 100);
	 */
	awardXp(role: number | ServerRole, amount: number) {
		role = role instanceof ServerRole ? role.id : role;
		return this.client.api.serverRoles.awardXp(this.server.id, role, amount);
	}
}

/** The options for fetching server roles. */
export interface FetchServerRolesOptions extends FetchManyOptions {
	/** Whether to cache the fetched member roles. */
	cacheMemberRoles?: boolean;
}
