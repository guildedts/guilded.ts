import { Routes } from "guilded-api-typings";
import { BaseRouter } from "./BaseRouter";

/** The group router for the Guilded REST API. */
export class GroupRouter extends BaseRouter {
    /**
     * Add a member to a group on Guilded.
     * @param groupId The ID of the group the member belongs to.
     * @param memberId The ID of the member to add to the group.
     */
    public addMember(groupId: string, memberId: string) {
        return this.rest.put<void>(Routes.groupMember(groupId, memberId));
    }

    /**
     * Remove a member from a group on Guilded.
     * @param groupId The ID of the group the member belongs to.
     * @param memberId The ID of the member to remove from the group.
     */
    public removeMember(groupId: string, memberId: string) {
        return this.rest.delete<void>(Routes.groupMember(groupId, memberId));
    }
}
