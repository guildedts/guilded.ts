import { ServerMember } from './ServerMember';
import { ServerRole } from './ServerRole';

/**
 * Represents a server member role on Guilded.
 * @example new ServerMemberRole(member, rawRole);
 */
export class ServerMemberRole extends ServerRole {
	/**
	 * @param member The server member the role belongs to.
	 * @param raw The raw data of the role.
	 * @param cache Whether to cache the server member role.
	 */
	constructor(
		public readonly member: ServerMember,
		raw: { id: number },
		cache = member.client.options.cacheServerMemberRoles ?? true,
	) {
		super(member.server, raw);
		if (cache) member.roles.cache.set(this.id, this);
	}

	/** Whether the role is cached. */
	get isCached() {
		return this.member.roles.cache.has(this.id);
	}

	/**
	 * Remove the role from the server member.
	 * @returns The removed role.
	 * @example role.remove();
	 */
	remove() {
		return this.member.roles.unassign(this);
	}
}
