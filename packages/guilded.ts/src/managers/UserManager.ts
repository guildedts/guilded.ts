import { BaseManager } from './BaseManager';
import { Client } from '../structures/Client';
import { CacheCollection } from '../structures/CacheCollection';
import { User } from '../structures/User';

/** A manager of users that belong to the client. */
export class UserManager extends BaseManager<string, User> {
	/** @param client The client that owns the users. */
	public constructor(client: Client) {
		super(client, client.options.maxUserCache);
	}

	/** @ignore */
	public async fetch(
		arg1: string,
		arg2: string | boolean = this.client.options.cacheUsers ?? true,
	) {
		if (typeof arg2 === 'string') return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(serverId: string, userId: string) {
		const user = this.cache.get(userId);
		if (user) return user;
		return (await this.client.servers.fetch(serverId).members.fetch(userId)).user;
	}

	/** @ignore */
	private async fetchMany(serverId: string) {
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
	 * Fetch a single user from a server, or cache.
	 * @param serverId The ID of the server to fetch the user from.
	 * @param userId The ID of the user to fetch.
	 * @returns The fetched user.
	 */
	fetch(serverId: string, userId: string): Promise<User>;

	/**
	 * Fetch multiple users from a server.
	 * @param serverId The ID of the server to fetch the users from.
	 * @returns The fetched users.
	 */
	fetch(serverId: string): Promise<CacheCollection<string, User>>;
}
