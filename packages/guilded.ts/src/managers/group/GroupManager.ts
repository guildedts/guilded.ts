import { BaseManager } from '..';
import { Client, Group } from '../../structures';

/** A manager of groups that belong to the client. */
export class GroupManager extends BaseManager<string, Group> {
	/** @param client The client that owns the groups. */
	public constructor(client: Client) {
		super(client, {
			caching: client.options.cacheGroups,
			maxCache: client.options.maxGroupCache,
		});
	}

	/**
	 * Fetch a group from Guilded, or cache if it's already cached.
	 * @param groupId The ID of the group.
	 * @param cache Whether to cache the group.
	 * @returns The group.
	 */
	public fetch(groupId: string, cache: boolean = this.caching) {
		let group = this.cache.get(groupId);
		if (group) return group;

		group = new Group(this.client, groupId);

		if (cache) this.cache.set(groupId, group);

		return group;
	}
}
