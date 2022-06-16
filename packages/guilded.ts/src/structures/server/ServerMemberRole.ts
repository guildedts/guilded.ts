import { ServerMember } from './ServerMember';
import { ServerRole } from './ServerRole';

/** Represents a server member role on Guilded. */
export class ServerMemberRole extends ServerRole {
	/**
	 * @param member The server member the role belongs to.
	 * @param raw The raw data of the role.
	 */
	public constructor(public readonly member: ServerMember, raw: { id: number }) {
		super(member.server, raw);
	}

	/** Whether the role is cached. */
	public get isCached() {
		return this.member.roles.cache.has(this.id);
	}

	/**
	 * Remove the role from the server member.
	 * @returns The removed role.
	 */
	public async remove() {
		return this.member.roles.unassign(this.id);
	}
}
