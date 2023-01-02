import { BaseManager, FetchOptions } from '../BaseManager';
import { Client } from '../../structures/Client';
import { Server } from '../../structures/server/Server';

/**
 * The manager for servers
 */
export class ServerManager extends BaseManager<string, Server> {
	/**
	 * @param client The client
	 */
	constructor(client: Client) {
		super(client, client.options.maxServerCache);
	}

	/**
	 * Fetch a server
	 * @param server The server
	 * @param options The options to fetch the server with
	 * @returns The fetched server
	 */
	async fetch(server: string | Server, options?: FetchOptions) {
		server = server instanceof Server ? server.id : server;
		const cached = this.cache.get(server);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.servers.fetch(server);
		return new Server(this.client, raw, options?.cache);
	}
}
