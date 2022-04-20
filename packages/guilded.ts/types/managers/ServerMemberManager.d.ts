import { BaseManager, Server, ServerMember } from "..";
/** A manager of members that belong to a server. */
export declare class ServerMemberManager extends BaseManager<string, ServerMember> {
    readonly server: Server;
    /** @param server The server that the members belong to. */
    constructor(server: Server);
    /**
     * Fetch a member by its ID.
     * @param id The ID of the member.
     * @returns The member.
     */
    fetch(id: string): Promise<ServerMember>;
}
//# sourceMappingURL=ServerMemberManager.d.ts.map