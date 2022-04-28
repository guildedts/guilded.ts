import { Client, Server } from '../structures';
import { BaseManager } from '.';

/** A manager of servers that belong to the client. */
export class ServerManager extends BaseManager<string, Server> {
	/** @param client The client that owns the servers. */
	public constructor(client: Client) {
		super(client, {
			cachingEnabled: client.options.cacheServers,
			maxCache: client.options.maxServerCache,
		});
	}

	/**
	 * Fetch a server from Guilded, or cache if it's already cached.
	 * @param id The ID of the server.
	 * @param cache Whether to cache the server.
	 * @returns The server.
	 */
	public fetch(id: string, cache: boolean = this.cachingEnabled) {
		let server = this.cache.get(id);
		if (server) return server;

		server = new Server(this.client, { id });

		if (cache) this.cache.set(id, server);

		return server;
	}
}
