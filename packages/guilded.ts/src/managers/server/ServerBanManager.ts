import { BaseManager } from '../BaseManager';
import { CacheCollection } from '../../structures/CacheCollection';
import { Server } from '../../structures/server/Server';
import { ServerBan } from '../../structures/server/ServerBan';

/** The manager of bans that belong to a server. */
export class ServerBanManager extends BaseManager<string, ServerBan> {
	/** @param server The server the bans belongs to. */
	public constructor(public readonly server: Server) {
		super(server.client, server.client.options.maxServerBanCache);
	}

	/**
	 * Fetch a ban from the server, or cache.
	 * @param banId The ID of the ban to fetch.
	 * @param cache Whether to cache the fetched ban.
	 * @returns The fetched ban.
	 */
	public fetch(banId: string, cache?: boolean): Promise<ServerBan>;
	/**
	 * Fetch bans from thw server.
	 * @param cache Whether to cache the fetched bans.
	 * @returns The fetched bans.
	 */
	public fetch(cache?: boolean): Promise<CacheCollection<string, ServerBan>>;
	/** @ignore */
	public fetch(
		arg1?: string | boolean,
		arg2?: boolean,
	) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(banId: string, cache?: boolean) {
		const ban = this.cache.get(banId);
		if (ban) return ban;
		const raw = await this.client.api.serverBans.fetch(this.server.id, banId);
		return new ServerBan(this.server, raw, cache);
	}

	/** @ignore */
	private async fetchMany(cache?: boolean) {
		const raw = await this.client.api.serverBans.fetch(this.server.id);
		const bans = new CacheCollection<string, ServerBan>();
		for (const data of raw) {
			const ban = new ServerBan(this.server, data, cache);
			bans.set(ban.user.id, ban);
		}
		return bans;
	}

	/**
	 * Create a ban in the server.
	 * @param memberId The ID of the member the ban belongs to.
	 * @param reason The reason of the ban.
	 * @returns The created ban.
	 */
	public async create(memberId: string, reason?: string) {
		const raw = await this.client.api.serverBans.create(this.server.id, memberId, reason);
		return new ServerBan(this.server, raw);
	}

	/**
	 * Remove a ban in the server.
	 * @param banId The ID of the ban to remove.
	 */
	public remove(banId: string) {
		return this.client.api.serverBans.delete(this.server.id, banId);
	}
}
