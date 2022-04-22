import Client, { BaseManager, CacheCollection, User } from '..';

/** A manager of users that belong to the client. */
export class UserManager extends BaseManager<string, User> {
	/** @param client The client that owns the users. */
	public constructor(client: Client) {
		super(client, {
			cachingEnabled: client.options.cacheUsers,
			maxCache: client.options.maxUserCache,
		});
	}

	/** @ignore */
	public async fetch(
		arg1: string,
		arg2?: string | boolean,
		arg3?: boolean,
	) {
		if (typeof arg2 === 'string')
			return this.fetchSingle(arg1, arg2, arg3);

		return this.fetchMany(arg1, arg2);
	}

	/** @ignore */
	private async fetchSingle(
		serverId: string,
		userId: string,
		cache: boolean = this.cachingEnabled,
	) {
		let user = this.cache.get(userId);
		if (user) return user;

		this.cachingEnabled = cache;

		user = (await this.client.servers.fetch(serverId).members.fetch(userId)).user;

		return user;
	}

	/** @ignore */
	private async fetchMany(serverId: string, cache: boolean = this.cachingEnabled) {
		this.cachingEnabled = cache;

		const members = await this.client.servers.fetch(serverId).members.fetch();

		const users = new CacheCollection<string, User>();

		for (const member of members.values()) {
			users.set(member.id, member.user);
		}

		return users;
	}
}

export declare interface UserManager {
	/**
	 * Fetch a single user from a server, or cache if it's already cached.
	 * @param serverId The ID of the server the user belongs to.
	 * @param userId The ID of the user.
	 * @param cache Whether to cache the user.
	 * @returns The user.
	 */
	fetch(serverId: string, userId: string, cache?: boolean): Promise<User>;
	/**
	 * Fetch multiple users from a server.
	 * @param serverId The ID of the server the users belong to.
	 * @param cache Whether to cache the users.
	 * @returns The users.
	 */
	fetch(serverId: string, cache?: boolean): Promise<CacheCollection<string, User>>;
}
