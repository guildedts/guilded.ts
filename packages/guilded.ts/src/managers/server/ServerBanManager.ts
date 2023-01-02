import { BaseManager, FetchManyOptions, FetchOptions } from '../BaseManager';
import { Server } from '../../structures/server/Server';
import { ServerBan } from '../../structures/server/ServerBan';
import { Collection } from '@discordjs/collection';
import { ServerMember } from '../../structures/server/ServerMember';

/**
 * The manager for server bans
 */
export class ServerBanManager extends BaseManager<string, ServerBan> {
	/**
	 * @param server The server
	 */
	constructor(public readonly server: Server) {
		super(server.client, server.client.options.maxServerBanCache);
	}

	/**
	 * Fetch a ban from the server
	 * @param serverBan The server ban
	 * @param options The options to fetch the server ban
	 * @returns The fetched server ban
	 */
	fetch(serverBan: string | ServerBan, options?: FetchOptions): Promise<ServerBan>;
	/**
	 * Fetch bans from thw server
	 * @param options The options to fetch server bans
	 * @returns The fetched server bans
	 */
	fetch(options?: FetchManyOptions): Promise<Collection<string, ServerBan>>;
	fetch(arg1?: string | ServerBan | FetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'string' || arg1 instanceof ServerBan)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	private async fetchSingle(serverBan: string | ServerBan, options?: FetchOptions) {
		serverBan = serverBan instanceof ServerBan ? serverBan.id : serverBan;
		const cached = this.cache.get(serverBan);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.serverBans.fetch(this.server.id, serverBan);
		return new ServerBan(this.server, raw, options?.cache);
	}

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
	 * Create a ban in the server
	 * @param serverMember The server member
	 * @param reason The reason for the ban
	 * @returns The created server ban
	 */
	async create(serverMember: string | ServerMember, reason?: string) {
		serverMember = serverMember instanceof ServerMember ? serverMember.id : serverMember;
		const raw = await this.client.api.serverBans.create(this.server.id, serverMember, reason);
		return new ServerBan(this.server, raw);
	}

	/**
	 * Remove a ban from the server
	 * @param serverBan The server ban
	 */
	remove(serverBan: string | ServerBan) {
		serverBan = serverBan instanceof ServerBan ? serverBan.id : serverBan;
		return this.client.api.serverBans.delete(this.server.id, serverBan);
	}
}
