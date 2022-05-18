import { APIChannelPayload } from 'guilded-api-typings';
import { Client } from '../Client';
import { Base } from '../Base';
import { ServerMemberManager } from '../../managers/server/ServerMemberManager';
import { ServerBanManager } from '../../managers/server/ServerBanManager';
import { ServerRoleManager } from '../../managers/server/ServerRoleManager';

/** Represents a server on Guilded. */
export class Server extends Base {
	/** A manager of members that belong to the server. */
	public readonly members: ServerMemberManager;
	/** A manager of bans that belong to the server. */
	public readonly bans: ServerBanManager;
	/** A manager of roles that belong to the server. */
	public readonly roles: ServerRoleManager;

	/**
	 * @param client The client that owns the server.
	 * @param raw The raw data of the server.
	 */
	constructor(client: Client, public readonly raw: { id: string }) {
		super(client, raw.id);
		this.members = new ServerMemberManager(this);
		this.bans = new ServerBanManager(this);
		this.roles = new ServerRoleManager(this);
	}

	/** Whether the server is cached. */
	public get isCached() {
		return this.client.servers.cache.has(this.id);
	}

	/**
	 * Fetch the server.
	 * @param cache Whether to cache the fetched server.
	 * @returns The fetched server.
	 */
	public fetch(cache?: boolean) {
		this.client.servers.cache.delete(this.id);
		return this.client.servers.fetch(this.id, cache);
	}

	/**
	 * Create a channel in the server.
	 * @param payload The payload to create the channel with.
	 * @returns The created channel.
	 */
	public createChannel(payload: Omit<APIChannelPayload, 'serverId'>) {
		return this.client.channels.create({ serverId: this.id, ...payload });
	}
}
