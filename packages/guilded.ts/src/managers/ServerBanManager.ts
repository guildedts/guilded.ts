import { Routes } from '@guildedts/rest';
import { APIServerMemberBan } from 'guilded-api-typings';
import { BaseManager, Server, ServerBan, User } from '..';

/** A manager of bans that belong to a server. */
export class ServerBanManager extends BaseManager<string, ServerBan> {
	/** @param server The server that the members belong to. */
	constructor(public readonly server: Server) {
		super(server.client);
	}

	/**
	 * Fetch a ban by its ID.
	 * @param id The ID of the ban.
	 * @returns The ban.
	 */
	public async fetch(id: string) {
		let ban = this.cache.get(id);
		if (ban) return ban;
		const response = await this.client.rest.get<{
			serverMemberBan: APIServerMemberBan;
		}>(Routes.serverBan(this.server.id, id));
		const user = new User(response.serverMemberBan.user, this.client);
		const creator = (await this.server.members.fetch(response.serverMemberBan.createdBy)).user;
		ban = new ServerBan(
			{
				reason: response.serverMemberBan.reason,
				createdAt: response.serverMemberBan.createdAt,
			},
			this.server,
			user,
			creator,
		);
		this.cache.set(id, ban);
		return ban;
	}

	/**
	 * Create a new ban.
	 * @param userId The ID of the user to ban.
	 * @param reason The reason for the ban.
	 * @returns The created ban.
	 */
	public async create(userId: string, reason?: string) {
		await this.client.rest.post<{ serverMemberBan: APIServerMemberBan }>(
			Routes.serverBan(this.server.id, userId),
			{
				reason,
			},
		);

		return this.fetch(userId);
	}

	/**
	 * Remove a ban.
	 * @param userId The ID of the user to unban.
	 * @returns The removed ban.
	 */
	public async remove(userId: string) {
		await this.client.rest.delete(Routes.serverBan(this.server.id, userId));

		const ban = this.cache.get(userId);
		this.cache.delete(userId);

		return ban;
	}
}
