import { APIServerMember, APIServerMemberSummary, Routes } from 'guilded-api-typings';
import { BaseManager, CacheCollection, Server, ServerMember, User } from '..';

/** A manager of members that belong to a server. */
export class ServerMemberManager extends BaseManager<string, ServerMember> {
	/** @param server The server the members belongs to. */
	public constructor(public readonly server: Server) {
		super(server.client, {
			cachingEnabled: server.client.options.cacheServerMembers,
			maxCache: server.client.options.maxServerMemberCache,
		});
	}

	/** @ignore */
	public async fetch(arg1?: string | boolean, arg2?: boolean) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);

		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(id: string, cache: boolean = this.cachingEnabled) {
		let member = this.cache.get(id);
		if (member) return member;

		const response = await this.client.rest.get<{ member: APIServerMember }>(
			Routes.serverMember(this.server.id, id),
		);

		const user = new User(this.client, response.member.user);

		member = new ServerMember(this.server, user, response.member);

		if (this.client.users.cachingEnabled) this.client.users.cache.set(user.id, user);
		if (cache) this.cache.set(id, member);

		return member;
	}

	/** @ignore */
	private async fetchMany(cache: boolean = this.cachingEnabled) {
		const response = await this.client.rest.get<{ members: APIServerMemberSummary[] }>(
			Routes.serverMembers(this.server.id),
		);

		const members = new CacheCollection<string, ServerMember>();

		for (const data of response.members) {
			const user = new User(this.client, data.user);
			const member = new ServerMember(this.server, user, data);

			members.set(member.user.id, member);

			if (this.client.users.cachingEnabled) this.client.users.cache.set(user.id, user);
			if (cache) this.cache.set(member.user.id, member);
		}

		return members;
	}

	/**
	 * Set a member's nickname.
	 * @param id The ID of the member.
	 * @param nickname The nickname to set.
	 * @returns The updated member.
	 */
	public async setNickname(id: string, nickname: string) {
		await this.client.rest.put<{ nickname: string }, { nickname: string }>(
			Routes.userNickname(this.server.id, id),
			{ nickname },
		);

		const member = (await this.fetch(id)) as ServerMember;

		if (member && !member.nickname) member.nickname = nickname;

		return member;
	}

	/**
	 * Remove a member's nickname.
	 * @param id The ID of the member.
	 * @returns The updated member.
	 */
	public async removeNickname(id: string) {
		await this.client.rest.delete<{ nickname: string }>(
			Routes.userNickname(this.server.id, id),
		);

		const member = (await this.fetch(id)) as ServerMember;

		if (member && member.nickname) member.nickname = undefined;

		return member;
	}

	/**
	 * Kick a member from this server.
	 * @param id The ID of the member.
	 * @returns The kicked member if cached.
	 */
	public async kick(id: string) {
		await this.client.rest.delete(Routes.serverMember(this.server.id, id));

		const member = this.cache.get(id);

		if (member) this.cache.delete(id);

		return member;
	}

	/**
	 * Ban a member from this server.
	 * @param id The ID of the member.
	 * @param reason The reason for the ban.
	 * @returns The server ban.
	 */
	public async ban(id: string, reason?: string) {
		return this.server.bans.create(id, reason);
	}

	/**
	 * Unban a member from this server.
	 * @param id The ID of the member.
	 */
	public async unban(id: string) {
		await this.server.bans.remove(id);
	}

	/**
	 * Award XP to a member.
	 * @param id The ID of the member.
	 * @param amount The amount of XP to award.
	 * @returns The total amount of XP the member has.
	 */
	public async awardXP(id: string, amount: number) {
		return (
			await this.client.rest.post<{ total: number }, { amount: number }>(
				Routes.memberXP(this.server.id, id),
				{ amount },
			)
		).total;
	}
}

export declare interface ServerMemberManager {
	/**
	 * Fetch a single member from this server, or cache if it's already cached.
	 * @param id The ID of the server member.
	 * @param cache Whether to cache the server member.
	 * @returns The server member.
	 */
	fetch(id: string, cache?: boolean): Promise<ServerMember>;

	/**
	 * Fetch multiple members from this server.
	 * @param cache Whether to cache the members.
	 * @returns The members.
	 */
	fetch(cache?: boolean): Promise<CacheCollection<string, ServerMember>>;
}
