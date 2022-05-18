import {
	APIServerMember,
	APIServerMemberNicknamePayload,
	APIServerMemberSummary,
	APIServerXPPayload,
	Routes,
} from 'guilded-api-typings';
import { BaseManager } from '../BaseManager';
import { CacheCollection } from '../../structures/CacheCollection';
import { Server } from '../../structures/server/Server';
import { ServerMember } from '../../structures/server/ServerMember';

/** A manager of members that belong to a server. */
export class ServerMemberManager extends BaseManager<string, ServerMember> {
	/** @param server The server the members belongs to. */
	public constructor(public readonly server: Server) {
		super(server.client, server.client.options.maxServerMemberCache);
	}

	/** @ignore */
	public async fetch(
		arg1: string | boolean = this.client.options.cacheServerMembers ?? true,
		arg2 = this.client.options.cacheServerMembers ?? true,
	) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(memberId: string, cache: boolean) {
		let member = this.cache.get(memberId);
		if (member) return member;
		const response = await this.client.rest.get<{ member: APIServerMember }>(
			Routes.serverMember(this.server.id, memberId),
		);
		member = new ServerMember(this.server, response.member);
		if (this.client.options.cacheUsers ?? true)
			this.client.users.cache.set(member.id, member.user);
		if (cache) this.cache.set(memberId, member);
		return member;
	}

	/** @ignore */
	private async fetchMany(cache: boolean) {
		const response = await this.client.rest.get<{ members: APIServerMemberSummary[] }>(
			Routes.serverMembers(this.server.id),
		);
		const members = new CacheCollection<string, ServerMember>();
		for (const data of response.members) {
			const member = new ServerMember(this.server, data);
			members.set(member.user.id, member);
			if (this.client.options.cacheUsers ?? true)
				this.client.users.cache.set(member.id, member.user);
			if (cache) this.cache.set(member.id, member);
		}
		return members;
	}

	/**
	 * Set a member's nickname.
	 * @param memberId The ID of the member to set the nickname for.
	 * @param nickname The nickname to set.
	 */
	public async setNickname(memberId: string, nickname: string) {
		await this.client.rest.put<{ nickname: string }, APIServerMemberNicknamePayload>(
			Routes.serverMemberNickname(this.server.id, memberId),
			{ nickname },
		);
		return nickname;
	}

	/**
	 * Remove a member's nickname.
	 * @param memberId The ID of the member to remove the nickname from.
	 */
	public async removeNickname(memberId: string) {
		await this.client.rest.delete<{ nickname: string }>(
			Routes.serverMemberNickname(this.server.id, memberId),
		);
	}

	/**
	 * Kick a member from the server.
	 * @param memberId The ID of the member to kick.
	 */
	public async kick(memberId: string) {
		await this.client.rest.delete(Routes.serverMember(this.server.id, memberId));
	}

	/**
	 * Ban a member from the server.
	 * @param memberId The ID of the member to ban.
	 * @param reason The reason for the ban.
	 * @returns The created ban.
	 */
	public ban(memberId: string, reason?: string) {
		return this.server.bans.create(memberId, reason);
	}

	/**
	 * Unban a member from the server.
	 * @param userId The ID of the user to unban
	 */
	public async unban(userId: string) {
		await this.server.bans.remove(userId);
	}

	/**
	 * Award XP to a member.
	 * @param memberId The ID of the member to award XP to.
	 * @param amount The amount of XP to award the member.
	 * @returns The total amount of XP the member has.
	 */
	public async awardXP(memberId: string, amount: number) {
		const { total } = await this.client.rest.post<{ total: number }, APIServerXPPayload>(
			Routes.serverMemberXP(this.server.id, memberId),
			{ amount },
		);
		return total;
	}
}

export declare interface ServerMemberManager {
	/**
	 * Fetch a single member from the server, or cache.
	 * @param memberId The ID of the member to fetch.
	 * @param cache Whether to cache the fetched member.
	 * @returns The fetched member.
	 */
	fetch(memberId: string, cache?: boolean): Promise<ServerMember>;

	/**
	 * Fetch multiple members from the server.
	 * @param cache Whether to cache the fetched members.
	 * @returns The fetched members.
	 */
	fetch(cache?: boolean): Promise<CacheCollection<string, ServerMember>>;
}
