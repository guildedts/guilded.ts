import { Routes } from 'guilded-api-typings';
import { Base, Server } from '..';

/** Represents a server role on Guilded. */
export class ServerRole extends Base<number> {
	/**
	 * @param server The server this role belongs to.
	 * @param id The ID of this role.
	 */
	public constructor(public readonly server: Server, public readonly id: number) {
		super(server.client, id);
	}

	/** Whether this role is cached. */
	public get cached() {
		return this.server.roles.cache.has(this.id);
	}

	/**
	 * Award XP to this role.
	 * @param amount The amount of XP to award.
	 * @returns The amount of XP that was awarded.
	 */
	public async awardXP(amount: number) {
		await this.client.rest.post<undefined, { amount: number }>(
			Routes.roleXP(this.server.id, this.id),
			{
				amount,
			},
		);

		return amount;
	}
}
