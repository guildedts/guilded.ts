import {
	APIServerMember,
	RESTPutServerMemberXpJSONBody,
	RESTPostServerMemberXpJSONBody,
	APISocialLink,
	Routes,
} from 'guilded-api-typings';
import { BaseRouter } from '../BaseRouter';

/**
 * The server member router for the Guilded REST API.
 * @example new ServerMemberRouter(rest);
 */
export class ServerMemberRouter extends BaseRouter {
	/**
	 * Fetch a server member from Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to fetch.
	 * @returns The fetched server member.
	 * @example serverMembers.fetch('abc', 'abc');
	 */
	fetch(serverId: string, memberId: string): Promise<APIServerMember>;
	/**
	 * Fetch server members from Guilded.
	 * @param serverId The ID of the server the members belong to.
	 * @returns The fetched server members.
	 * @example serverMembers.fetch('abc');
	 */
	fetch(serverId: string): Promise<APIServerMember[]>;
	/** @ignore */
	fetch(serverId: string, memberId?: string) {
		if (memberId) return this.fetchSingle(serverId, memberId);
		return this.fetchMany(serverId);
	}

	/** @ignore */
	private async fetchSingle(serverId: string, memberId: string) {
		const { member } = await this.rest.get<{ member: APIServerMember }>(
			Routes.serverMember(serverId, memberId),
		);
		return member;
	}

	/** @ignore */
	private async fetchMany(serverId: string) {
		const { members } = await this.rest.get<{ members: APIServerMember[] }>(
			Routes.serverMembers(serverId),
		);
		return members;
	}

	/**
	 * Set the nickname of a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to edit.
	 * @param nickname The nickname of the server member.
	 * @returns The nickname that was set.
	 * @example serverMembers.setNickname('abc', 'abc', 'nickname');
	 */
	async setNickname(serverId: string, memberId: string, nickname: string) {
		await this.rest.put(Routes.serverMemberNickname(serverId, memberId), { nickname });
		return nickname;
	}

	/**
	 * Remove the nickname of a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to edit.
	 * @example serverMembers.removeNickname('abc', 'abc');
	 */
	removeNickname(serverId: string, memberId: string) {
		return this.rest.delete<void>(Routes.serverMemberNickname(serverId, memberId));
	}

	/**
	 * Kick a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to kick.
	 * @example serverMembers.kick('abc', 'abc');
	 */
	kick(serverId: string, memberId: string) {
		return this.rest.delete<void>(Routes.serverMember(serverId, memberId));
	}

	/**
	 * Award XP to a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to award XP to.
	 * @param amount The amount of XP to award to the server member.
	 * @returns The total amount of XP the server member has.
	 * @example serverMembers.awardXp('abc', 'abc', 100);
	 */
	async awardXp(serverId: string, memberId: string, amount: number) {
		const { total } = await this.rest.post<{ total: number }, RESTPostServerMemberXpJSONBody>(
			Routes.serverMemberXp(serverId, memberId),
			{ amount },
		);
		return total;
	}

	/**
	 * Set XP of a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to set XP for.
	 * @param amount The total XP of the server member.
	 * @returns The total amount of XP the server member has.
	 * @example serverMembers.setXp('abc', 'abc', 100);
	 */
	async setXp(serverId: string, memberId: string, amount: number) {
		const { total } = await this.rest.put<{ total: number }, RESTPutServerMemberXpJSONBody>(
			Routes.serverMemberXp(serverId, memberId),
			{ total: amount },
		);
		return total;
	}

	/**
	 * Fetch a social link for a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to fetch the social link for.
	 * @param type The type of social link to fetch.
	 * @returns The fetched social link.
	 * @example serverMembers.fetchSocialLink('abc', 'abc', 'youtube');
	 */
	async fetchSocialLink(serverId: string, memberId: string, type: string) {
		const { socialLink } = await this.rest.get<{ socialLink: APISocialLink }>(
			Routes.serverMemberSocialLink(serverId, memberId, type),
		);
		return socialLink;
	}

	/**
	 * Fetch a list of roles that a server member has on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to fetch the roles for.
	 * @returns The IDs of roles the server member has.
	 * @example serverMembers.fetchRoles('abc', 'abc');
	 */
	async fetchRoles(serverId: string, memberId: string) {
		const { roleIds } = await this.rest.get<{ roleIds: number[] }>(
			Routes.serverMemberRoles(serverId, memberId),
		);
		return roleIds;
	}

	/**
	 * Add a role to a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to add the role to.
	 * @param roleId The ID of the role to add to the server member.
	 * @example serverMembers.addRole('abc', 'abc', 123);
	 */
	addRole(serverId: string, memberId: string, roleId: number) {
		return this.rest.put<void>(Routes.serverMemberRole(serverId, memberId, roleId));
	}

	/**
	 * Remove a role from a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to remove the role from.
	 * @param roleId The ID of the role to remove from the server member.
	 * @example serverMembers.removeRole('abc', 'abc', 123);
	 */
	removeRole(serverId: string, memberId: string, roleId: number) {
		return this.rest.delete<void>(Routes.serverMemberRole(serverId, memberId, roleId));
	}
}
