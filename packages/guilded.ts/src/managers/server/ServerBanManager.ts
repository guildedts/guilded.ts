import { BaseManager, FetchManyOptions, FetchOptions } from '../BaseManager';
import { Server } from '../../structures/server/Server';
import { ServerBan } from '../../structures/server/ServerBan';
import { Collection } from '@discordjs/collection';
import { ServerMember } from '../../structures/server/ServerMember';

/**
 * The manager of bans that belong to a server.
 * @example new ServerBanManager(server);
 */
export class ServerBanManager extends BaseManager<string, ServerBan> {
	/** @param server The server the bans belongs to. */
	constructor(public readonly server: Server) {
		super(server.client, server.client.options.maxServerBanCache);
	}

	/**
	 * Fetch a ban from the server, or cache.
	 * @param ban The ban to fetch.
	 * @param options The options to fetch the ban with.
	 * @returns The fetched ban.
	 * @example bans.fetch(ban);
	 */
	fetch(ban: string | ServerBan, options?: FetchOptions): Promise<ServerBan>;
	/**
	 * Fetch bans from thw server.
	 * @param options The options to fetch bans with.
	 * @returns The fetched bans.
	 * @example bans.fetch();
	 */
	fetch(options?: FetchManyOptions): Promise<Collection<string, ServerBan>>;
	/** @ignore */
	fetch(arg1?: string | ServerBan | FetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'string' || arg1 instanceof ServerBan)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(ban: string | ServerBan, options?: FetchOptions) {
		ban = ban instanceof ServerBan ? ban.id : ban;
		const cached = this.cache.get(ban);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.serverBans.fetch(this.server.id, ban);
		return new ServerBan(this.server, raw, options?.cache);
	}

	/** @ignore */
	private async fetchMany(options?: FetchManyOptions) {
		const raw = await this.client.api.serverBans.fetch(this.server.id);
		const bans = new Collection<string, ServerBan>();
		for (const data of raw) {
			const ban = new ServerBan(this.server, data, options?.cache);
			bans.set(ban.user.id, ban);
		}
		return bans;
	}

	/**
	 * Create a ban in the server.
	 * @param member The member the ban belongs to.
	 * @param reason The reason of the ban.
	 * @returns The created ban.
	 * @example bans.create(member);
	 */
	async create(member: string | ServerMember, reason?: string) {
		member = member instanceof ServerMember ? member.id : member;
		const raw = await this.client.api.serverBans.create(this.server.id, member, reason);
		return new ServerBan(this.server, raw);
	}

	/**
	 * Remove a ban in the server.
	 * @param ban The ban to remove.
	 * @example bans.remove(ban);
	 */
	remove(ban: string | ServerBan) {
		ban = ban instanceof ServerBan ? ban.id : ban;
		return this.client.api.serverBans.delete(this.server.id, ban);
	}
}
