import { Client, Base } from '.';
import { ServerBanManager, ServerMemberManager } from '../managers';

/** Represents a server on Guilded. */
export class Server extends Base {
	/** The ID of the server. */
	public readonly id: string;

	/** A manager of members that belong to this server. */
	public readonly members: ServerMemberManager;
	/** A manager of bans that belong to this server. */
	public readonly bans: ServerBanManager;

	/**
	 * @param client The client that owns this server.
	 * @param data The data of the server.
	 */
	public constructor(client: Client, data: { id: string }) {
		super(client);
		this.id = data.id;
		this.members = new ServerMemberManager(this);
		this.bans = new ServerBanManager(this);
	}

	/**
	 * Fetch this server.
	 * @param cache Whether to cache the server.
	 * @returns The server.
	 */
	public async fetch(cache: boolean = this.client.servers.cachingEnabled) {
		this.client.servers.cache.delete(this.id);
		return this.client.servers.fetch(this.id, cache);
	}
}
