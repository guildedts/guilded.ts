import { BaseManager, FetchOptions } from '../BaseManager';
import { Client } from '../../structures/Client';
import { Group } from '../../structures/Group';

/**
 * The manager of groups that belong to the client.
 * @example new GroupManager(client);
 */
export class GroupManager extends BaseManager<string, Group> {
	/** @param client The client that owns the groups. */
	constructor(client: Client) {
		super(client, client.options.maxGroupCache);
	}

	/**
	 * Fetch a group from Guilded, or cache.
	 * @param group The group to fetch.
	 * @param options The options to fetch the group with.
	 * @returns The fetched group.
	 * @example groups.fetch(group);
	 */
	fetch(group: string | Group, options?: FetchOptions) {
		group = group instanceof Group ? group.id : group;
		const cached = this.cache.get(group);
		if (cached) return cached;
		return new Group(this.client, { id: group }, options?.cache);
	}
}
