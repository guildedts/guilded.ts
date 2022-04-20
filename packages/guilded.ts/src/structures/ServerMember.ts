import { Routes } from '@guildedts/rest';
import { APIServerMember } from 'guilded-api-typings';
import { Base, Server, User } from '..';

/**
 * Represent a server member on Guilded.
 */
export class ServerMember extends Base {
	/**
	 * The user that this server member represents.
	 */
	public readonly user: User;
	/**
	 * An array of roles ID's of roles that this member has.
	 */
	public readonly roles: number[];
	/**
	 * The server member's nickname.
	 */
	public nickname: string | null;
	/**
	 * The server member's join date.
	 */
	public readonly joinedAt: Date;

	/**
	 * @param data The data of the server member.
	 * @param server The server that the member belongs to.
	 */
	constructor(data: APIServerMember, public readonly server: Server) {
		super(server.client);
		this.user = new User(data.user, server.client);
		this.roles = data.roleIds;
		this.nickname = data.nickname ?? null;
		this.joinedAt = new Date(data.joinedAt);
	}

	/**
	 * Fetch the server member.
	 */
	public async fetch() {
		return await this.server.members.fetch(this.user.id);
	}

	/**
	 * Set the nickname of the server member.
	 * @param nickname The nickname to set.
	 */
	public async setNickname(nickname: string) {
		await this.client.rest.put(Routes.userNickname(this.server.id, this.user.id), { nickname });

		return this.fetch();
	}

	/**
	 * Remove the nickname of the server member.
	 */
	public async removeNickname() {
		await this.client.rest.delete(Routes.userNickname(this.server.id, this.user.id));

		return this.fetch();
	}

	/**
	 * Kick the server member.
	 * @returns The user.
	 */
	public async kick() {
		await this.client.rest.delete(Routes.serverMember(this.server.id, this.user.id));

		this.server.members.cache.delete(this.user.id);

		return this.user;
	}

	/**
	 * Ban the server member.
	 * @param reason The reason for the ban.
	 * @returns The ban.
	 */
	public async ban(reason?: string) {
		return await this.server.bans.create(this.user.id, reason);
	}

	/**
	 * Unban the server member.
	 * @returns The unban.
	 */
	public async unban() {
		return await this.server.bans.remove(this.user.id);
	}
}
