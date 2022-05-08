import { ServerMember, ServerRole } from '..';

/** Represents a server member role on Guilded. */
export class ServerMemberRole extends ServerRole {
	/**
	 * @param member The member this role belongs to.
	 * @param id The ID of this role.
	 */
	public constructor(public readonly member: ServerMember, id: number) {
		super(member.server, id);
	}

	/** Whether this role is cached. */
	public get cached() {
		return this.member.roles.cache.has(this.id);
	}

	/**
	 * Remove this role from the member.
	 */
	public async remove() {
		return this.member.roles.unassign(this.id);
	}
}
