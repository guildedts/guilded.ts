import { APIServerMemberBan, Routes } from 'guilded-api-typings';
import { BaseManager } from '..';
import { CacheCollection, Server, ServerBan } from '../../structures';

/** A manager of bans that belong to a server. */
export class ServerBanManager extends BaseManager<string, ServerBan> {
	/** @param server The server the bans belongs to. */
	public constructor(public readonly server: Server) {
		super(server.client, {
			caching: server.client.options.cacheServerBans,
			maxCache: server.client.options.maxServerBanCache,
		});
	}

	/** @ignore */
	public fetch(arg1: string | boolean = this.caching, arg2 = this.caching) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);

		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(banId: string, cache = this.caching) {
		let ban = this.cache.get(banId);
		if (ban) return ban;

		const response = await this.client.rest.get<{ serverMemberBan: APIServerMemberBan }>(
			Routes.serverBan(this.server.id, banId),
		);

		ban = new ServerBan(this.server, response.serverMemberBan);

		if (cache) this.cache.set(banId, ban);

		return ban;
	}

	/** @ignore */
	private async fetchMany(cache = this.caching) {
		const response = await this.client.rest.get<{ serverMemberBans: APIServerMemberBan[] }>(
			Routes.serverBans(this.server.id),
		);

		const bans = new CacheCollection<string, ServerBan>();

		for (const data of response.serverMemberBans) {
			const ban = new ServerBan(this.server, data);
			bans.set(ban.user.id, ban);
			if (cache) this.cache.set(ban.user.id, ban);
		}

		return bans;
	}

	/**
	 * Create a new ban on this server.
	 * @param userId The ID of the user to ban.
	 * @param reason The reason for the ban.
	 * @param cache Whether to cache the ban.
	 * @returns The created ban.
	 */
	public async create(userId: string, reason?: string, cache = this.caching) {
		const response = await this.client.rest.post<
			{ serverMemberBan: APIServerMemberBan },
			{ reason?: string }
		>(Routes.serverBan(this.server.id, userId), {
			reason,
		});

		const ban = new ServerBan(this.server, response.serverMemberBan);

		if (cache) this.cache.set(ban.user.id, ban);

		return ban;
	}

	/**
	 * Remove a ban from this server.
	 * @param userId The ID of the user to unban.
	 * @returns The ban if cached.
	 */
	public async remove(userId: string) {
		await this.client.rest.delete(Routes.serverBan(this.server.id, userId));

		const ban = this.cache.get(userId);

		this.cache.delete(userId);

		return ban;
	}
}

export declare interface ServerBanManager {
	/**
	 * Fetch a single ban from this server, or cache if it's already cached.
	 * @param banId The ID of the server ban.
	 * @param cache Whether to cache the server ban.
	 * @returns The server ban.
	 */
	fetch(banId: string, cache?: boolean): Promise<ServerBan>;

	/**
	 * Fetch multiple bans from this server.
	 * @param cache Whether to cache the bans.
	 * @returns The bans.
	 */
	fetch(cache?: boolean): Promise<CacheCollection<string, ServerBan>>;
}
