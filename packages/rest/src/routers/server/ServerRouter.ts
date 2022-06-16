import { APIServer, Routes } from 'guilded-api-typings';
import { BaseRouter } from '../BaseRouter';

/** The server router for the Guilded REST API. */
export class ServerRouter extends BaseRouter {
	/**
	 * Fetch a server from Guilded.
	 * @param serverId The ID of the server to fetch.
	 * @returns The fetched server.
	 */
	public async fetch(serverId: string) {
		const { server } = await this.rest.get<{ server: APIServer }>(Routes.server(serverId));
		return server;
	}
}
