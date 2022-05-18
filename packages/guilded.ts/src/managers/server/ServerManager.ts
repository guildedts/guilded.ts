import { BaseManager } from '../BaseManager';
import { Client } from '../../structures/Client';
import { Server } from '../../structures/server/Server';

/** A manager of servers that belong to the client. */
export class ServerManager extends BaseManager<string, Server> {
	/** @param client The client that owns the servers. */
	public constructor(client: Client) {
		super(client, client.options.maxServerCache);
	}

	/**
	 * Fetch a server from Guilded, or cache.
	 * @param serverId The ID of the server to fetch.
	 * @param cache Whether to cache the fetched server.
	 * @returns The fetched server.
	 */
	public fetch(serverId: string, cache = this.client.options.cacheServers ?? true) {
		let server = this.cache.get(serverId);
		if (server) return server;
		server = new Server(this.client, { id: serverId });
		if (cache) this.cache.set(serverId, server);
		return server;
	}
}
