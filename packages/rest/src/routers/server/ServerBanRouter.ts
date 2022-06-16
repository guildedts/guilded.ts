import { APIServerBan, APIServerBanPayload, Routes } from 'guilded-api-typings';
import { BaseRouter } from '../BaseRouter';

/** The server ban router for the Guilded REST API. */
export class ServerBanRouter extends BaseRouter {
	/**
	 * Fetch a server ban from Guilded.
	 * @param serverId The ID of the server the ban belong to.
	 * @param banId The ID of the server ban to fetch.
	 * @returns The fetched server ban.
	 */
	public fetch(serverId: string, banId: string): Promise<APIServerBan>;
	/**
	 * Fetch server bans from Guilded.
	 * @param serverId The ID of the server the bans belong to.
	 * @returns The fetched server bans.
	 */
	public fetch(serverId: string): Promise<APIServerBan[]>;
	/** @ignore */
	public fetch(serverId: string, banId?: string) {
		if (banId) return this.fetchSingle(serverId, banId);
		return this.fetchMany(serverId);
	}

	/** @ignore */
	private async fetchSingle(serverId: string, banId: string) {
		const { serverMemberBan } = await this.rest.get<{ serverMemberBan: APIServerBan }>(
			Routes.serverBan(serverId, banId),
		);
		return serverMemberBan;
	}

	/** @ignore */
	private async fetchMany(serverId: string) {
		const { serverMemberBans } = await this.rest.get<{ serverMemberBans: APIServerBan[] }>(
			Routes.serverBans(serverId),
		);
		return serverMemberBans;
	}

	/**
	 * Create a server ban on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to ban.
	 * @param reason The reason of the server ban.
	 * @returns The created server ban.
	 */
	public async create(serverId: string, memberId: string, reason?: string) {
		const { serverMemberBan } = await this.rest.post<
			{ serverMemberBan: APIServerBan },
			APIServerBanPayload
		>(Routes.serverBan(serverId, memberId), { reason });
		return serverMemberBan;
	}

	/**
	 * Delete a server ban from Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the server member to unban.
	 */
	public delete(serverId: string, memberId: string) {
		return this.rest.delete<void>(Routes.serverBan(serverId, memberId));
	}
}
