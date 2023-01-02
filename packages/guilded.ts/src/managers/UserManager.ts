import { BaseManager } from './BaseManager';
import { Client } from '../structures/Client';
import { User } from '../structures/User';
import { Collection } from '@discordjs/collection';
import { Server } from '../structures/server/Server';

/**
 * The manager for users
 */
export class UserManager extends BaseManager<string, User> {
	/**
	 * @param client The client
	 */
	constructor(client: Client) {
		super(client, client.options.maxUserCache);
	}

	/**
	 * Fetch a user from a server
	 * @param server The server
	 * @param user The user
	 * @returns The fetched user
	 */
	fetch(server: string | Server, user: string | User): Promise<User>;
	/**
	 * Fetch users from a server
	 * @param server The server
	 * @returns The fetched users
	 */
	fetch(server: string | Server): Promise<Collection<string, User>>;
	fetch(arg1: string | Server, arg2?: string | User) {
		if (arg2) return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	private async fetchSingle(server: string | Server, user: string | User) {
		user = user instanceof User ? user.id : user;
		const cached = this.cache.get(user);
		if (cached) return cached;
		server = server instanceof Server ? server : await this.client.servers.fetch(server);
		const member = await server.members.fetch(user);
		return member.user;
	}

	private async fetchMany(server: string | Server) {
		server = server instanceof Server ? server : await this.client.servers.fetch(server);
		const members = await server.members.fetch();
		const users = new Collection<string, User>();
		for (const { user } of members.values()) users.set(user.id, user);
		return users;
	}
}
