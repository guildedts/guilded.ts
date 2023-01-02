import { BaseManager, FetchOptions } from '../BaseManager';
import { Client } from '../../structures/Client';
import { Group } from '../../structures/Group';

/**
 * The manager for groups
 */
export class GroupManager extends BaseManager<string, Group> {
	/**
	 * @param client The client
	 */
	constructor(client: Client) {
		super(client, client.options.maxGroupCache);
	}

	/**
	 * Fetch a group
	 * @param group The group
	 * @param options The options to fetch the group with
	 * @returns The fetched group
	 */
	fetch(group: string | Group, options?: FetchOptions) {
		group = group instanceof Group ? group.id : group;
		const cached = this.cache.get(group);
		if (cached) return cached;
		return new Group(this.client, { id: group }, options?.cache);
	}
}
