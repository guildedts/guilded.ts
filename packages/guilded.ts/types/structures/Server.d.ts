import { Base, Client, ServerBanManager, ServerMemberManager } from "..";
/**
 * Represents a server on Guilded.
 */
export declare class Server extends Base {
    /**
     * The ID of the server.
     */
    readonly id: string;
    /**
     * A manager of members that belong to a server.
     */
    readonly members: ServerMemberManager;
    /**
     * A manager of bans that belong to a server.
     */
    readonly bans: ServerBanManager;
    /**
     * @param data The data of the server.
     */
    constructor(data: {
        id: string;
    }, client: Client);
    /**
     * Fetch the server.
     * @returns The server.
     */
    fetch(): Promise<Server>;
}
//# sourceMappingURL=Server.d.ts.map