import { APIServerBan, RESTPostServerBanJSONBody, Routes } from 'guilded-api-typings';
import { BaseRouter } from '../BaseRouter';

/**
 * The server ban router for the Guilded REST API
 */
export class ServerBanRouter extends BaseRouter {
	/**
	 * Fetch a server ban from Guilded
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 * @returns The fetched server ban
	 */
	fetch(serverId: string, userId: string): Promise<APIServerBan>;
	/**
	 * Fetch server bans from Guilded
	 * @param serverId The ID of the server
	 * @returns The fetched server bans
	 */
	fetch(serverId: string): Promise<APIServerBan[]>;
	fetch(serverId: string, userId?: string) {
		if (userId) return this.fetchSingle(serverId, userId);
		return this.fetchMany(serverId);
	}

	private async fetchSingle(serverId: string, userId: string) {
		const { serverMemberBan } = await this.rest.get<{ serverMemberBan: APIServerBan }>(
			Routes.serverBan(serverId, userId),
		);
		return serverMemberBan;
	}

	private async fetchMany(serverId: string) {
		const { serverMemberBans } = await this.rest.get<{ serverMemberBans: APIServerBan[] }>(
			Routes.serverBans(serverId),
		);
		return serverMemberBans;
	}

	/**
	 * Create a server ban on Guilded
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 * @param reason The reason of the server ban
	 * @returns The created server ban
	 */
	async create(serverId: string, userId: string, reason?: string) {
		const { serverMemberBan } = await this.rest.post<
			{ serverMemberBan: APIServerBan },
			RESTPostServerBanJSONBody
		>(Routes.serverBan(serverId, userId), { reason });
		return serverMemberBan;
	}

	/**
	 * Delete a server ban from Guilded
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 */
	delete(serverId: string, userId: string) {
		return this.rest.delete<void>(Routes.serverBan(serverId, userId));
	}
}
