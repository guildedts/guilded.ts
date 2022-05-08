import { Client, CacheCollection, User } from '../structures';
import { BaseManager } from '.';

/** A manager of users that belong to the client. */
export class UserManager extends BaseManager<string, User> {
	/** @param client The client that owns the users. */
	public constructor(client: Client) {
		super(client, {
			caching: client.options.cacheUsers,
			maxCache: client.options.maxUserCache,
		});
	}

	/** @ignore */
	public async fetch(arg1: string, arg2: string | boolean = this.caching, arg3 = this.caching) {
		if (typeof arg2 === 'string') return this.fetchSingle(arg1, arg2, arg3);

		return this.fetchMany(arg1, arg2);
	}

	/** @ignore */
	private async fetchSingle(serverId: string, userId: string, cache = this.caching) {
		let user = this.cache.get(userId);
		if (user) return user;

		user = (await this.client.servers.fetch(serverId).members.fetch(userId)).user;

		if (cache) this.cache.set(user.id, user);

		return user;
	}

	/** @ignore */
	private async fetchMany(serverId: string, cache = this.caching) {
		const members = await this.client.servers.fetch(serverId).members.fetch();

		const users = new CacheCollection<string, User>();

		for (const member of members.values()) {
			users.set(member.id, member.user);

			if (cache) this.cache.set(member.id, member.user);
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
