import { BaseManager } from '../BaseManager';
import { CacheCollection } from '../../structures/CacheCollection';
import { Server } from '../../structures/server/Server';
import { ServerMember } from '../../structures/server/ServerMember';

/** The manager of members that belong to a server. */
export class ServerMemberManager extends BaseManager<string, ServerMember> {
	/** @param server The server the members belongs to. */
	public constructor(public readonly server: Server) {
		super(server.client, server.client.options.maxServerMemberCache);
	}

	/**
	 * Fetch a member from the server, or cache.
	 * @param memberId The ID of the member to fetch.
	 * @param cache Whether to cache the fetched member.
	 * @returns The fetched member.
	 */
	public fetch(memberId: string, cache?: boolean): Promise<ServerMember>;
	/**
	 * Fetch members from the server.
	 * @param cache Whether to cache the fetched members.
	 * @returns The fetched members.
	 */
	public fetch(cache?: boolean): Promise<CacheCollection<string, ServerMember>>;
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
		const raw = await this.client.api.serverMembers.fetch(this.server.id, memberId);
		member = new ServerMember(this.server, raw);
		if (this.client.options.cacheUsers ?? true)
			this.client.users.cache.set(memberId, member.user);
		if (cache) this.cache.set(memberId, member);
		return member;
	}

	/** @ignore */
	private async fetchMany(cache: boolean) {
		const raw = await this.client.api.serverMembers.fetch(this.server.id);
		const members = new CacheCollection<string, ServerMember>();
		for (const data of raw) {
			const member = new ServerMember(this.server, data);
			members.set(member.id, member);
			if (this.client.options.cacheUsers ?? true)
				this.client.users.cache.set(member.id, member.user);
			if (cache) this.cache.set(member.id, member);
		}
		return members;
	}

	/**
	 * Set the nickname of a member in the server.
	 * @param memberId The ID of the member to edit.
	 * @param nickname The nickname of the member.
	 * @returns The nickname of the member.
	 */
	public setNickname(memberId: string, nickname: string) {
		return this.client.api.serverMembers.setNickname(this.server.id, memberId, nickname);
	}

	/**
	 * Remove the nickname of a member in the server.
	 * @param memberId The ID of the member to edit.
	 */
	public removeNickname(memberId: string) {
		return this.client.api.serverMembers.removeNickname(this.server.id, memberId);
	}

	/**
	 * Kick a member from the server.
	 * @param memberId The ID of the member to kick.
	 */
	public kick(memberId: string) {
		return this.client.api.serverMembers.kick(this.server.id, memberId);
	}

	/**
	 * Ban a member from the server.
	 * @param memberId The ID of the member to ban.
	 * @param reason The reason of the ban.
	 * @returns The created ban.
	 */
	public ban(memberId: string, reason?: string) {
		return this.server.bans.create(memberId, reason);
	}

	/**
	 * Unban a member from the server.
	 * @param memberId The ID of the member to unban.
	 */
	public async unban(memberId: string) {
		await this.server.bans.remove(memberId);
	}

	/**
	 * Award XP to a member in the server.
	 * @param memberId The ID of the member to award XP to.
	 * @param amount The amount of XP to award to the member.
	 * @returns The total amount of XP the member has.
	 */
	public awardXp(memberId: string, amount: number) {
		return this.client.api.serverMembers.awardXp(this.server.id, memberId, amount);
	}
}
