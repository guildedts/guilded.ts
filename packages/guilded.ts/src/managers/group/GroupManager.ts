import { BaseManager } from '../BaseManager';
import { Client } from '../../structures/Client';
import { Group } from '../../structures/Group';

/** A manager of groups that belong to the client. */
export class GroupManager extends BaseManager<string, Group> {
	/** @param client The client that owns the groups. */
	public constructor(client: Client) {
		super(client, client.options.maxGroupCache);
	}

	/**
	 * Fetch a group from Guilded, or cache.
	 * @param groupId The ID of the group to fetch.
	 * @param cache Whether to cache the fetched group.
	 * @returns The fetched group.
	 */
	public fetch(groupId: string, cache: boolean = this.client.options.cacheGroups ?? true) {
		let group = this.cache.get(groupId);
		if (group) return group;
		group = new Group(this.client, { id: groupId });
		if (cache) this.cache.set(groupId, group);
		return group;
	}
}
