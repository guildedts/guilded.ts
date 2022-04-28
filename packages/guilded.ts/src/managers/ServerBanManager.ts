import { APIServerMemberBan, Routes } from 'guilded-api-typings';
import { BaseManager } from '.';
import { CacheCollection, Server, ServerBan } from '../structures';

/** A manager of bans that belong to a server. */
export class ServerBanManager extends BaseManager<string, ServerBan> {
	/** @param server The server the bans belongs to. */
	public constructor(public readonly server: Server) {
		super(server.client, {
			cachingEnabled: server.client.options.cacheServerBans,
			maxCache: server.client.options.maxServerBanCache,
		});
	}

	/** @ignore */
	public fetch(arg1?: string | boolean, arg2?: boolean) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);

		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(id: string, cache: boolean = this.cachingEnabled) {
		let ban = this.cache.get(id);
		if (ban) return ban;

		const response = await this.client.rest.get<{ serverMemberBan: APIServerMemberBan }>(
			Routes.serverBan(this.server.id, id),
		);

		ban = new ServerBan(this.server, response.serverMemberBan);

		if (cache) this.cache.set(id, ban);

		return ban;
	}

	/** @ignore */
	private async fetchMany(cache: boolean = this.cachingEnabled) {
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
	 * @param id The ID of the user to ban.
	 * @param reason The reason for the ban.
	 * @param cache Whether to cache the ban.
	 * @returns The created ban.
	 */
	public async create(id: string, reason?: string, cache: boolean = this.cachingEnabled) {
		const response = await this.client.rest.post<
			{ serverMemberBan: APIServerMemberBan },
			{ reason?: string }
		>(Routes.serverBan(this.server.id, id), {
			reason,
		});

		const ban = new ServerBan(this.server, response.serverMemberBan);

		if (cache) this.cache.set(ban.user.id, ban);

		return ban;
	}

	/**
	 * Remove a ban from this server.
	 * @param id The ID of the user to unban.
	 */
	public async remove(id: string) {
		await this.client.rest.delete(Routes.serverBan(this.server.id, id));
	}
}

export declare interface ServerBanManager {
	/**
	 * Fetch a single ban from this server, or cache if it's already cached.
	 * @param id The ID of the server ban.
	 * @param cache Whether to cache the server ban.
	 * @returns The server ban.
	 */
	fetch(id: string, cache?: boolean): Promise<ServerBan>;

	/**
	 * Fetch multiple bans from this server.
	 * @param cache Whether to cache the bans.
	 * @returns The bans.
	 */
	fetch(cache?: boolean): Promise<CacheCollection<string, ServerBan>>;
}
