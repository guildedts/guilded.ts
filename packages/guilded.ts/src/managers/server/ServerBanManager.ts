import { BaseManager } from '../BaseManager';
import { CacheCollection } from '../../structures/CacheCollection';
import { Server } from '../../structures/server/Server';
import { ServerBan } from '../../structures/server/ServerBan';

/** A manager of bans that belong to a server. */
export class ServerBanManager extends BaseManager<string, ServerBan> {
	/** @param server The server the bans belongs to. */
	public constructor(public readonly server: Server) {
		super(server.client, server.client.options.maxServerBanCache);
	}

	/** @ignore */
	public fetch(
		arg1: string | boolean = this.client.options.cacheServerBans ?? true,
		arg2 = this.client.options.cacheServerBans ?? true,
	) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(banId: string, cache: boolean) {
		let ban = this.cache.get(banId);
		if (ban) return ban;
		const raw = await this.client.api.serverBans.fetch(this.server.id, banId);
		ban = new ServerBan(this.server, raw);
		if (cache) this.cache.set(banId, ban);
		return ban;
	}

	/** @ignore */
	private async fetchMany(cache: boolean) {
		const raw = await this.client.api.serverBans.fetch(this.server.id);
		const bans = new CacheCollection<string, ServerBan>();
		for (const data of raw) {
			const ban = new ServerBan(this.server, data);
			bans.set(ban.user.id, ban);
			if (cache) this.cache.set(ban.user.id, ban);
		}
		return bans;
	}

	/**
	 * Create a ban in the server.
	 * @param memberId The ID of the member to ban.
	 * @param reason The reason to ban the member.
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

export declare interface ServerBanManager {
	/**
	 * Fetch a single ban from the server, or cache.
	 * @param banId The ID of the ban to fetch.
	 * @param cache Whether to cache the fetched ban.
	 * @returns The fetched ban.
	 */
	fetch(banId: string, cache?: boolean): Promise<ServerBan>;

	/**
	 * Fetch multiple bans from thw server.
	 * @param cache Whether to cache the fetched bans.
	 * @returns The fetched bans.
	 */
	fetch(cache?: boolean): Promise<CacheCollection<string, ServerBan>>;
}
