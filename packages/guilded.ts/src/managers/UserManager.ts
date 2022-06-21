import { BaseManager } from './BaseManager';
import { Client } from '../structures/Client';
import { CacheCollection } from '../structures/CacheCollection';
import { User } from '../structures/User';

/** The manager of users that belong to the client. */
export class UserManager extends BaseManager<string, User> {
	/** @param client The client the users belong to. */
	public constructor(client: Client) {
		super(client, client.options.maxUserCache);
	}

	/**
	 * Fetch a user from a server, or cache.
	 * @param serverId The ID of the server the user belongs to.
	 * @param userId The ID of the user to fetch.
	 * @returns The fetched user.
	 */
	public fetch(serverId: string, userId: string): Promise<User>;
	/**
	 * Fetch users from a server.
	 * @param serverId The ID of the server the users belong to.
	 * @returns The fetched users.
	 */
	public fetch(serverId: string): Promise<CacheCollection<string, User>>;
	/** @ignore */
	public async fetch(arg1: string, arg2?: string) {
		if (arg2) return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(serverId: string, userId: string) {
		const user = this.cache.get(userId);
		if (user) return user;
		const server = await this.client.servers.fetch(serverId);
		const member = await server.members.fetch(userId);
		return member.user;
	}

	/** @ignore */
	private async fetchMany(serverId: string) {
		const server = await this.client.servers.fetch(serverId);
		const members = await server.members.fetch();
		const users = new CacheCollection<string, User>();
		for (const { user } of members.values()) users.set(user.id, user);
		return users;
	}
}
