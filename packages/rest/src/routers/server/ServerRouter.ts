import { APIServer, Routes } from 'guilded-api-typings';
import { BaseRouter } from '../BaseRouter';

/**
 * The server router for the Guilded REST API.
 * @example new ServerRouter(rest);
 */
export class ServerRouter extends BaseRouter {
	/**
	 * Fetch a server from Guilded.
	 * @param serverId The ID of the server to fetch.
	 * @returns The fetched server.
	 * @example servers.fetch('abc');
	 */
	async fetch(serverId: string) {
		const { server } = await this.rest.get<{ server: APIServer }>(Routes.server(serverId));
		return server;
	}
}
