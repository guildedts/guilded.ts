import { APIServerMember, APIServerMemberSummary, Routes } from 'guilded-api-typings';
import { BaseManager } from '..';
import { CacheCollection, Server, ServerMember } from '../../structures';

/** A manager of members that belong to a server. */
export class ServerMemberManager extends BaseManager<string, ServerMember> {
	/** @param server The server the members belongs to. */
	public constructor(public readonly server: Server) {
		super(server.client, {
			caching: server.client.options.cacheServerMembers,
			maxCache: server.client.options.maxServerMemberCache,
		});
	}

	/** @ignore */
	public async fetch(arg1: string | boolean = this.caching, arg2 = this.caching) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);

		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(memberId: string, cache = this.caching) {
		let member = this.cache.get(memberId);
		if (member) return member;

		const response = await this.client.rest.get<{ member: APIServerMember }>(
			Routes.serverMember(this.server.id, memberId),
		);

		member = new ServerMember(this.server, response.member);

		if (this.client.users.caching) this.client.users.cache.set(member.id, member.user);
		if (cache) this.cache.set(memberId, member);

		return member;
	}

	/** @ignore */
	private async fetchMany(cache = this.caching) {
		const response = await this.client.rest.get<{ members: APIServerMemberSummary[] }>(
			Routes.serverMembers(this.server.id),
		);

		const members = new CacheCollection<string, ServerMember>();

		for (const data of response.members) {
			const member = new ServerMember(this.server, data);

			members.set(member.user.id, member);

			if (this.client.users.caching) this.client.users.cache.set(member.id, member.user);
			if (cache) this.cache.set(member.id, member);
		}

		return members;
	}

	/**
	 * Set a member's nickname.
	 * @param memberId The ID of the member.
	 * @param nickname The nickname to set.
	 * @returns The updated member.
	 */
	public async setNickname(memberId: string, nickname: string) {
		await this.client.rest.put<{ nickname: string }, { nickname: string }>(
			Routes.userNickname(this.server.id, memberId),
			{ nickname },
		);

		const member = await this.fetch(memberId);

		member.nickname = nickname;

		return member;
	}

	/**
	 * Remove a member's nickname.
	 * @param memberId The ID of the member.
	 * @returns The updated member.
	 */
	public async removeNickname(memberId: string) {
		await this.client.rest.delete<{ nickname: string }>(
			Routes.userNickname(this.server.id, memberId),
		);

		const member = await this.fetch(memberId);

		member.nickname = undefined;

		return member;
	}

	/**
	 * Kick a member from this server.
	 * @param memberId The ID of the member.
	 * @returns The kicked member if cached.
	 */
	public async kick(memberId: string) {
		await this.client.rest.delete(Routes.serverMember(this.server.id, memberId));

		const member = this.cache.get(memberId);

		if (member) this.cache.delete(memberId);

		return member;
	}

	/**
	 * Ban a member from this server.
	 * @param memberId The ID of the member.
	 * @param reason The reason for the ban.
	 * @returns The server ban.
	 */
	public async ban(memberId: string, reason?: string) {
		return this.server.bans.create(memberId, reason);
	}

	/**
	 * Unban a member from this server.
	 * @param memberId The ID of the member.
	 */
	public async unban(memberId: string) {
		await this.server.bans.remove(memberId);
	}

	/**
	 * Award XP to a member.
	 * @param memberId The ID of the member.
	 * @param amount The amount of XP to award.
	 * @returns The total amount of XP the member has.
	 */
	public async awardXP(memberId: string, amount: number) {
		const { total } = await this.client.rest.post<{ total: number }, { amount: number }>(
			Routes.memberXP(this.server.id, memberId),
			{ amount },
		);

		return total;
	}
}

export declare interface ServerMemberManager {
	/**
	 * Fetch a single member from this server, or cache if it's already cached.
	 * @param memberId The ID of the server member.
	 * @param cache Whether to cache the server member.
	 * @returns The server member.
	 */
	fetch(memberId: string, cache?: boolean): Promise<ServerMember>;

	/**
	 * Fetch multiple members from this server.
	 * @param cache Whether to cache the members.
	 * @returns The members.
	 */
	fetch(cache?: boolean): Promise<CacheCollection<string, ServerMember>>;
}
