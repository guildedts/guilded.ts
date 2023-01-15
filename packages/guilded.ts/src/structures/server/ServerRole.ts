import { Base } from '../Base';
import { Server } from './Server';

/**
 * Represents a server role on Guilded
 */
export class ServerRole extends Base {
	/**
	 * @param server The server
	 * @param data The data of the server role
	 * @param cache Whether to cache the server role
	 */
	constructor(
		public readonly server: Server,
		public readonly data: { id: number },
		cache = server.client.options.cacheServerRoles ?? true,
	) {
		super(server.client);
		if (cache) server.roles.cache.set(this.id, this);
	}

	/**
	 * Whether the server role is cached
	 */
	get isCached() {
		return this.server.roles.cache.has(this.id);
	}

	/**
	 * The ID of the server role
	 */
	get id() {
		return this.data.id;
	}

	/**
	 * Add XP to the server role
	 * @param amount The amount of XP to add
	 */
	addXp(amount: number) {
		return this.server.roles.addXp(this, amount);
	}
}
