import { Base } from '../Base';
import { Server } from './Server';

/**
 * Represents a server role on Guilded.
 * @example new ServerRole(server, rawRole);
 */
export class ServerRole extends Base<number> {
	/**
	 * @param server The server the role belongs to.
	 * @param raw The raw data of the role.
	 * @param cache Whether to cache the server role.
	 */
	constructor(
		public readonly server: Server,
		public readonly raw: { id: number },
		cache = server.client.options.cacheServerRoles ?? true,
	) {
		super(server.client, raw.id);
		if (cache) server.roles.cache.set(this.id, this);
	}

	/** Whether the role is cached. */
	get isCached() {
		return this.server.roles.cache.has(this.id);
	}

	/**
	 * Award XP to the role.
	 * @param amount The amount of XP to award to the role.
	 * @example role.awardXp(100);
	 */
	awardXp(amount: number) {
		return this.server.roles.awardXp(this, amount);
	}
}
