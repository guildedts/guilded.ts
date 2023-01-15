import { ServerMember } from './ServerMember';
import { ServerRole } from './ServerRole';

/**
 * Represents a server member role on Guilded
 */
export class ServerMemberRole extends ServerRole {
	/**
	 * @param member The server member
	 * @param data The data of the server member role
	 * @param cache Whether to cache the server member role
	 */
	constructor(
		public readonly member: ServerMember,
		data: { id: number },
		cache = member.client.options.cacheServerMemberRoles ?? true,
	) {
		super(member.server, data);
		if (cache) member.roles.cache.set(this.id, this);
	}

	/**
	 * Whether the server member role is cached
	 */
	get isCached() {
		return this.member.roles.cache.has(this.id);
	}

	/**
	 * Remove the role from the server member
	 * @returns The removed server role
	 */
	remove() {
		return this.member.roles.remove(this);
	}
}
