import { BaseManager, FetchManyOptions, FetchOptions } from '../BaseManager';
import { Server } from '../../structures/server/Server';
import { ServerMember } from '../../structures/server/ServerMember';
import { Collection } from '@discordjs/collection';

/**
 * The manager for server members
 */
export class ServerMemberManager extends BaseManager<string, ServerMember> {
	/**
	 * @param server The server
	 */
	constructor(public readonly server: Server) {
		super(server.client, server.client.options.maxServerMemberCache);
	}

	/**
	 * Fetch a member from the server
	 * @param serverMember The server member
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	fetch(serverMember: string | ServerMember, options?: FetchOptions): Promise<ServerMember>;
	/**
	 * Fetch members from the server
	 * @param options The options to fetch server members with
	 * @returns The fetched server members
	 */
	fetch(options?: FetchManyOptions): Promise<Collection<string, ServerMember>>;
	fetch(arg1?: string | ServerMember | FetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'string' || arg1 instanceof ServerMember)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	private async fetchSingle(member: string | ServerMember, options?: FetchOptions) {
		member = member instanceof ServerMember ? member.user.id : member;
		const cached = this.cache.get(member);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.serverMembers.fetch(this.server.id, member);
		return new ServerMember(this.server, raw, options?.cache);
	}

	private async fetchMany(options?: FetchManyOptions) {
		const raw = await this.client.api.serverMembers.fetch(this.server.id);
		const members = new Collection<string, ServerMember>();
		for (const data of raw) {
			const member = new ServerMember(this.server, data, options?.cache);
			members.set(member.user.id, member);
		}
		return members;
	}

	/**
	 * Fetch a server member social link in the server
	 * @param serverMember The server member
	 * @param type The type of social link
	 * @returns The fetched server member social link
	 */
	fetchSocialLink(serverMember: string | ServerMember, type: string) {
		serverMember = serverMember instanceof ServerMember ? serverMember.user.id : serverMember;
		return this.client.api.serverMembers.fetchSocialLink(this.server.id, serverMember, type);
	}

	/**
	 * Set the nickname of a member in the server
	 * @param serverMember The server member
	 * @param nickname The nickname of the server member, or `null` to remove the nickname
	 * @returns The nickname of the server member, if relevant
	 */
	async setNickname(serverMember: string | ServerMember, nickname: string | null) {
		serverMember = serverMember instanceof ServerMember ? serverMember.user.id : serverMember;
		if (!nickname) {
			await this.client.api.serverMembers.removeNickname(this.server.id, serverMember);
			return null;
		} else
			return this.client.api.serverMembers.setNickname(
				this.server.id,
				serverMember,
				nickname,
			);
	}

	/**
	 * Kick a member from the server
	 * @param serverMember The server member
	 */
	kick(serverMember: string | ServerMember) {
		serverMember = serverMember instanceof ServerMember ? serverMember.user.id : serverMember;
		return this.client.api.serverMembers.kick(this.server.id, serverMember);
	}

	/**
	 * Add XP to a member in the server
	 * @param serverMember The server member
	 * @param amount The amount of XP to add to the server member
	 * @returns The total amount of XP the server member has
	 */
	addXp(serverMember: string | ServerMember, amount: number) {
		serverMember = serverMember instanceof ServerMember ? serverMember.user.id : serverMember;
		return this.client.api.serverMembers.awardXp(this.server.id, serverMember, amount);
	}

	/**
	 * Set XP of a member in the server
	 * @param serverMember The server member
	 * @param amount The total XP of the server member
	 * @returns The total amount of XP the server member has
	 */
	setXp(serverMember: string | ServerMember, amount: number) {
		serverMember = serverMember instanceof ServerMember ? serverMember.user.id : serverMember;
		return this.client.api.serverMembers.setXp(this.server.id, serverMember, amount);
	}
}
