import { Base } from '../Base';
import { Server } from './Server';

/** Represents a server role on Guilded. */
export class ServerRole extends Base<number> {
	/**
	 * @param server The server the role belongs to.
	 * @param raw The raw data of the role.
	 */
	constructor(public readonly server: Server, public readonly raw: { id: number }) {
		super(server.client, raw.id);
	}

	/** Whether the role is cached. */
	public get isCached() {
		return this.server.roles.cache.has(this.id);
	}

	/**
	 * Award XP to the role.
	 * @param amount The amount of XP to award to the role.
	 */
	public awardXp(amount: number) {
		return this.server.roles.awardXp(this.id, amount);
	}
}
