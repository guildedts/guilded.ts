import {
	APIServerMember,
	RESTPutServerMemberXpJSONBody,
	RESTPostServerMemberXpJSONBody,
	APISocialLink,
	Routes,
} from 'guilded-api-typings';
import { BaseRouter } from '../BaseRouter';

/**
 * The server member router for the Guilded REST API
 */
export class ServerMemberRouter extends BaseRouter {
	/**
	 * Fetch a server member from Guilded
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 * @returns The fetched server member
	 */
	fetch(serverId: string, userId: string): Promise<APIServerMember>;
	/**
	 * Fetch server members from Guilded
	 * @param serverId The ID of the server
	 * @returns The fetched server members
	 */
	fetch(serverId: string): Promise<APIServerMember[]>;
	fetch(serverId: string, userId?: string) {
		if (userId) return this.fetchSingle(serverId, userId);
		return this.fetchMany(serverId);
	}

	private async fetchSingle(serverId: string, userId: string) {
		const { member } = await this.rest.get<{ member: APIServerMember }>(
			Routes.serverMember(serverId, userId),
		);
		return member;
	}

	private async fetchMany(serverId: string) {
		const { members } = await this.rest.get<{ members: APIServerMember[] }>(
			Routes.serverMembers(serverId),
		);
		return members;
	}

	/**
	 * Set the nickname of a server member on Guilded
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 * @param nickname The nickname of the server member
	 * @returns The nickname that was set
	 */
	async setNickname(serverId: string, userId: string, nickname: string) {
		await this.rest.put(Routes.serverMemberNickname(serverId, userId), { nickname });
		return nickname;
	}

	/**
	 * Remove the nickname of a server member on Guilded
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 */
	removeNickname(serverId: string, userId: string) {
		return this.rest.delete<void>(Routes.serverMemberNickname(serverId, userId));
	}

	/**
	 * Kick a server member on Guilded
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 */
	kick(serverId: string, userId: string) {
		return this.rest.delete<void>(Routes.serverMember(serverId, userId));
	}

	/**
	 * Award XP to a server member on Guilded
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 * @param amount The amount of XP to award to the server member
	 * @returns The total amount of XP the server member has
	 */
	async awardXp(serverId: string, userId: string, amount: number) {
		const { total } = await this.rest.post<{ total: number }, RESTPostServerMemberXpJSONBody>(
			Routes.serverMemberXp(serverId, userId),
			{ amount },
		);
		return total;
	}

	/**
	 * Set XP of a server member on Guilded
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 * @param amount The total XP of the server member
	 * @returns The total amount of XP the server member has
	 */
	async setXp(serverId: string, userId: string, amount: number) {
		const { total } = await this.rest.put<{ total: number }, RESTPutServerMemberXpJSONBody>(
			Routes.serverMemberXp(serverId, userId),
			{ total: amount },
		);
		return total;
	}

	/**
	 * Fetch a social link for a server member on Guilded
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 * @param type The type of social link
	 * @returns The fetched social link
	 */
	async fetchSocialLink(serverId: string, userId: string, type: string) {
		const { socialLink } = await this.rest.get<{ socialLink: APISocialLink }>(
			Routes.serverMemberSocialLink(serverId, userId, type),
		);
		return socialLink;
	}

	/**
	 * Fetch server member roles on Guilded
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 * @returns The IDs of roles the server member has
	 */
	async fetchRoles(serverId: string, userId: string) {
		const { roleIds } = await this.rest.get<{ roleIds: number[] }>(
			Routes.serverMemberRoles(serverId, userId),
		);
		return roleIds;
	}

	/**
	 * Add a role to a server member on Guilded
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 * @param roleId The ID of the role
	 */
	addRole(serverId: string, userId: string, roleId: number) {
		return this.rest.put<void>(Routes.serverMemberRole(serverId, userId, roleId));
	}

	/**
	 * Remove a role from a server member on Guilded
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 * @param roleId The ID of the role
	 */
	removeRole(serverId: string, userId: string, roleId: number) {
		return this.rest.delete<void>(Routes.serverMemberRole(serverId, userId, roleId));
	}
}
