import { Routes } from 'guilded-api-typings';
import { BaseManager } from '..';
import { Group } from '../../structures';

/** A manager of members that belong to a group. */
export class GroupMemberManager extends BaseManager<void, void> {
	/** @param group The group that owns the members. */
	public constructor(public readonly group: Group) {
		super(group.client);
	}

	/**
	 * Add a member to the group.
	 * @param id The ID of the member.
	 */
	public async add(id: string) {
		await this.client.rest.put(Routes.groupMember(this.group.id, id));
	}

	/**
	 * Remove a member from the group.
	 * @param id The ID of the member.
	 */
	public async remove(id: string) {
		await this.client.rest.delete(Routes.groupMember(this.group.id, id));
	}
}
