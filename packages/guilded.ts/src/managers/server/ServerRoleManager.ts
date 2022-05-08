import { Routes } from 'guilded-api-typings';
import { BaseManager } from '..';
import { ServerRole, Server, CacheCollection, ServerMemberRole } from '../../structures';

/** A manager of roles that belong to a server. */
export class ServerRoleManager extends BaseManager<number, ServerRole> {
	/** @param server The server that owns the roles. */
	constructor(public readonly server: Server) {
		super(server.client, {
			caching: server.client.options.cacheServerRoles,
			maxCache: server.client.options.maxServerRoleCache,
		});
	}

	/**
	 * Fetch roles that belong to a user.
	 * @param userId The ID of the user to fetch roles for.
	 * @param cache Whether to cache the roles.
	 * @returns The roles that belong to the user.
	 */
	public async fetch(userId: string, cache = this.caching) {
		const response = await this.client.rest.get<{ roleIds: number[] }>(
			Routes.memberRoles(this.server.id, userId),
		);

		const roles = new CacheCollection<number, ServerRole>();
		const member = this.server.members.cache.get(userId);

		for (const roleId of response.roleIds) {
			const role = new ServerRole(this.server, roleId);
			if (cache) this.cache.set(roleId, role);
			if (member?.roles.caching)
				member.roles.cache.set(roleId, new ServerMemberRole(member, roleId));
			member?.roleIds.push(roleId);
			roles.set(roleId, role);
		}

		return roles;
	}

	/**
	 * Assign a role to a user.
	 * @param userId The ID of the user to add the role to.
	 * @param roleId The ID of the role to add.
	 * @param cache Whether to cache the role.
	 * @returns The role that was added.
	 */
	public async assign(userId: string, roleId: number, cache = this.caching) {
		await this.server.client.rest.put(Routes.memberRole(this.server.id, userId, roleId));

		const role = new ServerRole(this.server, roleId);
		const member = this.server.members.cache.get(userId);

		if (cache) this.cache.set(roleId, role);
		if (member?.roles.caching)
			member.roles.cache.set(roleId, new ServerMemberRole(member, roleId));
		member?.roleIds.push(roleId);

		return role;
	}

	/**
	 * Unassign a role from a user.
	 * @param userId The ID of the user to remove the role from.
	 * @param roleId The ID of the role to remove.
	 * @param cache Whether to cache the role.
	 * @returns The role that was removed.
	 */
	public async unassign(userId: string, roleId: number, cache = this.caching) {
		await this.server.client.rest.delete(Routes.memberRole(this.server.id, userId, roleId));

		const role = new ServerRole(this.server, roleId);
		const member = this.server.members.cache.get(userId);

		if (cache) this.cache.set(roleId, role);
		member?.roles.cache.delete(roleId);
		member?.roleIds.splice(member.roleIds.indexOf(roleId), 1);

		return role;
	}
}
