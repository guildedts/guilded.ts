import { BaseManager, FetchManyOptions } from '../BaseManager';
import { ServerRole } from '../../structures/server/ServerRole';
import { Server } from '../../structures/server/Server';
import { ServerMemberRole } from '../../structures/server/ServerMemberRole';
import { Collection } from '@discordjs/collection';
import { ServerMember } from '../../structures/server/ServerMember';

/**
 * A manager for server roles
 */
export class ServerRoleManager extends BaseManager<number, ServerRole> {
	/**
	 * @param server The server
	 */
	constructor(public readonly server: Server) {
		super(server.client, server.client.options.maxServerRoleCache);
	}

	/**
	 * Fetch roles that belong to a server member
	 * @param serverMember The server member
	 * @param options The options to fetch the server roles with
	 * @returns The fetched server member roles
	 */
	async fetch(serverMember: string | ServerMember, options?: ServerRoleFetchManyOptions) {
		serverMember = serverMember instanceof ServerMember ? serverMember.id : serverMember;
		const raw = await this.client.api.serverMembers.fetchRoles(this.server.id, serverMember);
		const roles = new Collection<number, ServerRole>();
		const cachedMember = this.server.members.cache.get(serverMember);
		for (const roleId of raw) {
			const role = new ServerRole(this.server, { id: roleId }, options?.cache);
			if (cachedMember)
				new ServerMemberRole(cachedMember, { id: roleId }, options?.cacheMemberRoles);
			roles.set(roleId, role);
		}
		return roles;
	}

	/**
	 * Assign a role to a server member
	 * @param serverMember The server member
	 * @param role The role
	 * @returns The added server member role
	 */
	async assign(serverMember: string | ServerMember, role: number | ServerRole) {
		serverMember = serverMember instanceof ServerMember ? serverMember.id : serverMember;
		role = role instanceof ServerRole ? role.id : role;
		await this.client.api.serverMembers.addRole(this.server.id, serverMember, role);
		return new ServerRole(this.server, { id: role });
	}

	/**
	 * Unassign a role from a server member
	 * @param serverMember The server member
	 * @param role The role
	 * @returns The removed server member role
	 */
	async unassign(serverMember: string | ServerMember, role: number | ServerRole) {
		serverMember = serverMember instanceof ServerMember ? serverMember.id : serverMember;
		role = role instanceof ServerRole ? role.id : role;
		await this.client.api.serverMembers.removeRole(this.server.id, serverMember, role);
		return new ServerRole(this.server, { id: role });
	}

	/**
	 * Award XP to a server role
	 * @param role The role
	 * @param amount The amount of XP to award to the server role
	 */
	awardXp(role: number | ServerRole, amount: number) {
		role = role instanceof ServerRole ? role.id : role;
		return this.client.api.serverRoles.awardXp(this.server.id, role, amount);
	}
}

/**
 * The options for fetching server roles
 */
export interface ServerRoleFetchManyOptions extends FetchManyOptions {
	/**
	 * Whether to cache the fetched server member roles
	 */
	cacheMemberRoles?: boolean;
}
