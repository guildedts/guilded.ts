import { BaseManager } from '../BaseManager';
import { ServerRole } from '../../structures/server/ServerRole';
import { Server } from '../../structures/server/Server';
import { CacheCollection } from '../../structures/CacheCollection';
import { ServerMemberRole } from '../../structures/server/ServerMemberRole';

/** A manager of roles that belong to a server. */
export class ServerRoleManager extends BaseManager<number, ServerRole> {
	/** @param server The server the roles belong to. */
	constructor(public readonly server: Server) {
		super(server.client, server.client.options.maxServerRoleCache);
	}

	/**
	 * Fetch roles that belong to a member.
	 * @param memberId The ID of the member the roles belong to.
	 * @param cache Whether to cache the fetched roles.
	 * @returns The fetched roles that belong to the member.
	 */
	public async fetch(memberId: string, cache?: boolean) {
		const raw = await this.client.api.serverMembers.fetchRoles(this.server.id, memberId);
		const roles = new CacheCollection<number, ServerRole>();
		const member = this.server.members.cache.get(memberId);
		for (const roleId of raw) {
			const role = new ServerRole(this.server, { id: roleId }, cache);
			if(member) new ServerMemberRole(member, { id: roleId });
			roles.set(roleId, role);
		}
		return roles;
	}

	/**
	 * Assign a role to a member.
	 * @param memberId The ID of the member the role belongs to.
	 * @param roleId The ID of the role to add to the member.
	 * @returns The role that was added to the member.
	 */
	public async assign(memberId: string, roleId: number) {
		await this.client.api.serverMembers.addRole(this.server.id, memberId, roleId);
		return new ServerRole(this.server, { id: roleId });
	}

	/**
	 * Unassign a role from a member.
	 * @param userId The ID of the member the role belongs to.
	 * @param roleId The ID of the role to remove from the member.
	 * @returns The role that was removed from the member.
	 */
	public async unassign(userId: string, roleId: number) {
		await this.client.api.serverMembers.removeRole(this.server.id, userId, roleId);
		return new ServerRole(this.server, { id: roleId });
	}

	/**
	 * Award XP to a role.
	 * @param roleId The ID of the role to award XP to.
	 * @param amount The amount of XP to award to the role.
	 */
	public awardXp(roleId: number, amount: number) {
		return this.client.api.serverRoles.awardXp(this.server.id, roleId, amount);
	}
}
