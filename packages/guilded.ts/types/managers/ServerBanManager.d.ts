import { BaseManager, Server, ServerBan } from '..';
/** A manager of bans that belong to a server. */
export declare class ServerBanManager extends BaseManager<string, ServerBan> {
    readonly server: Server;
    /** @param server The server that the members belong to. */
    constructor(server: Server);
    /**
     * Fetch a ban by its ID.
     * @param id The ID of the ban.
     * @returns The ban.
     */
    fetch(id: string): Promise<ServerBan>;
    /**
     * Create a new ban.
     * @param userId The ID of the user to ban.
     * @param reason The reason for the ban.
     * @returns The created ban.
     */
    create(userId: string, reason?: string): Promise<ServerBan>;
    /**
     * Remove a ban.
     * @param userId The ID of the user to unban.
     * @returns The removed ban.
     */
    remove(userId: string): Promise<ServerBan | undefined>;
}
//# sourceMappingURL=ServerBanManager.d.ts.map