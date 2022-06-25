import { BaseManager, FetchManyOptions, FetchOptions } from '../BaseManager';
import { Server } from '../../structures/server/Server';
import { ServerMember } from '../../structures/server/ServerMember';
import Collection from '@discordjs/collection';

/** The manager of members that belong to a server. */
export class ServerMemberManager extends BaseManager<string, ServerMember> {
	/** @param server The server the members belongs to. */
	public constructor(public readonly server: Server) {
		super(server.client, server.client.options.maxServerMemberCache);
	}

	/**
	 * Fetch a member from the server, or cache.
	 * @param member The member to fetch.
	 * @param options The options to fetch the member with.
	 * @returns The fetched member.
	 */
	public fetch(member: string | ServerMember, options?: FetchOptions): Promise<ServerMember>;
	/**
	 * Fetch members from the server.
	 * @param options The options to fetch members with.
	 * @returns The fetched members.
	 */
	public fetch(options?: FetchManyOptions): Promise<Collection<string, ServerMember>>;
	/** @ignore */
	public async fetch(arg1?: string | ServerMember | FetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'string' || arg1 instanceof ServerMember)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(member: string | ServerMember, options?: FetchOptions) {
		member = member instanceof ServerMember ? member.id : member;
		const cached = this.cache.get(member);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.serverMembers.fetch(this.server.id, member);
		return new ServerMember(this.server, raw, options?.cache);
	}

	/** @ignore */
	private async fetchMany(options?: FetchManyOptions) {
		const raw = await this.client.api.serverMembers.fetch(this.server.id);
		const members = new Collection<string, ServerMember>();
		for (const data of raw) {
			const member = new ServerMember(this.server, data, options?.cache);
			members.set(member.id, member);
		}
		return members;
	}

	/**
	 * Fetch a social link from a member in the server.
	 * @param member The member to fetch the social link from.
	 * @param type The type of social link to fetch.
	 * @returns The fetched social link.
	 */
	public fetchSocialLink(member: string | ServerMember, type: string) {
		member = member instanceof ServerMember ? member.id : member;
		return this.client.api.serverMembers.fetchSocialLink(this.server.id, member, type);
	}

	/**
	 * Set the nickname of a member in the server.
	 * @param member The member to edit.
	 * @param nickname The nickname of the member.
	 * @returns The nickname of the member.
	 */
	public setNickname(member: string | ServerMember, nickname: string) {
		member = member instanceof ServerMember ? member.id : member;
		return this.client.api.serverMembers.setNickname(this.server.id, member, nickname);
	}

	/**
	 * Remove the nickname of a member in the server.
	 * @param member The member to edit.
	 */
	public removeNickname(member: string | ServerMember) {
		member = member instanceof ServerMember ? member.id : member;
		return this.client.api.serverMembers.removeNickname(this.server.id, member);
	}

	/**
	 * Kick a member from the server.
	 * @param member The member to kick.
	 */
	public kick(member: string | ServerMember) {
		member = member instanceof ServerMember ? member.id : member;
		return this.client.api.serverMembers.kick(this.server.id, member);
	}

	/**
	 * Ban a member from the server.
	 * @param member The member to ban.
	 * @param reason The reason of the ban.
	 * @returns The created ban.
	 */
	public ban(member: string | ServerMember, reason?: string) {
		return this.server.bans.create(member, reason);
	}

	/**
	 * Unban a member from the server.
	 * @param member The member to unban.
	 */
	public async unban(member: string | ServerMember) {
		member = member instanceof ServerMember ? member.id : member;
		await this.server.bans.remove(member);
	}

	/**
	 * Award XP to a member in the server.
	 * @param member The member to award XP to.
	 * @param amount The amount of XP to award to the member.
	 * @returns The total amount of XP the member has.
	 */
	public awardXp(member: string | ServerMember, amount: number) {
		member = member instanceof ServerMember ? member.id : member;
		return this.client.api.serverMembers.awardXp(this.server.id, member, amount);
	}
}
