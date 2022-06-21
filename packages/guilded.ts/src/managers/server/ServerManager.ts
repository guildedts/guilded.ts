import { BaseManager } from '../BaseManager';
import { Client } from '../../structures/Client';
import { Server } from '../../structures/server/Server';

/** The manager of servers that belong to the client. */
export class ServerManager extends BaseManager<string, Server> {
	/** @param client The client the servers belong to. */
	public constructor(client: Client) {
		super(client, client.options.maxServerCache);
	}

	/**
	 * Fetch a server from Guilded, or cache.
	 * @param serverId The ID of the server to fetch.
	 * @param cache Whether to cache the fetched server.
	 * @returns The fetched server.
	 */
	public async fetch(serverId: string, cache?: boolean) {
		const server = this.cache.get(serverId);
		if (server) return server;
		const raw = await this.client.api.servers.fetch(serverId);
		return new Server(this.client, raw, cache);
	}
}
