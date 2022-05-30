import { Routes } from "guilded-api-typings";
import { BaseRouter } from "../BaseRouter";

/** The server role router for the Guilded REST API. */
export class ServerRoleRouter extends BaseRouter {
    /**
     * Award XP to a server role on Guilded.
     * @param serverId The ID of the server the role belongs to.
     * @param roleId The ID of the role to award XP to.
     * @param amount The amount of XP to award.
     */
    public awardXP(serverId: string, roleId: number, amount: number) {
        return this.rest.post(Routes.serverRoleXP(serverId, roleId), { amount });
    }
}
