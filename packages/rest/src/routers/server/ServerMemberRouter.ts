import { APIServerMember, APISocialLink, Routes } from 'guilded-api-typings';
import { BaseRouter } from '../BaseRouter';

/** The server member router for the Guilded REST API. */
export class ServerMemberRouter extends BaseRouter {
	/** @ignore */
	public fetch(serverId: string, memberId?: string) {
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
	 * Set the nickname of a server member.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to edit.
	 * @param nickname The nickname to set.
	 * @returns The nickname that was set.
	 */
	public async setNickname(serverId: string, memberId: string, nickname: string) {
		await this.rest.put(Routes.serverMemberNickname(serverId, memberId), { nickname });
		return nickname;
	}

	/**
	 * Remove the nickname of a server member.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to edit.
	 */
	public removeNickname(serverId: string, memberId: string) {
		return this.rest.delete<void>(Routes.serverMemberNickname(serverId, memberId));
	}

	/**
	 * Kick a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to kick.
	 */
	public kick(serverId: string, memberId: string) {
		return this.rest.delete<void>(Routes.serverMember(serverId, memberId));
	}

	/**
	 * Award XP to a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to award XP to.
	 * @param amount The amount of XP to award to the server member.
	 * @returns The total amount of XP the server member has.
	 */
	public async awardXP(serverId: string, memberId: string, amount: number) {
		const { total } = await this.rest.post<{ total: number }, { amount: number }>(
			Routes.serverMemberXP(serverId, memberId),
			{ amount },
		);
		return total;
	}

	/**
	 * Fetch a social link for a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to fetch the social link for.
	 * @param type The type of social link to fetch.
	 * @returns The fetched social link.
	 */
	public async fetchSocialLink(serverId: string, memberId: string, type: string) {
		const { socialLink } = await this.rest.get<{ socialLink: APISocialLink }>(
			Routes.socialLink(serverId, memberId, type),
		);
		return socialLink;
	}

	/**
	 * Fetch a list of roles that a server member has on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to fetch the roles for.
	 * @returns The IDs of roles that the server member has.
	 */
	public async fetchRoles(serverId: string, memberId: string) {
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
	 */
	public addRole(serverId: string, memberId: string, roleId: number) {
		return this.rest.put<void>(Routes.serverMemberRole(serverId, memberId, roleId));
	}

	/**
	 * Remove a role from a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to remove the role from.
	 * @param roleId The ID of the role to remove from the server member.
	 */
	public removeRole(serverId: string, memberId: string, roleId: number) {
		return this.rest.delete<void>(Routes.serverMemberRole(serverId, memberId, roleId));
	}
}

export declare interface ServerMemberRouter {
	/**
	 * Fetch a server member from Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to fetch.
	 * @returns The fetched server member.
	 */
	fetch(serverId: string, memberId: string): Promise<APIServerMember>;

	/**
	 * Fetch server members from Guilded.
	 * @param serverId The ID of the server the members belong to.
	 * @returns The fetched server members.
	 */
	fetch(serverId: string): Promise<APIServerMember[]>;
}
